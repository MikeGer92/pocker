<template>
  <div class="product-container">
    <div class="main">
      <div v-if="prodpackage" class="main__product">
        <div class="main-product__image">
          <div class="main-product__image_main">
            <img :src="`https://pokerstove.relabs.ru/media/${prodgalary[0]}`" class="main-product__image_main-big">
          </div>
          <div class="main-product__image_add">
            <div class="carousel-wrap" style="width: 677px">
              <vue-slick-carousel
                :arrows="true"
                :infinite="true"
                :slides-to-show="3"
                :dots="true"
                class="carousel"
              >
                <div v-for="n in prodgalary.length" :key="n" class="carousel-sorce">
                  <img :src="`https://pokerstove.relabs.ru/media/${prodgalary[n-1]}`">
                </div>
              </vue-slick-carousel>
            </div>
          </div>
        </div>
        <el-dialog
          :visible.sync="paymentWindowRes"
        >
          <PaymentWindow
            :offer="prodOffer"
            :payrec="payParams"
            @closePaymentWindow="paymentWindowRes=false"
          />
        </el-dialog>
        <div class="main-product__wrap">
          <div class="main-product__nav">
            <div class="main-product__nav_block">
              <nuxt-link to="/" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  {{ 'Main page' | localize }}
                </div>
              </nuxt-link>
              <nuxt-link to="/store" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  {{ 'rangesStore' | localize }}
                </div>
              </nuxt-link>
              <nuxt-link to="/store" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  {{ prodpackage.name }}
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="main-product__about">
            <div class="main-product__about_title">
              <div class="main-product__about_title-text">
                {{ prodpackage.name }}
              </div>
            </div>
            <div class="main-product__about_author">
              <div class="main-product__about_author-text">
                {{ prodpackage.author }}
              </div>
            </div>
            <div v-if="product.results" class="main-product__about_results">
              <div class="main-product__about_results-result">
                <a
                  target="_blank"
                  class="main-product__about_results-result--link"
                  :href="`${product.results}`"
                >
                  <img class="main-product__about_results-result--img" src="~/assets/icons/result-icon.png" alt="">
                  {{ 'Results' | localize }}
                </a>
              </div>
              <div v-if="product.online" class="main__product_about-results-online">
                <a
                  class="main-product__about_results-result--link"
                  target="_blank"
                  :href="`${product.online}`"
                >
                  <img class="main-product__about_results-result--img" src="~/assets/icons/online-icon.png" alt="">
                  {{ 'Online' | localize }}
                </a>
              </div>
            </div>
            <div class="main-product__about_descr">
              <p>{{ prodpackage.description }}</p>
            </div>
          </div>
          <div class="main-product__option">
            <div class="main-product__option_config">
              <div class="main-product__option_config-program">
                <div class="main-product__option_config-program--info">
                  <img class="main-product__option_config-program--img" src="~/assets/icons/program-icon.png" alt="">
                  <div class="main-product__option_config-program--about">
                    <div class="main-product__option_config-program--title">
                      PROGRAM:
                      <!-- {{ program.title }} -->
                    </div>
                    <div class="main-product__option_config-program--charac">
                      HOLDEM.WIKI + FULL OPTIONS
                      <!-- {{ program.charac }} -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="main-product__option_config-game">
                <div class="main-product__option_config-game--info">
                  <img class="main-product__option_config-game--img" src="~/assets/icons/game-icon.png" alt="">
                  <div class="main-product__option_config-game--about">
                    <div class="main-product__option_config-game--title">
                      GAME TYPE:
                      <!-- {{ program.title }} -->
                    </div>
                    <div class="main-product__option_config-game--charac">
                      CASH HEADSUP START TABLES
                      <!-- {{ program.charac }} -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="main-product__option_config-limit">
                <div class="main-product__option_config-limit--info">
                  <img class="main-product__option_config-limit--img" src="~/assets/icons/play-icon.png" alt="">
                  <div class="main-product__option_config-limit--about">
                    <div class="main-product__option_config-limit--title">
                      PLAY LIMITS:
                      <!-- {{ program.title }} -->
                    </div>
                    <div class="main-product__option_config-limit--charac">
                      UP TO NL 100
                      <!-- {{ program.charac }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="coursesVideo" class="main-product__option_youtube">
              <div
                class="main-product__option_youtube-screen"
              >
                <iframe
                  width="300"
                  height="200"
                  :src="`${coursesVideo}`"
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </div>
          </div>
          <div class="main-product__offer">
            <div class="main-product__offer_title">
              <p class="main-product__offer_title-text">
                {{ 'Package offer' | localize }}
              </p>
            </div>
            <div class="main-product__offer_wrapp">
              <div class="main-product__offer_content">
                <div class="product-content">
                  <div class="product-content__wrap">
                    <div class="product-content__main">
                      <el-checkbox
                        v-model="checkedS"
                      />
                      <div class="product-content__name">
                        {{ 'Strategy' | localize }}
                      </div>
                    </div>
                    <div class="product-content__price">
                      <div class="product-content__price_coast">
                        {{ product.price }}
                      </div>
                      <div class="product-content__price_currency">
                        <!-- руб -->
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="courses" class="video-content">
                  <div class="video-content__wrap">
                    <div class="video-content__main">
                      <el-checkbox
                        v-model="checkedV"
                      />
                      <div class="video-content__name">
                        {{ 'Video course' | localize }}
                      </div>
                    </div>
                    <div class="video-content__price">
                      <div class="video-content__price_coast">
                        {{ courses.price }}
                      </div>
                      <div class="video-content__price_currency">
                        <!-- руб -->
                      </div>
                    </div>
                  </div>
                  <div v-if="product.subscribe" class="video-content__link">
                    <a>{{ 'or free by subscription' | localize }}</a>
                  </div>
                </div>
              </div>
              <div class="main-product__offer_coast">
                <div class="offer-coast">
                  <div class="offer-coast__wrap">
                    <div class="offer-coast__main">
                      <p>{{ 'Package price' | localize }}</p>
                    </div>
                    <div class="offer-coast__price_total">
                      <div class="offer-coast__price_total-coast">
                        {{ calcFullPrice }}
                      </div>
                      <div class="offer-coast__price_total-currency">
                        <!-- руб -->
                      </div>
                    </div>
                  </div>
                  <button type="button" class="addToCart" @click="showPaymentItem">
                    {{ 'Buy' | localize }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="all-package">
        <div class="all-package__wrap">
          <div class="all-package__title">
            <img class="all-package__title_icon" src="~/assets/icons/all-pack-icon.png">
            <div class="all-package__title_text">
              {{ 'ALL VIDEO COURSES IN ONE SUBSCRIPTION' | localize }}
            </div>
          </div>
          <button type="button" class="all-package__btn">
            {{ 'Checkout now' | localize }}
          </button>
        </div>
      </div>
      <div class="other__offers">
        <h2 style="text-align: center">
          {{ 'Similar Packs' | localize }}
        </h2>
        <Product v-if="products" :products="products" @click-buy="showPaymentWindow" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
export default {
  components: { Product },
  data () {
    return {
      limit: 4,
      page: 1,
      total: 0,
      coast_products: null,
      payParams: {},
      prodOffer: null,
      prodItem: null,
      checkedS: true,
      checkedV: true,
      full_price: '',
      paymentWindowRes: false,
      prodgalary: [
      ],
      productId: '',
      prodpackage: null,
      product: null,
      courses: null,
      coursesVideo: 'https://www.youtube.com/embed/MkqO3JMbhHM',
      products: []
    }
  },
  computed: {
    calcFullPrice () {
      if (!this.courses) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.checkedV = false
      }
      if (!this.checkedS && !this.checkedV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.full_price = 0
      } else if (this.checkedS && !this.checkedV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.full_price = this.product.price
      } else if (!this.checkedS && this.checkedV) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.full_price = this.courses.price
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.full_price = this.prodpackage.full_price
      }
      return this.full_price
    }
  },
  mounted () {
    this.getProduct()
  },
  created () {
    this.getProducts()
  },
  methods: {
    showPaymentWindow (product) {
      this.prodOffer = product
      this.paymentWindowRes = !this.paymentWindowRes
    },
    showPaymentItem () {
      this.prodOffer = this.prodpackage
      this.paymentWindowRes = !this.paymentWindowRes
    },
    async getProduct () {
      this.productId = this.$route.params.product_id
      try {
        const response = await this.$axios.get('/api/v1/shop/package', { params: { package_id: this.productId } })
        this.prodpackage = response.data.data
        this.full_price = this.prodpackage.full_price
        this.product = response.data.data.products[0]
        this.courses = response.data.data.video_courses[0]
        this.prodgalary = this.prodpackage.prodgalary
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getProducts () {
      const params = {
        page: this.page,
        limit: this.limit
      }
      try {
        const response = await this.$axios.get('/api/v1/shop', { params })
        this.products = response.data.items
        this.total = response.data.total
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getCoastProducts () {
      try {
        const response = await this.$axios.post('api/v1/shop/cost/shop')
        this.coast_products = response.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getPayParams (data) {
      try {
        const response = await this.$axios.post('/api/v1/shop/cost/shop', data)
        this.payCloudParams = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    }
  }
}
</script>

<style lang="scss">
.slick-slide {
  img {
    display: block;
    width: 226px;
    height: 300px;
  }
}
.el-dialog{
  margin-top: 100px;
}
.el-dialog__body {
  display: flex;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  position: absolute;
  z-index: 999;
}
.el-dialog__close {
    width: 20px;
    height: 20px;
}
.el-dialog__header {
    padding: 0;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 60px;
  right: calc(20px - ((1920px - 100vw) / 4));
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
}
.product-container {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
}
.main {
  display: flex;
  flex-direction: column;
  &__product {
    display: flex;
    justify-content: space-around;
    padding: 30px;
  }
}
.main-product {
  &__nav {
    display: flex;
    &_block {
      width: 100%;
      padding: 10px 0;
      display: flex;
      border-bottom: solid 1px #a3a3a3;
      border-top: solid 1px #a3a3a3;
      &-link {
        color: #a3a3a3;
        font-family: "Arial MT";
        font-size: 13px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;
        text-align: left;
        padding-right: 10px;
      }
    }
  }
  &__image {
    max-width: 800px;
    padding: 58px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &_main {
      padding-top: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      &-big {
        max-width: 350px;
      }
    }
    &_add {
      padding-top: 50px;
      display: flex;
      max-width: 100%;
      &-small {
        margin: 30px;
        max-width: 150px;
      }
    }
  }
  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 30px;
    min-width: 300px;;
    max-width: 677px;
  }
  &__about {
    align-items:flex-start;
    &_title {
      display: flex;
      max-width: 345px;
      padding-top: 58px;
      &-text {
        color: #ffffff;
        font-family: "Open Sans - Semibold", sans-serif;
        font-size: 35px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: 35px;
        text-align: left;
      }
    }
    &_author {
      padding-top: 35px;
      display: flex;
      max-width: 295px;
      &-text {
        height: 17px;
        color: #01b56b;
        font-family: "Open Sans", sans-serif;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: 35px;
        text-align: left;
      }
    }
    &_results {
      display: flex;
      padding-top: 35px;
      &-result, &-online {
        padding-right: 100px;
        &--link {
          display: flex;
          align-items: center;
          color: #a3a3a3;
          font-family: "Arial MT", sans-serif;
          font-size: 13px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: left;
          text-decoration: underline;
        }
        &--img {
          padding-right: 10px;
        }
      }
    }
    &_descr {
      color: #a4a4a4;
      font-family: "Arial MT";
      font-size: 15px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 20px;
      text-align: left;
    }
  }
  &__option {
    display: flex;
    &_config {
      display: flex;
      flex-direction:column;
      width: 100%;
      &-program, &-game, &-limit {
        display: flex;
        height: 35px;
        width: 100%;
        margin-top: 52px;
        &--info {
          display: flex;
          width: 100%;
        }
        &--img {
          padding-right: 10px;
        }
        &--title {
          color: #01b56b;
          font-family: "Arial MT", sans-serif;
          font-size: 13px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: left;
          text-transform: uppercase;
        }
        &--charac {
          color: #a3a3a3;
          font-family: "Arial MT", sans-serif;
          font-size: 13px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: left;
          text-transform: uppercase;
        }
      }
    }
    &_youtube {
      padding-top: 35px;
      display: flex;
      align-items: center;
    }
  }
  &__offer {
    padding-top: 90px;
    display: flex;
    flex-direction: column;
    &_title {
      &-text {
        color: #01b56b;
        font-family: "Arial MT", sans-serif;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: 25px;
        text-align: left;
      }
    }
  }
}
.product-content, .video-content, .offer-coast{
    display: flex;
    align-items: center;
    border-bottom: solid 1px #a3a3a3;
    border-top: solid 1px #a3a3a3;
    justify-content: space-between;
  &__wrap {
    width: 60%;
    display: flex;
    align-items: flex-start;
    padding: 20px 0;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    display: flex;
    align-items: center;
    & p {
      color: #ffffff;
      font-family: "Open Sans", sans-serif;
      font-size: 18px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
    }
  }
  &__name {
    padding: 20px;
    color: #a3a3a3;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 25px;
    text-align: left;
  }
  &__price {
    display: flex;
    color: #a3a3a3;
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 25px;
    text-align: left;
    &_coast {
      padding-right: 10px;
    }
    &_total {
      display: flex;
      color: #01b56b;
      font-family: "Open Sans";
      font-size: 25px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      &-coast {
        padding-right: 10px;
      }
    }
  }
  &__link {
    align-items: flex-end;
    text-decoration: underline;
    color: #919191;
    font-family: "Arial MT";
    font-size: 13px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    cursor: pointer;
  }
}
.addToCart {
  width: 180px;
  height: 41px;
  background-color: #007545;
  border: 1px solid #007545;
  border-radius: 20px;
  color: #ffffff;
  font-family: "Arial MT", sans-serif;
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
.all-package {
  height: 107px;
  display: flex;
  justify-content: center;
  &__wrap {
    display: flex;
    width: 80%;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  &__title {
    display:flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
    background: url('~/assets/icons/all-pack-back.png') no-repeat;
    &_icon {
      width: 81px;
      height: 65px;
    }
    &_text {
      color: #feffff;
      font-family: "Gotham Pro", sans-serif;
      font-size: 37px;
      font-weight: 700;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
      text-transform: uppercase;
    }
  }
  &__btn {
    width: 20%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #007545;
    border-radius: 20px;
    background-color: #161616;
    color: #ffffff;
    font-family: "Arial - Bold MT", sans-serif;
    font-size: 15px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 25px;
    text-align: left;
    text-transform: uppercase;
    cursor: pointer;
  }
}

@media (max-width: 1390px){
  .main-product {
    &__image {
      padding: 30px;
      &_main {
        &-big {
          max-width: 600px;
        }
      }
    }
    &__wrap {
      max-width: 450px;
      padding: 15px;
    }
    &__about {
      &_title, &_author {
        padding-top: 15px;
      }
    }
    &__option {
      flex-wrap: wrap;
      &_config {
        &-program, &-game, &-limit {
          margin-top: 25px;
        }
      }
    }
    &__offer {
      padding-top: 30px;
    }
  }
  .addToCart {
    width: 150px;
  }
}
@media (min-width: 1130px) and (max-width: 1390px){
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      padding: 20px;
    }
  }
}
@media (min-width: 850px) and (max-width: 1050px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 60px;
    right: calc(20px - ((1420px - 100vw) / 4));
  }
}
@media (min-width: 1000px) and (max-width: 1130px){
  .main-product {
    &__image {
      max-width: 600px;
      padding: 15px;
      &_main {
        &-big {
          min-width: 450px;
        }
      }
      &_add {
        display: none;
      }
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      padding: 20px;
    }
    &__title {
      &_text {
        font-size: 30px;
      }
    }
  }
}
@media (min-width: 670px) and (max-width: 1000px){
  .main {
    width: 100%;
    &__product {
      padding: 15px;
      flex-wrap: wrap;
    }
  }
  .main-product {
    width: 100%;
    &__image {
      max-width: 100%;
      padding: 15px;
      &_main {
        max-width: 90%;
        &-big {
          min-width: 600px;
        }
      }
      &_add {
        display: flex;
      }
    }
    &__wrap {
      max-width: 100%;
      align-items: center;
    }
    &__about {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__option {
      justify-content: center;
      &_config {
        width: 50%;
        justify-content: center;
      }
    }
    &__offer {
      padding: 30px;
      width: 100%;
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    align-items: baseline;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      height: 150%;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__title {
      width: 100%;
      img {
        display: none;
      }
      &_text {
        font-size: 20px;
      }
    }
    &__btn {
      width: 30%;
    }
  }
  .other__offers {
    padding-top: 20px;
  }
}
@media (min-width: 520px) and (max-width: 850px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 50px;
    right: calc(20px - ((800px - 100vw) / 4));
  }
}
@media (min-width: 480px) and (max-width: 670px){
  .main {
    width: 100%;
    &__product {
      padding: 15px;
      flex-wrap: wrap;
    }
  }
  .main-product {
    width: 100%;
    &__image {
      max-width: 100%;
      padding: 15px;
      &_main {
        max-width: 90%;
        &-big {
          min-width: 430px;
        }
      }
      &_add {
        display: none;
      }
    }
    &__wrap {
      max-width: 100%;
      align-items: center;
    }
    &__about {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__option {
      justify-content: center;
      &_config {
        width: 50%;
        justify-content: center;
      }
    }
    &__offer {
      padding: 30px;
      width: 100%;
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    justify-content: center;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      height: 150%;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__title {
      width: 100%;
      img {
        display: none;
      }
      &_text {
        font-size: 20px;
      }
    }
    &__btn {
      width: 40%;
    }
  }
  .other__offers {
    padding-top: 20px;
  }
}
@media (min-width: 375px) and (max-width: 520px){
    .el-dialog__body {
      transform: translate(-50%, -15%);
    }
  .el-dialog__headerbtn {
    position: absolute;
    top: -50px;
    right: calc(20px - ((740px - 100vw) / 4));
  }
}
@media (min-width: 375px) and (max-width: 480px){
  .main {
    width: 100%;
    &__product {
      padding: 15px;
      flex-wrap: wrap;
    }
  }
  .main-product {
    width: 100%;
    &__image {
      max-width: 100%;
      padding: 15px;
      &_main {
        max-width: 90%;
        &-big {
          min-width: 350px;
        }
      }
      &_add {
        display: none;
      }
    }
    &__wrap {
      max-width: 100%;
      align-items: center;
    }
    &__about {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__option {
      justify-content: center;
      &_config {
        width: 50%;
        justify-content: center;
      }
    }
    &__offer {
      padding: 30px;
      width: 100%;
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    justify-content: center;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      height: 150%;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__title {
      width: 100%;
      img {
        display: none;
      }
      &_text {
        font-size: 20px;
      }
    }
    &__btn {
      width: 50%;
    }
  }
  .other__offers {
    padding-top: 20px;
  }
}
@media (max-width: 375px) {
  .el-dialog__body {
    transform: translate(-50%, -15%);
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: -65px;
    right: calc(20px - ((470px - 100vw) / 4));
  }
}
@media (min-width: 320px) and (max-width: 480px){
  .main {
    width: 100%;
    &__product {
      padding: 15px;
      flex-wrap: wrap;
    }
  }
  .main-product {
    width: 100%;
    &__image {
      max-width: 100%;
      padding: 15px;
      &_main {
        max-width: 90%;
        &-big {
          min-width: 300px;
        }
      }
      &_add {
        display: none;
      }
    }
    &__wrap {
      max-width: 100%;
      align-items: center;
    }
    &__about {
      display: flex;
      flex-direction: column;
      align-items: center;
    &_title {
      &-text {
        font-size: 30px;
      }
    }
    }
    &__option {
      justify-content: center;
      &_config {
        width: 50%;
        justify-content: center;
      }
    }
    &__offer {
      padding: 30px;
      width: 100%;
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    justify-content: center;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      height: 150%;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__title {
      width: 100%;
      img {
        display: none;
      }
      &_text {
        font-size: 20px;
      }
    }
    &__btn {
      width: 60%;
    }
  }
  .other__offers {
    padding-top: 20px;
  }
}
@media (max-width: 320px) {
  .main {
    width: 100%;
    &__product {
      padding: 15px;
      flex-wrap: wrap;
    }
  }
  .main-product {
    width: 100%;
    &__image {
      max-width: 100%;
      padding: 15px;
      &_main {
        max-width: 90%;
        &-big {
          min-width: 100%;
        }
      }
      &_add {
        display: none;
      }
    }
    &__wrap {
      max-width: 100%;
      align-items: center;
    }
    &__about {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__option {
      justify-content: center;
      &_config {
        width: 50%;
        justify-content: center;
      }
    }
    &__offer {
      padding: 30px;
      width: 100%;
    }
  }
  .product-content, .video-content, .offer-coast{
    flex-wrap: wrap;
    justify-content: center;
    &__wrap {
      width: 80%;
      display: flex;
      align-items: flex-start;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
    &__link {
      padding-bottom: 20px;
    }
  }
  .addToCart {
    margin-bottom: 20px;
  }
  .all-package {
    &__wrap {
      width: 100%;
      height: 150%;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__title {
      width: 100%;
      img {
        display: none;
      }
      &_text {
        font-size: 20px;
      }
    }
    &__btn {
      width: 60%;
    }
  }
  .other__offers {
    padding-top: 20px;
  }
}
</style>
