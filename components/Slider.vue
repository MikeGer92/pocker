<template>
  <div class="slider">
    <hooper
      ref="hooper"
      :settings="sliderOptions"
      class="slider__wrapper"
      @slide="_onSlide"
    >
      <slide
        v-for="(item, index) in items"
        :key="uid + '-slide-' + index"
        class="slider__item"
      >
        <template v-if="item[shortLang].showVideo">
          <iframe
            width="100%"
            height="300"
            :src="`https://www.youtube.com/embed/${item[shortLang].video}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </template>
        <template v-else>
          <div
            v-if="item[shortLang].label && item[shortLang].label !== ''"
            class="slider__label"
          >
            {{ item[shortLang].label }}
          </div>
          <div
            class="slider__play"
            @click="item[shortLang].showVideo = true"
          >
            <img width="50" height="50" src="~@/assets/landing/play_btn.png" alt="play">
          </div>
          <div class="slider__image">
            <img width="100%" :src="item[shortLang].img" :alt="item[shortLang].label">
          </div>
        </template>
      </slide>
    </hooper>
    <div
      v-if="items.length > 1"
      class="slider__controls"
    >
      <div class="slider__control-number slider__control-number--first">
        1
      </div>
      <div class="slider__control-list">
        <div
          v-for="(_, index) in items"
          :key="'control-' + uid + '-' + index"
          :class="{
            'slider__control-item': true
          }"
          @click="_goToSlide(index)"
        />
        <div
          :style="{
            left: sliderDotOffset
          }"
          class="slider__control-active"
        />
      </div>
      <div class="slider__control-number slider__control-number--last">
        {{ items.length }}
      </div>
    </div>
    <div
      v-if="items.length > 1"
      class="slider__arrows"
    >
      <div
        class="slider__arrow slider__arrow--left"
        @click="_goBack"
      />
      <div
        class="slider__arrow slider__arrow--right"
        @click="_goNext"
      />
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'Slider',
  components: {
    Hooper,
    Slide
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      uid: this.uid,
      currentItem: 0,
      sliderOptions: {
        itemsToShow: 1,
        itemsToSlide: 1,
        wheelControl: false,
        keysControl: false
      }
    }
  },
  computed: {
    sliderDotOffset () {
      return (30 * this.currentItem) + 'px'
    },
    currentLang () {
      return this.$store.getters['user/language']
    },
    shortLang () {
      return this.currentLang === 'ru-RU' ? 'ru' : 'en'
    }
  },
  methods: {
    _onSlide ({ currentSlide }) {
      this.currentItem = currentSlide
    },
    _goToSlide (index) {
      this.$refs.hooper.slideTo(index)
    },
    _goBack () {
      this.$refs.hooper.slidePrev()
    },
    _goNext () {
      this.$refs.hooper.slideNext()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';

.slider {
  position: relative;

  * {
    outline: none;
  }

  &__item {
    position: relative;
  }

  &__label {
    font-size: 12px;
    line-height: 133%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 10%;
    left: 0;
    letter-spacing: 0.7px;
    padding-left: 18px;

    &::before {
      content: '';
      display: block;
      border: 16px solid transparent;
      border-left-color: $main-green;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: .8;
    padding: 7px;
    background-size: contain;
    border: 1px solid #fff;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.19, 1, .22, 1);

    img {
      display: block;
    }

    &:hover {
      padding: 10px;
      border-color: transparent;
      opacity: 0.9;
    }
  }

  &__image {
    img {
      display: block;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  &__control-list {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
  }

  &__control-item {
    width: 30px;
    height: 1px;
    background: $main-green;
    cursor: pointer;
  }

  &__control-active {
    width: 30px;
    height: 2px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .2s cubic-bezier(.19, 1, .22, 1);
  }

  &__control-number {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;

    &--first {
      margin-right: 17px;
    }

    &--last {
      margin-left: 17px;
    }
  }

  &__arrows {
    display: none;
  }

  @media (min-width: 400px) {
    &__label {
      font-size: 18px;
      padding-left: 30px;

      &::before {
        content: '';
        display: block;
        border: 24px solid transparent;
        border-left-color: $main-green;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  @media (min-width: 768px) {
    &__arrows {
      display: block;
    }

    &__label {
      font-size: 25px;
      padding-left: 36px;

      &::before {
        border-width: 30px;
      }
    }

    &__controls {
      justify-content: flex-end;
    }
  }

  &__arrow {
    cursor: pointer;
    position: absolute;
    top: calc(50% - 120px);

    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 2px;
      background: #c4c4c4;
      transform: rotate(-45deg);
      position: relative;
      top: -2px;
    }

    &::after {
      content: '';
      display: block;
      width: 12px;
      height: 2px;
      background: #c4c4c4;
      transform: rotate(45deg);
      position: relative;
      top: 3px;
    }

    &--left {
      left: -100px;
      padding: 100px 60px 100px 20px;
    }

    &--right {
      right: -100px;
      padding: 100px 20px 100px 60px;

      &::after {
        top: -6px;
      }

      &::before {
        top: 3px;
      }
    }

    &:hover {
      &::before {
        background: $main-green;
      }

      &::after {
        background: $main-green;
      }
    }
  }

  @media (min-width: 1140px) {
    &__arrow {
      &--left {
        left: -60px;
        padding: 100px 20px 100px 30px;
      }

      &--right {
        right: -60px;
        padding: 100px 30px 100px 20px;
      }
    }
  }
}

.hooper {
  height: auto !important;
}
</style>
