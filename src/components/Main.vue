<template>
  <draggable
    class="main"
    v-model="lessons"
    draggable=".drag"
    :options="{ disabled: disabledDraggable }"
  >
    <Lesson
      v-for="(lesson, j) in lessons"
      :key="j"
      :bells="lesson.bells"
      :checked="lesson.checked"
      :id="j"
      @toggleDrag="toggleDraggable"
      class="drag"
    ></Lesson>

    <div class="add-lesson" slot="footer" @click="addLesson">
      <img class="add-lesson-image" src="../assets/images/plus.png" />
    </div>
  </draggable>
</template>

<script>
import Lesson from './Lesson';
import draggable from 'vuedraggable';

export default {
  components: {
    Lesson,
    draggable,
  },
  computed: {
    lessons: {
      get() {
        return this.$store.state.lessons;
      },
      set(e) {
        this.$store.commit('drag_lessons', e);
      },
    },
  },
  data() {
    return {
      disabledDraggable: false,
    };
  },
  methods: {
    addLesson() {
      this.$store.commit('add_lesson');
    },
    toggleDraggable(e) {
      this.disabledDraggable = e;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  background: var(--light-blue);
  align-content: flex-start;
  overflow: auto;
}

.add-lesson {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 30px;
  padding: 25px 0;
  background-color: var(--white);
  border-radius: 15px;
  box-shadow: 0px 8px 20px 5px rgb(117 115 111 / 20%);
  transition: 0.4s;
  cursor: pointer;
}

.add-lesson:active {
  transform: scale(0.85);
  transition: 0.3s;
}

.add-lesson-image {
  width: 60px;
  filter: contrast(0.5);
}
</style>
