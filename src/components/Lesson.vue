<template>
  <div>
    <Modal v-model="modalOpened">
      <div class="modal">
        <span class="modal-title"> {{ id + 1 }} урок </span>
        <div class="modal-bells">
          <div class="modal-bell bell-to-lesson">
            <div class="bell-title">Начало урока</div>
            <div class="bell-actions">
              <input
                required
                class="bell-select-time"
                type="time"
                v-model="lessonBells[0].time"
                @input="updateBells"
              />
              <select
                class="bell-select-music"
                v-model="lessonBells[0].music"
                @change="updateBells"
                :class="{
                  invalid: !lessonBells[0].music.length,
                }"
              >
                <option
                  class="bell-select-music-option"
                  value=""
                  disabled
                  selected
                >
                  Выберите мелодию
                </option>
                <option
                  class="bell-select-music-option"
                  v-for="track in tracks"
                  :key="track"
                  >{{ track }}</option
                >
              </select>
            </div>
          </div>
          <div class="modal-bell bell-from-lesson">
            <div class="bell-title">Окончание урока</div>
            <div class="bell-actions">
              <input
                required
                class="bell-select-time"
                type="time"
                v-model="lessonBells[1].time"
                @input="updateBells"
              />
              <select
                class="bell-select-music"
                v-model="lessonBells[1].music"
                @change="updateBells"
                :class="{
                  invalid: !lessonBells[1].music.length,
                }"
              >
                <option
                  class="bell-select-music-option"
                  value=""
                  disabled
                  selected
                >
                  Выберите мелодию
                </option>
                <option
                  class="bell-select-music-option"
                  v-for="track in tracks"
                  :key="track"
                  >{{ track }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <div class="modal-button delete" @click="deleteLesson">Удалить</div>
        </div>
      </div>
    </Modal>
    <label :for="_uid" class="lesson" :class="{ invalid: invalid }">
      <div :class="{ active: lessonChecked }" class="lesson-number">
        <span>{{ id + 1 }} урок</span>
        <span
          ><span>{{ bells[0].time }} | {{ bells[1].time }}</span></span
        >
      </div>
      <SlideCheckbox v-model="lessonChecked" :invalid="invalid"></SlideCheckbox>
      <input
        class="open-checkbox"
        :id="_uid"
        @input="openModal"
        type="checkbox"
      />
    </label>
  </div>
</template>

<script>
import SlideCheckbox from './SlideCheckbox';
import Modal from './Modal';

export default {
  components: {
    SlideCheckbox,
    Modal,
  },
  props: ['bells', 'checked', 'id'],
  computed: {
    lessonChecked: {
      get() {
        return this.checked;
      },
      set(e) {
        this.$store.commit('switch_lesson', { value: e, index: this.id });
      },
    },
    lessonBells: {
      get() {
        return this.bells;
      },
      set(e) {
        this.$store.commit('edit_lesson_bells', { value: e, index: this.id });
      },
    },
    tracks() {
      return this.$store.state.tracks;
    },
    invalid() {
      let bell0 = this.bells[0].time
          .split(':')
          .every((i) => i !== '--' && i !== ''),
        bell1 = this.bells[1].time
          .split(':')
          .every((i) => i !== '--' && i !== '');
      if (
        !(
          bell0 &&
          bell1 &&
          this.bells[0].music.length &&
          this.bells[1].music.length
        )
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      modalOpened: false,
      formValidates: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpened = true;
    },
    updateBells() {
      let temp = this.lessonBells;
      this.lessonBells = temp;
    },
    deleteLesson() {
      this.modalOpened = false;
      this.$store.commit('delete_lesson', this.id);
    },
  },
  watch: {
    modalOpened(e) {
      this.$emit('toggleDrag', e);
    },
  },
};
</script>

<style scoped>
.lesson {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  margin: 30px;
  padding: 25px 0;
  background-color: var(--white);
  border-radius: 15px;
  box-shadow: 0px 8px 20px 5px rgba(117, 115, 111, 0.2);
  transition: 0.4s;
  cursor: pointer;
}

.lesson.invalid * {
  color: var(--red) !important;
}

.lesson:active {
  transform: scale(0.85);
  transition: 0.3s;
}

.lesson-number {
  font-size: 25px;
  color: var(--grey);
  transition: 0.4s;
  /**/
  display: flex;
  flex-direction: column;
}

.lesson-number > span + span {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.modal-title {
  font-size: 28px;
  font-weight: bold;
}

.modal-bells {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  max-width: 650px;
}

.modal-bell {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 30%;
  max-height: 200px;
  padding: 20px;
  margin: 20px 0;
}

.bell-title {
  font-size: 24px;
  font-weight: bold;
}

.bell-actions {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.bell-select-time {
  width: 130px;
  font-size: 25px;
  border: 0;
  border-bottom: 2px solid var(--black);
  transition: 0.4s;
  background-color: transparent;
  padding: 10px 5px;
  cursor: pointer;
}

.bell-select-time:invalid {
  color: var(--red);
  border-bottom: 2px solid var(--red) !important;
}

.bell-select-time:focus {
  border-bottom: 2px solid var(--blue);
}

.bell-select-time::-webkit-calendar-picker-indicator {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC3ElEQVR4nO2aO2gVQRSGv+TGaHyihAgiIgoJWJhCUZAUFhrEQkGwEESEYJNGrYyNVtHGR6OdqcTCB2ihjYKgiAg2KTRGRCGiGBTF9zPJWuyO5sbdvTszZ+ayOB8cuNU5/zewuXvPBAKBQCAQCAQCgSzagI1Apd5BNKgA3cTZregAXgIRcAlosm3ogSbirBFx9g7TRu38lVd1Fmi0z+iMBuAM1ZlHgRW6jdLkVZ0WCuuC46Rn1jqEPHlV/ZKphThCfuZCh1BEXlWftIEF+yiWOfcQdORV7Xdho0kveplTD8FEPgImgB5XZgXYCYyn5NI6BFN5VWPAdpeWGWwFfhnk/ecQhi2aqPpO/OLhi+5kpm3uIZA5gAj4AnQ5lFZ0JbMkMg9B/Ai8Emr4AVjtTB06gXdCWV8z6e/ASuCtUOM3GLx5FaCd+LmVyPgeWDV1wFrgo9CAF8AyQfklwIhQts/kPKrrgE9Cg0aS4LYsAp4KZfoKrK81cAPwTWjgY2ChhXwr8FAoyw9gc9HBm5D5momAQWC+gfxc4L5Qhp/AFt0A27B70Zhcd4HZGrNbgFtCs8eAHbryil2YvWqm1Q1geoGZzcA1oZkTwB5TeUVP0kgi0GXyt0oV4LygfK+tvGKvUKiI7K1S2jbHpg5IySsOC4ZL2yqdEOx/SNC7iqOCIU966OuEY4Jh+4CDgv1OOfT+QwMwIBhaqgaSbF5oBM45FtKpi9Th4qYCXLAMLlFXgGmOXTNpBq7WCOiyrgMznFvWoAW4iX/5O8AsD36FmAncxp/8PWCOFzMN5iH36y2vBoEFnpy0aQUe4E5+GLv9ghfagEfIyz8h3g6VgsXAM+TknwNLvRoIsBy7GydVo1j8k0O9sb1zqNrdlxXTO4fU3X1ZWYPenUPu7r6sFL1zKLS7Lyu17hy0dvdlJevOwWh3X1am3jlY7e7Lym7iO4fx5PN/SSfx12QgEAgEAoFAIOCZ35muTWnN9rIsAAAAAElFTkSuQmCC');
  background-position: center center;
  width: 12%;
}

.bell-select-music {
  font-size: 18px;
  border: 0;
  border-bottom: 2px solid var(--black);
  background-color: transparent;
  appearance: none;
  padding: 10px 5px;
  cursor: pointer;
}

.bell-select-music.invalid {
  border-color: var(--red);
  color: var(--red);
}

.bell-select-music-option[disabled][value=''] {
  display: none;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.modal-button {
  text-align: center;
  width: 60%;
  padding: 15px 0;
  min-width: 150px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 20px;
  color: var(--white);
}

.modal-button.delete {
  background: var(--red);
  cursor: pointer;
}

.open-checkbox {
  display: none;
}

.lesson-number.active {
  color: black;
}

>>> .slidecheckbox {
  z-index: 2;
}

>>> .slidecheckbox-button {
  background-color: var(--violet) !important;
}

>>> .slidecheckbox-button.checked {
  background-color: var(--blue) !important;
}
</style>
