<template>
  <label class="slidecheckbox">
    <input
      class="slidecheckbox-input"
      type="checkbox"
      :id="_uid"
      :checked="checked"
      @change="onChange"
      :disabled="invalid"
    />
    <label
      :class="{ checked: checked }"
      :for="_uid"
      class="slidecheckbox-button"
    ></label>
  </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    invalid: Boolean,
  },
  model: {
    prop: 'checked',
    event: 'change-input',
  },
  data() {
    return {};
  },
  methods: {
    onChange(e) {
      if (this.invalid) this.$emit('change-input', false);
      else this.$emit('change-input', e.target.checked);
    },
  },
  watch: {
    invalid(e) {
      if (e) this.$emit('change-input', false);
    },
  },
};
</script>

<style>
.slidecheckbox-input {
  display: none;
}

.slidecheckbox {
  display: flex;
  margin: 10px;
  width: 80px;
  height: 40px;
  border-radius: 100px;
  background-color: var(--grey);
}

.slidecheckbox-button {
  position: relative;
  width: 50%;
  height: 100%;
  background-color: var(--red);
  border-radius: 100px;
  left: -1px;
  align-self: center;
}

input:checked + .slidecheckbox-button {
  background-color: var(--green);
  left: 51%;
}
</style>
