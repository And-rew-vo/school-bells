import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//this._vm.$socket.emit('play', ' ');

export default new Vuex.Store({
  state: {
    lessons: [],
    isConnected: true,
    senderStarted: false,
    tracks: [],
  },
  mutations: {
    SOCKET_LESSONS(state, payload) {
      state.lessons = payload;
    },
    SOCKET_SENDER(state, payload) {
      state.senderStarted = payload;
    },
    SOCKET_CONNECTED(state) {
      state.isConnected = true;
    },
    SOCKET_DISCONNECTED(state) {
      state.isConnected = false;
    },
    SOCKET_TRACKS(state, payload) {
      state.tracks = payload;
    },
    add_lesson(state) {
      let lesson = {
        bells: [
          { time: '--:--', music: '' },
          { time: '--:--', music: '' },
        ],
        checked: false,
      };
      state.lessons.push(lesson);
      this._vm.$socket.emit('add_lesson', lesson);
    },
    drag_lessons(state, payload) {
      state.lessons = payload;
      this._vm.$socket.emit('drag_lessons', payload);
    },
    switch_sender(state, payload) {
      state.senderStarted = payload;
      this._vm.$socket.emit('switch_sender', payload);
    },
    switch_lesson(state, payload) {
      state.lessons[payload.index].checked = payload.value;
      this._vm.$socket.emit('switch_lesson', payload);
    },
    edit_lesson_bells(state, payload) {
      state.lessons[payload.index].bells = payload.value;
      this._vm.$socket.emit('edit_lesson_bells', payload);
    },
    delete_lesson(state, payload) {
      state.lessons.splice(payload, 1);
      this._vm.$socket.emit('delete_lesson', payload);
    },
    delete_track(state, payload) {
      state.tracks.splice(payload.index, 1);
      this._vm.$socket.emit('delete_track', payload);
    },
  },
  actions: {},
});
