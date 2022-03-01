const fs = require('fs');
const DataBase = require('./db.js');
const { exec } = require('child_process');

const db = new DataBase();

const http = require('http')
  .createServer()
  .listen(3000);
const ip = require('ip');
const originPort = 8080;

const io = require('socket.io')(http, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: [
      `http://${ip.address()}:${originPort}`,
      `http://localhost:${originPort}`,
    ],
    credentials: true,
  },
  allowEIO3: true,
});

let senderStarted = false;

io.on('connection', (socket) => {
  socket.emit(
    'LESSONS',
    db.find('lessons', (i) => i)
  );
  socket.emit('SENDER', senderStarted);
  socket.emit('TRACKS', fs.readdirSync('src/assets/bells'));

  socket.on('switch_sender', (e) => {
    senderStarted = e;
    if (senderStarted) startSender();
    else stopSender();
    socket.broadcast.emit('SENDER', senderStarted);
  });

  socket.on('switch_lesson', (e) => {
    let lesson = db.findOne('lessons', (i, j) => j === e.index);
    db.edit(lesson, { checked: e.value });
    socket.broadcast.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('edit_lesson_bells', (e) => {
    let lesson = db.findOne('lessons', (i, j) => j === e.index);
    db.edit(lesson, { bells: e.value });
    socket.broadcast.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('add_lesson', (e) => {
    db.put('lessons', e);
    socket.broadcast.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('drag_lessons', (e) => {
    let lessons = db.find('lessons', (i) => i);
    db.delete(lessons);
    e.forEach((i) => db.put('lessons', i));
    socket.broadcast.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('delete_lesson', (e) => {
    let lesson = db.find('lessons', (i, j) => j === e);
    db.delete(lesson);
    socket.broadcast.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('delete_track', (e) => {
    fs.unlinkSync('src/assets/bells/' + e.track);
    let bell0 = db.find('lessons', (i) => i.bells[0].music === e.track);
    bell0.forEach((i) => {
      let previous = i;
      i.bells[0].music = '';
      db.edit(previous, i);
    });
    let bell1 = db.find('lessons', (i) => i.bells[1].music === e.track);
    bell1.forEach((i) => {
      let previous = i;
      i.bells[1].music = '';
      db.edit(previous, i);
    });
    socket.broadcast.emit('TRACKS', fs.readdirSync('src/assets/bells'));
    io.emit(
      'LESSONS',
      db.find('lessons', (i) => i)
    );
  });

  socket.on('upload_track', (e) => {
    let bells = fs.readdirSync('src/assets/bells/'),
      i = 1,
      name = e.name,
      exist = bells.some((i) => i === name);
    while (exist) {
      let temp = name.split('.');
      temp.splice(temp.length - 1, 0, `-${i}`);
      let f = temp.slice(0, temp.length - 2).join('.'),
        s = temp.slice(temp.length - 2, temp.length).join('.');
      exist = bells.some((i) => i === f + s);
      if (!exist) name = f + s;
      else i++;
    }
    fs.writeFileSync('src/assets/bells/' + name, e.file);
    io.emit('TRACKS', fs.readdirSync('src/assets/bells'));
  });
});

let sender = null;
function Sender() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDay();
  if (day < 6) {
    const time = `${Number(hours)}:${Number(minutes)}`;
    const lessons = db.find('lessons', (i) => i);
    for (let i of lessons) {
      if (i.checked) {
        let bell0 = i.bells[0],
          bell1 = i.bells[1];
        bell0.time = bell0.time
          .split(':')
          .map((i) => Number(i))
          .join(':');

        bell1.time = bell1.time
          .split(':')
          .map((i) => Number(i))
          .join(':');
        if (bell0.time === time) {
          if (bell0.music.length !== 0)
            exec(`python play.py ${bell0.music}`, (err) => {
              if (err) console.log(err);
            });
        }
        if (bell1.time === time) {
          if (!bell1.music.length !== 0)
            exec(`python play.py ${bell1.music}`, (err) => {
              if (err) console.log(err);
            });
        }
      }
    }
  }
}

function interval(callback) {
  const remaining = 60000 - (Date.now() % 60000);
  sender = setTimeout(() => {
    callback.call(null);
    interval(callback);
  }, remaining + (remaining < 50 ? 60000 : 0));
}

function startSender() {
  interval(Sender);
}
function stopSender() {
  clearTimeout(sender);
}
