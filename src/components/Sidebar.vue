<template>
  <div class="sidebar">
    <span class="sidebar-title"
      >Мелодии<span class="sidebar-subtitle">(.wav)</span></span
    >
    <div class="track" v-for="(track, index) in tracks" :key="index">
      <span :title="track" class="track-name">{{ track }}</span>
      <img
        class="track-delete"
        src="../assets/images/delete.png"
        @click="deleteTrack({ track, index })"
      />
    </div>
    <label class="track-add">
      <input
        class="track-add-input"
        type="file"
        accept=".wav"
        @change="addTrack"
      />

      <img class="track-add-image" src="../assets/images/plus.png" />
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    tracks() {
      return this.$store.state.tracks;
    },
  },
  data() {
    return {};
  },
  methods: {
    addTrack(e) {
      let file = e.target.files[0];
      this.$socket.emit('upload_track', { name: file.name, file });
      e.target.value = '';
    },
    deleteTrack(e) {
      this.$store.commit('delete_track', e);
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  padding: 20px;

  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;
}

.sidebar-title {
  display: flex;
  align-items: center;
  align-self: flex-start;
  font-size: 36px;
  margin: 10px 0 20px;
  font-weight: 500;
}

.sidebar-subtitle {
  margin-left: 10px;
  font-size: 24px;
  font-weight: 400;
}

.track {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  padding: 20px;
  max-width: 100%;
  margin: 15px 0;
  box-shadow: 0px 8px 20px 5px rgb(117 115 111 / 20%);
  border-radius: 5px;
}

.track-delete:active,
.track-add:active {
  transform: scale(0.85);
}

.track-name {
  width: 80%;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-delete {
  display: flex;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.track-add {
  display: flex;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  padding: 12px;
  max-width: 100%;
  margin: 15px 0;
  box-shadow: 0px 8px 20px 5px rgb(117 115 111 / 20%);
  border-radius: 5px;
  filter: contrast(0.5);
}

.track-add-input {
  display: none;
}

.track-add-image {
  width: 52px;
  height: 52px;
  cursor: pointer;
}
</style>
