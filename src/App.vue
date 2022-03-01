<template>
  <div id="app" :class="{ disconnected: !isConnected }">
    <Navbar></Navbar>
    <Main></Main>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Navbar,
    Main,
    Sidebar,
  },
  computed: {
    isConnected() {
      return this.$store.state.isConnected;
    },
  },
  created() {
    this.$socket.on('connect', () => {
      this.$store.commit('SOCKET_CONNECTED');
    });
    this.$socket.on('disconnect', () => {
      this.$store.commit('SOCKET_DISCONNECTED');
    });
  },
};
</script>

<style>
@font-face {
  font-family: 'Montserrat';
  font-weight: 100;
  src: url('./assets/fonts/Montserrat-Thin.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 200;
  src: url('./assets/fonts/Montserrat-ExtraLight.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 300;
  src: url('./assets/fonts/Montserrat-Light.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 400;
  src: url('./assets/fonts/Montserrat-Regular.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 500;
  src: url('./assets/fonts/Montserrat-Medium.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 600;
  src: url('./assets/fonts/Montserrat-SemiBold.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 700;
  src: url('./assets/fonts/Montserrat-Bold.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 800;
  src: url('./assets/fonts/Montserrat-ExtraBold.ttf');
}

@font-face {
  font-family: 'Montserrat';
  font-weight: 900;
  src: url('./assets/fonts/Montserrat-Black.ttf');
}
</style>

<style>
:root {
  --black: #1c1e2a;
  --dark-blue: #383c4c;
  --light-blue: #e7e9fd;
  --blue: #2753ff;
  --violet: #c4c8f0;
  --grey: #e0e0e0;
  --white: #fafafa;
  --red: #d32f2f;
  --green: #4caf50;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--grey);
}

::-webkit-scrollbar-thumb {
  background-color: var(--dark-blue);
  border-radius: 10px;
}

iframe {
  display: none !important;
}

* {
  font-family: Montserrat, Arimo;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  transition: 0.4s cubic-bezier(0.1, 0.71, 0.15, 1.37);
}

html,
body {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  max-height: 100vh;
  height: 100vh;
}

#app {
  display: grid;
  grid-template-areas:
    'navbar navbar navbar'
    'main main sidebar'
    'main main sidebar';
  grid-template-rows: 80px auto auto;
  grid-template-columns: auto 3fr 400px;
  max-width: 100vw;
  height: 100vh;
}

.navbar {
  grid-area: navbar;
}

.main {
  grid-area: main;
}

.sidebar {
  grid-area: sidebar;
}
</style>

<style scoped>
@keyframes background-animated {
  50% {
    background-color: var(--dark-blue);
  }
}

@keyframes show-background {
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.9);
  }
}

.disconnected {
  overflow: hidden;
}

.disconnected::before {
  content: '';
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  animation: show-background 0.4s both;
}

.disconnected::after {
  content: 'Подключение к серверу...';
  position: absolute;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  font-weight: bold;
  z-index: 1000;
  background-color: var(--white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: background-animated 3s 2s linear infinite;
}
</style>
