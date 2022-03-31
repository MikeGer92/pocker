<template>
  <div
    v-if="show"
    class="button-editor"
  >
    <div
      class="button-editor__close"
      @click="_closeEditor"
    />
    <div class="button-editor__text">
      <div class="button-editor__column">
        <div class="button-editor__label">
          {{ 'titleText' | localize }}
        </div>
        <Rl-input
          v-model="button.name"
        />
      </div>
      <div class="button-editor__column">
        <div class="button-editor__label">
          {{ 'descriptionText' | localize }}
        </div>
        <Rl-input v-model="button.description" />
      </div>
    </div>
    <div class="button-editor__chooser">
      <div class="button-editor__chooser-title">
        {{ 'chooseColor' | localize }}
      </div>
      <div class="button-editor__colors">
        <div
          v-for="(color, index) in colors"
          :key="'color-' + color + '-' + index"
          :class="{
            'button-editor__color': true,
            'button-editor__color--active': color === button.color
          }"
          :style="{ 'background-color': color }"
          @click="button.color = color"
        />
      </div>
    </div>
    <div class="button-editor__controls">
      <Rl-button
        color="gray"
        @click="_closeEditor"
      >
        {{ 'closeText' | localize }}
      </Rl-button>
      <Rl-button
        style="margin-left: 25px;"
        @click="_saveButton"
      >
        {{ 'save' | localize }}
      </Rl-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonEditor',
  data () {
    return {
      show: false,
      colors: ['#1792A4', '#2257DC', '#1A2B7A', '#601B8F', '#A81D63', '#FD0035', '#EB4747', '#FE6D00', '#FFB92E', '#859919', '#00CA63'],
      button: {
        name: '',
        description: '',
        color: '#1792A4'
      },
      originalButton: null
    }
  },
  methods: {
    init (button = null) {
      this.show = true
      if (button) {
        this.button.name = button.name
        this.button.description = button.description
        this.button.color = button.color
        this.originalButton = button
      }
    },
    _saveButton () {
      if (this.originalButton) {
        this.originalButton.name = this.button.name
        this.originalButton.description = this.button.description
        this.originalButton.color = this.button.color
      } else {
        this.$emit('onButtonAdd', Object.assign({}, this.button))
      }
      this._resetForm()
      this.show = false
    },
    _resetForm () {
      this.button.name = ''
      this.button.description = ''
      this.button.color = this.colors[0]
      this.originalButton = null
    },
    _closeEditor () {
      this._resetForm()
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .button-editor {
    background-color: $form-background;
    padding: 42px 24px;
    position: relative;
    min-height: 100%;

    &__text {
      display: flex;
      justify-content: space-between;
    }

    &__column {
      width: 48%;
    }

    &__label {
      font-size: 12px;
      margin-bottom: 3px;
    }

    &__chooser {
      text-align: center;
      margin-top: 50px;
    }

    &__colors {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }

    &__color {
      margin-right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      border: 1px solid #fff;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &:last-child {
        margin-right: 0;
      }

      &--active {
        &::after {
          content: '';
          display: block;
          width: 8px;
          height: 4px;
          border-left: 4px solid #fff;
          border-bottom: 4px solid #fff;
          transform: rotate(-45deg);
        }
      }
    }

    &__controls {
      margin-top: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 12px;
      width: 18px;
      height: 18px;
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(45deg);
        transition: all 0.2s ease;
      }

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-45deg);
        transition: all 0.2s ease;
      }

      &:hover {
        &::before {
          background: #d0d0d0;
        }

        &::after {
          background: #d0d0d0;
        }
      }
    }
  }
</style>
