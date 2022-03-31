<template>
  <div class="mainblock__prodlist">
    <div
      v-for="item in products"
      :key="`product_${item.id}`"
      class="product"
    >
      <div v-if="item.discount" class="product__discount">
        <img :src="`~/assets/icons/priceDown.png`" alt="" height="33px" width="59px">
      </div>
      <div class="product__main">
        <div class="product__main_planks">
          <div v-if="strategy" class="product__main_plank product__main_plank--strategy">
            <p>{{ 'Strategy' | localize }}</p>
          </div>
          <div v-if="item.video_courses.length" class="product__main_plank product__main_plank--course">
            <p>{{ 'Video course' | localize }}</p>
          </div>
        </div>
        <div class="product__image">
          <img :src="`https://pokerstove.relabs.ru/media/${item.image}`" alt="" height="260px">
        </div>
        <div v-if="prodAction" class="product__action">
          <img :src="action.image" alt="" height="88px" width="88px">
        </div>
      </div>
      <div class="product__info">
        <div class="product__info_title">
          {{ item.name }}
        </div>
        <div class="product__info_author">
          {{ item.author }}
        </div>
        <div class="product__info_description">
          {{ item.description }}
        </div>
        <div class="product__footer">
          <nuxt-link :to="`/store/${item.id}`" style="textDecoration:none">
            <div class="product__footer_link">
              <p>{{ 'Details' | localize }}</p>
            </div>
          </nuxt-link>
          <div class="product__footer_price">
            <div class="product__footer_price--block">
              <div class="product__footer_price--block_coast">
                {{ item.full_price }}
              </div>
              <div class="product__footer_price--block_currency">
                {{ item.currency }}
              </div>
            </div>
            <button type="button" class="product__footer_price--btn" @click="exportClick(item)">
              <a class="addToCart">
                <img src="~/assets/icons/cart.png">
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      product: null,
      paymentWindow: false,
      prodDiscount: true,
      prodAction: true,
      strategy: true,
      course: true,
      selectedSubject: null,
      ambassadorSelected: null,
      discount: {
        status: false,
        image: require('~/assets/icons/priceDown.png'),
        sale: ''
      },
      action: {
        image: require('~/assets/icons/action.png'),
        date: ''
      },
      small: false
    }
  },
  methods: {
    exportClick (item) {
      this.$emit('click-buy', item)
    }
  }
}

</script>

<style lang="scss">
.mainblock {
  display: flex;
  flex-direction: column;
  padding: 30px;
  &__prodlist {
  display: flex;
  padding-top: 5px;
  flex-wrap: wrap;
  }
  &__filter {
    max-width: 768px;
    display: flex;
    padding: 35px;
  }
}
.product {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  padding: 15px;
  &__discount {
    display: flex;
    justify-content: flex-end;
    padding-right: 57px;
  }
  &__wrapp {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__main {
    display: flex;
    padding-bottom: 28px;
    justify-content: center;
    &_plank {
      display: flex;
      align-items: center;
      width: 100px;
      height: 22px;
      position: relative;
      top: 195px;
      left: 50px;
      margin: 8px 0;
      &--strategy {
        background-color: #e34120;
        justify-content: center;
      }
      &--course {
        background-color: #0072a1;
        justify-content: center;
      }
    }
  }
  &__image {
    min-width: 200px;
    display: flex;
  }
  &__info {
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: "Arial MT", sans-serif;
    font-style: normal;
    text-align: left;
    &_title {
      color: #ffffff;
      font-size: 25px;
      letter-spacing: 0.63px;
      line-height: normal;
    }
    &_author {
      color: #01b56b;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: normal;
      line-height: 25px;
    }
    &_description {
      padding: 23px 23px 23px 0;
      color: #919191;
      font-size: 15px;
      font-weight: 400;
      letter-spacing: normal;
      line-height: 140%;
    }
  }
  &__action {
    position: relative;
    top: 184px;
    right: 57px;
    bottom: 49px;
  }
  &__footer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    line-height: normal;
    text-align: left;
    &nuxt-link{
      text-decoration: none;
    }
    &_link {
      display: flex;
      color: #01b56b;
      font-family: "Arial MT", sans-serif;
      font-size: 15px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      padding: 32px 0;
      cursor: pointer;
      p {
        border-bottom: 1px dashed #01b56b;
        padding-bottom: 1px;
        transition-property: border-bottom;
        transition-duration: .2s;
        &:hover {
          border-bottom: 1px dashed #161616;
        }
      }
    }
    &_price {
      display: flex;
      align-items: center;
      border-top: 1px solid #a3a3a3;
      border-bottom: 1px solid #a3a3a3;
      justify-content: space-around;
      &--block {
        color: #01b56b;
        display: flex;
        align-items: center;
        min-width: 120px;
        &_coast {
          font-family: "Open Sans";
          font-size: 25px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: 0.63px;
        }
        &_currency {
          font-family: "Arial MT", sans-serif;
          font-size: 18px;
          font-style: normal;
          letter-spacing: 0.45px;
          line-height: normal;
          padding-left: 10px;
        }
      }
      &--btn {
        width: 76px;
        height: 76px;
        border: 6px solid #161616;
        background-color: #007545;
        transform: rotate(45deg);
        margin-left: 90px;
        cursor: pointer;
        flex-shrink: 0;
        img {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
@media (min-width: 1641px){
  .product {
    padding: 25px 20px;
    max-width: 25%;
    &__info {
      padding-left: 0px;
      margin: 5px;
    }
    &__description {
      padding: 23px;
    }
  }
}
@media (min-width: 1390px) and (max-width: 1640px){
  .product {
    padding: 25px 20px;
    justify-content: center;
    max-width: 33%;
  }
}
@media (min-width: 990px) and (max-width: 1390px){
  .product {
    padding: 20px 12px;
    justify-content: center;
    max-width: 50%;
  }
}
@media (min-width: 670px) and (max-width: 990px){
  .product {
    padding: 15px 10px;
    justify-content: center;
    max-width: calc(50vw - 30px);
  }
}
@media (max-width: 670px) {
  .product {
    min-width: 100%;
    padding: 15px 10px;
    justify-content: center;
  }
}
</style>
