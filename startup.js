const { exec } = require('child_process');

exec(`node ${__dirname}/app.js`, (err) => {
  if (err) console.log(err);
});

exec(`cd ${__dirname}/ & npm run serve`, (err) => {
  if (err) console.log(err);
});
