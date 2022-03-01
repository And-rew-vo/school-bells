<template>
  <transition name="fade" mode="out-in">
    <div class="modal-background" v-show="opened" @click.self="closeModal">
      <div class="modal">
        <img
          class="closeModal"
          @click="closeModal"
          src="../assets/images/close.png"
        />
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['opened'],
  model: {
    prop: 'opened',
    event: 'close-modal',
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('close-modal', false);
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
}

.modal {
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 400px;
  max-width: 750px;
  background: var(--white);
  height: 85%;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  overflow: auto;
}

.closeModal {
  position: absolute;
  align-self: flex-end;
  margin: -10px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: 0.4s cubic-bezier(0.1, 0.71, 0.15, 1.37);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: 0.4s cubic-bezier(0.1, 0.71, 0.15, 1.37);
}

.fade-enter .modal,
.fade-leave-to .modal,
.fade-leave-active .modal {
  transform: scale(0.8);
}
</style>
