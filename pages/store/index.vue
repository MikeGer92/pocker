<template>
  <div class="container">
    <div class="option">
      <div class="option__subject">
        <div class="option__subject_image">
          <img :src="subject.image" alt="" height="50px">
        </div>
        <div class="option__subject_title">
          <p>{{ 'Discipline' | localize }}</p>
        </div>
      </div>
      <select
        v-model="filterParams.disciplines_in"
        class="option__subject_chooser"
        style="margin-bottom:10px"
      >
        <option v-for="disc in disciplines" :key="`discipline_${disc.id}`" class="option__subject_chooser--text">
          {{ disc.name }}
        </option>
      </select>
      <div class="option__game">
        <div class="option__game_image">
          <img :src="game.image" alt="" height="50px">
        </div>
        <div class="option__game_title">
          <p>{{ 'Play Limit' | localize }}</p>
        </div>
      </div>
      <div class="option__game_range">
        <input
          v-model="filterParams.limit_gte"
          class="option__game_range--from"
        >
        -
        <input
          v-model="filterParams.limit_lte"
          class="option__game_range--to"
        >
      </div>
      <div class="option__ambassador">
        <div class="option__ambassador_image">
          <img :src="ambassador.image" alt="" height="50px">
        </div>
        <div class="option__ambassador_title">
          <p>{{ 'Ambassador' | localize }}</p>
        </div>
      </div>
      <select
        v-model="filterParams.ambassador_in"
        class="option__ambassador_chooser"
      >
        <option v-for="ambass in ambassadors" :key="`ambassador_${ambass.id}`" class="option__ambassador_chooser--text">
          {{ ambass.name }}
        </option>
      </select>
      <div class="option__coast">
        <div class="option__coast_image">
          <img :src="coast.image" alt="" height="50px">
        </div>
        <div class="option__coast_title">
          <p>{{ 'Price' | localize }}</p>
        </div>
      </div>
      <div class="option__coast_range">
        <input
          v-model="filterParams.price_gte"
          class="option__coast_range--from"
        >
        -
        <input
          v-model="filterParams.price_lte"
          class="option__coast_range--to"
        >
      </div>
      <button type="button" class="option__btn" @click="getFilteredByParams">
        {{ 'Choose' | localize }}
      </button>
    </div>
    <transition name="slide-fade">
      <div v-if="optionPopup" class="option__popup option__popup_active">
        <div class="option__subject">
          <div class="option__subject_image">
            <img :src="subject.image" alt="" height="50px">
          </div>
          <div class="option__subject_title">
            <p>{{ 'Discipline' | localize }}</p>
          </div>
        </div>
        <select
          v-model="filterParams.disciplines_in"
          class="option__subject_chooser"
          style="margin-bottom:10px"
        >
          <option v-for="disc in disciplines" :key="`discipline_${disc.id}`" class="option__subject_chooser--text">
            {{ disc.name }}
          </option>
        </select>
        <div class="option__subject">
          <div class="option__subject_image">
            <img :src="subject.image" alt="" height="50px">
          </div>
          <div class="option__subject_title">
            <p>{{ subject.title }}</p>
          </div>
          <div class="option__popup_active-cancel" @click="optionPopup=false">
            <span class="option__popup_active-cancel--icon" />
            <span class="option__popup_active-cancel--icon" />
          </div>
        </div>
        <div class="option__game">
          <div class="option__game_image">
            <img :src="game.image" alt="" height="50px">
          </div>
          <div class="option__game_title">
            <p>{{ game.title }}</p>
          </div>
        </div>
        <div class="option__game_range">
          <input
            v-model="filterParams.limit_gte"
            class="option__game_range--from"
          > -
          <input
            v-model="filterParams.limit_lte"
            class="option__game_range--to"
          >
        </div>
        <div class="option__ambassador">
          <div class="option__ambassador_image">
            <img :src="ambassador.image" alt="" height="50px">
          </div>
          <div class="option__ambassador_title">
            <p>{{ ambassador.title }}</p>
          </div>
        </div>
        <select
          v-model="filterParams.ambassador_in"
          class="option__ambassador_chooser"
        >
          <option v-for="ambass in ambassador.list" :key="`ambass_${ambass.id}`" class="option__ambassador_chooser--text">
            {{ ambass.name }}
          </option>
        </select>
        <div class="option__coast">
          <div class="option__coast_image">
            <img :src="coast.image" alt="" height="50px">
          </div>
          <div class="option__coast_title">
            <p>{{ coast.title }}</p>
          </div>
        </div>
        <div class="option__coast_range">
          <input
            v-model="filterParams.price_gte"
            class="option__coast_range--from"
          > -
          <input
            v-model="filterParams.price_lte"
            class="option__coast_range--to"
          >
        </div>
        <button type="button" class="option__btn" @click="getFilteredByParams">
          {{ 'Choose' | localize }}
        </button>
      </div>
    </transition>
    <div class="mainblock">
      <el-dialog
        :visible.sync="paymentWindowRes"
      >
        <PaymentWindow
          v-if="paymentWindowRes"
          :offer="prodOffer"
          @closePaymentWindow="paymentWindowRes=false"
        />
      </el-dialog>
      <div class="mainblock__filter">
        <div class="mainblock__filter_sort">
          {{ 'Sort' | localize }}
        </div>
        <div
          :class="{
            'mainblock__filter_option': true}"
          @click="changeActiveSort('full_price')"
        >
          <div
            :class="{
              'mainblock__filter_option--icon': true,
              'mainblock__filter_option--icon-active': activeSort==='full_price',
              'mainblock__filter_option--icon-reactive': activeSort==='-full_price'}"
          />
          <div
            :class="{
              'mainblock__filter_option--text': true,
              'mainblock__filter_option--text-active': activeSort==='full_price',
              'mainblock__filter_option--text-reactive': activeSort==='-full_price'}"
          >
            {{ 'Price' | localize }}
          </div>
        </div>
        <div
          :class="{
            'mainblock__filter_option': true}"
          @click="changeActiveSort('discipline_id')"
        >
          <div
            :class="{
              'mainblock__filter_option--icon': true,
              'mainblock__filter_option--icon-active': activeSort==='discipline_id',
              'mainblock__filter_option--icon-reactive': activeSort==='-discipline_id'}"
          />
          <div
            :class="{
              'mainblock__filter_option--text': true,
              'mainblock__filter_option--text-active': activeSort==='discipline_id',
              'mainblock__filter_option--text-reactive': activeSort==='-discipline_id'}"
          >
            {{ 'Discipline' | localize }}
          </div>
        </div>
        <div
          :class="{
            'mainblock__filter_option': true}"
          @click="changeActiveSort('ambassador_id')"
        >
          <div
            :class="{
              'mainblock__filter_option--icon': true,
              'mainblock__filter_option--icon-active': activeSort==='ambassador_id',
              'mainblock__filter_option--icon-reactive': activeSort==='-ambassador_id'}"
          />
          <div
            :class="{
              'mainblock__filter_option--text': true,
              'mainblock__filter_option--text-active': activeSort==='ambassador_id',
              'mainblock__filter_option--text-reactive': activeSort==='-ambassador_id'}"
          >
            {{ 'Ambassador' | localize }}
          </div>
        </div>
      </div>
      <Product :products="products" @click-buy="showPaymentWindow" />
      <div class="filter-btn" @click="showOptionPopup">
        <img src="~/assets/icons/icons8-filter.png" class="filter_img">
      </div>
      <div class="mainblock__pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :page-size="limit"
          :total="total"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaymentWindow from '@/components/Payment/PaymentWindow.vue'
import Product from '@/components/Product.vue'
export default {
  components: { Product, PaymentWindow },
  layout: 'default',
  data () {
    return {
      products_id: [],
      video_courses_id: [],
      paymentInfo: null,
      payCloudParams: null,
      limit: 4,
      page: 1,
      total: 0,
      filterParams: {
        disciplines_in: null,
        limit_gte: null,
        limit_lte: null,
        ambassador_in: null,
        price_gte: null,
        price_lte: null
      },
      coast_products: null,
      activeSort: '',
      payParams: {},
      disciplines: [],
      ambassadors: [],
      optionPopup: false,
      paymentWindowRes: false,
      prodDiscount: true,
      prodAction: true,
      strategy: true,
      course: true,
      showSubject: false,
      discount: {
        status: false,
        image: require('~/assets/icons/priceDown.png'),
        sale: ''
      },
      action: {
        image: require('~/assets/icons/action.png'),
        date: ''
      },
      subject: {
        data: null,
        image: require('~/assets/icons/subject.png'),
        title: 'Дисциплина',
        list: [
          { name: 'Покер' },
          { name: 'Джокер' },
          { name: 'ДжоПокер' }
        ]
      },
      game: {
        image: require('~/assets/icons/limit.png'),
        title: 'Игровой лимит'
      },
      ambassador: {
        data: null,
        image: require('~/assets/icons/ambassador.png'),
        title: 'Амбассадор',
        list: [
          { name: 'Амбассадор_1' },
          { name: 'Амбассадор_2' },
          { name: 'Амбассадор_3' }
        ]
      },
      coast: {
        image: require('~/assets/icons/coast.png'),
        title: 'Стоимость'
      },
      products: [],
      prodOffer: null,
      offers: [],
      cart: {
        image: require('~/assets/icons/cart.png')
      },
      filters: {
        subject: ['покер', 'джокер', 'джопокер', 'попокер'],
        ambassador: ['Амбассадор_1', 'Амбассадор_2', 'Амбассадор_3']
      }
    }
  },
  mounted () {
    this.getProducts()
    this.getAmbassadors()
    this.getDisciplines()
  },
  methods: {
    changePage (page) {
      this.page = page
      if (this.activeSort) {
        this.getSortedProducts()
      } if (this.filterParams) {
        this.getFilteredByParams()
      } else {
        this.getProducts()
      }
    },
    showPaymentWindow (product) {
      this.prodOffer = product
      this.paymentWindowRes = !this.paymentWindowRes
    },
    showOptionPopup () {
      if (this.optionPopup === false) {
        this.optionPopup = true
      } else {
        this.optionPopup = false
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
    async getFilteredByParams () {
      this.checkParams()
      const params = Object.assign({}, this.filterParams, { page: this.page, limit: this.limit })
      try {
        const response = await this.$axios.get('/api/v1/shop', { params })
        this.products = response.data.items
        this.total = response.data.total
        this.filterParams.disciplines_in = ''
        this.filterParams.ambassador_in = ''
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getSortedProducts () {
      try {
        const response = await this.$axios.get('/api/v1/shop', { params: { order: this.activeSort, limit: this.limit, page: this.page } })
        this.products = response.data.items
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getDisciplines () {
      try {
        const response = await this.$axios.get('/api/v1/shop/get_disciplines')
        this.disciplines = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async getAmbassadors () {
      try {
        const response = await this.$axios.get('/api/v1/shop/get_ambassadors')
        this.ambassadors = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    changeActiveSort (sort) {
      if (this.activeSort === `-${sort}`) {
        this.activeSort = sort
      } else {
        this.activeSort = `-${sort}`
      }
      this.getSortedProducts()
    },
    checkParams () {
      for (const key in this.filterParams) {
        if (this.filterParams[key] === '') {
          this.filterParams[key] = null
        }
      }
      return this.filterParams
    },
    async getCoastProducts () {
      try {
        const response = await this.$axios.post('api/v1/shop/cost/shop')
        this.coast_products = response.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    }
  }
}
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.filter-btn {
  max-width: 80px;
  max-height: 80px;
  background-color: #007645;
  font-size: 18px;
  color: white;
  position: fixed;
  top: calc(100vh - 100px);
  right: 50px;
  display: none;
  border-radius: 50%;
}
.filter_img {
  padding: 10px;
  transform: translateY(7px);
}
.option__popup {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  margin: 0;
  transition: all 0.2s ease;
  background-color: #161616;
  z-index: 999;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &_active {
    &-cancel {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 30px;
      right: 40px;
      &--icon {
        &:nth-child(1) {
          display: block;
          width: 30px;
          height: 2px;
          background-color: #fff;
          margin: 15px 0 0 0;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          display: block;
          width: 30px;
          height: 2px;
          background-color: #fff;
          margin: -2px 0;
          transform: rotate(-45deg);
        }
      }
    }
  }
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
.container {
  margin: 0 auto;
  padding: 0 auto;
  display: flex;
  width: 100%;
  overflow-x: hidden;
}
.option {
  max-width: 300px;
  padding: 30px;
  &__subject, &__game, &__ambassador, &__coast {
    min-width: 241px;
    display: flex;
    padding: 20px 0 20px 0;
    &_title  {
      min-width: 132px;
      padding-left: 23px;
      color: #a3a3a3;
      font-family: "Arial MT", sans-serif;
      font-size: 18px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
    }
    &_chooser {
      font-size: 16px;
      color: #a3a3a3;
      justify-content: flex-start;
      padding-left: 10px;
      min-width: 241px;
      height: 41px;
      border: 1px solid #007645;
      border-radius: 3px;
      background-color: #161616;
      outline: none;
      &--text {
        font-size: 16px;
        color: #a3a3a3;
      }
    }
    &_range {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &--from, &--to {
        width: 110px;
        padding-left: 10px;
        margin: 0 5px 0 5px;
        height: 41px;
        font-size: 16px;
        color: #a3a3a3;
        border: 1px solid #007645;
        border-radius: 3px;
        background-color: #161616;
        outline: none;
      }
    }
  }
  &__btn {
    min-width: 241px;
    height: 41px;
    border: 1px solid #007645;
    background-color: #027043;
    border-radius: 3px;
    color: white;
    margin-top: 50px;
    cursor: pointer;
  }
}
.mainblock {
  display: flex;
  flex-direction: column;
  &__filter {
    flex-direction: row;
    justify-content: space-between;
    &_sort {
      color: #bfbfbf;
      font-size: 24px;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      align-self: center;
    }
    &_option {
    height: 25px;
    display: flex;
    justify-content: center;
    &--icon {
      width: 20px;
      height: 20px;
      background-image: url('~/assets/icons/filters.png');
      background-repeat: no-repeat;
      margin: 10px 10px;
      &-active {
        background-image: url('~/assets/icons/active_filters.png');
      }
      &-reactive {
        background-image: url('~/assets/icons/active_filters.png');
        transform: rotate(180deg);
        align-self: center;
      }
    }
    &--text {
      color: #a3a3a3;
      font-size: 17px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      border-bottom: 1px dashed #a3a3a3;
      padding-bottom: 5px;
      cursor: pointer;
      transition-property: border-bottom;
      transition-duration: .2s;
      &-active, &-reactive {
        color: #01b56b;
        border-bottom: 1px dashed #01b56b;
      }
        &:hover {
          border-bottom: 1px dashed #161616;
        }
      }
    }
  }
  &__pagination {
    display: flex;
    justify-content: center;
  }
}
@media (min-width: 1641px){
  .option {
    max-width: 300px;
    padding: 20px;
  }
  .filter__sort {
    padding-left: 0;
  }
  .mainblock {
    padding: 30px;
    width: calc(100vw - 300px);
  }
  .mainblock__prodlist {
    flex-wrap: wrap;
    min-width: calc(100vw - 360px);
  }
}
@media (min-width: 1390px) and (max-width: 1640px){
  .option {
    max-width: 300px;
    padding: 20px;
  }
  .filter__sort {
    padding-left: 0;
  }
  .mainblock {
    padding: 5px;
    width: 100%;
  }
  .mainblock__prodlist {
    flex-wrap: wrap;
    min-width: calc(100vw - 360px);
  }
}
@media (min-width: 850px) and (max-width: 1050px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 60px;
    right: calc(20px - ((1420px - 100vw) / 4));
  }
}
@media (min-width: 990px) and (max-width: 1390px){
  .option {
    max-width: 260px;
    padding: 10px;
  }
  .mainblock {
    padding: 5px;
    width: 100%;
    &__filter {
      max-width: 650px;
    }
  }
  .mainblock__prodlist {
    flex-wrap: wrap;
    min-width: calc(100vw - 350px);
  }
}
@media (min-width: 670px) and (max-width: 990px){
  .option {
    display: none;
  }
  .filter__sort {
    padding-left: 0;
  }
  .mainblock {
    padding: 15px;
    width: 100%;
    &__filter {
      max-width: calc(100vw - 60px);
    }
  }
  .mainblock__prodlist {
    flex-wrap: wrap;
    min-width: calc(100vw - 60px);
    justify-content: center;
  }
    .filter-btn {
    max-width: 60px;
    height: 60px;
    background-color: #007645;
    font-size: 18px;
    color: white;
    position: fixed;
    top: 400px;
    right: 50px;
    display: flex;
    border-radius: 50%;
  }
  .filter_img {
    padding: 10px;
    transform: translateY(5px);
  }
}
@media (min-width: 520px) and (max-width: 850px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 50px;
    right: calc(20px - ((800px - 100vw) / 4));
  }
}
@media (min-width: 560px) and (max-width: 670px) {
  .option {
    display: none;
  }
  .mainblock {
    padding: 20px;
    &__filter {
      flex-wrap: wrap;
      padding: 5px;
      &_sort {
        width: 100%;
        text-align: center;
        font-size: 18px;
      }
      &_option {
        margin: 10px 0;
        align-self: center;
        &--icon {
          width: 10px;
          height: 10px;
          background-image: url('~/assets/icons/filters.png');
          transform: rotate(135deg);
          background-repeat: no-repeat;
          margin: 5px 5px;
          &-active {
            display: flex;
            align-self: center
            ;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(225deg);
          }
          &-reactive {
            display: flex;
            align-self: baseline;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(45deg);
            align-self: center;
          }
        }
        &--text {
          color: #a3a3a3;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 25px;
          text-align: left;
          border-bottom: 1px dashed #a3a3a3;
          padding-bottom: 5px;
          cursor: pointer;
          transition-property: border-bottom;
          transition-duration: .2s;
          &-active, &-reactive {
            color: #01b56b;
            border-bottom: 1px dashed #01b56b;
          }
            &:hover {
              border-bottom: 1px dashed #161616;
            }
        }
      }
    }
  }
  .mainblock__prodlist {
    min-width: 100%;
    flex-wrap: wrap;
  }
  .filter-btn {
    max-width: 60px;
    height: 60px;
    background-color: #007645;
    font-size: 18px;
    color: white;
    position: fixed;
    top:400px;
    right: 50px;
    display: flex;
    border-radius: 50%;
  }
  .filter_img {
    padding: 10px;
    transform: translateY(5px);
  }
}
@media (min-width: 440px) and (max-width: 560px) {
  .option {
    display: none;
    &__popup {
      max-width: 100%;
    }
  }
  .mainblock {
    padding: 15px;
    &__filter {
      padding: 5px;
      flex-wrap: wrap;
      &_sort {
        width: 100%;
        text-align: center;
      }
      &_option {
        margin: 10px 0;
        &--icon {
          width: 10px;
          height: 10px;
          background-image: url('~/assets/icons/filters.png');
          transform: rotate(135deg);
          background-repeat: no-repeat;
          margin: 5px 5px;
          &-active {
            display: flex;
            align-self: center
            ;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(225deg);
          }
          &-reactive {
            display: flex;
            align-self: baseline;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(45deg);
            align-self: center;
          }
        }
        &--text {
          color: #a3a3a3;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 25px;
          text-align: left;
          border-bottom: 1px dashed #a3a3a3;
          padding-bottom: 5px;
          cursor: pointer;
          transition-property: border-bottom;
          transition-duration: .2s;
          &-active, &-reactive {
            color: #01b56b;
            border-bottom: 1px dashed #01b56b;
          }
            &:hover {
              border-bottom: 1px dashed #161616;
            }
        }
      }
    }
  }
  .filter-btn {
    max-width: 60px;
    height: 60px;
    background-color: #007645;
    font-size: 18px;
    color: white;
    position: fixed;
    top: 350px;
    right: 30px;
    display: flex;
    border-radius: 50%;
  }
  .filter_img {
    padding: 10px;
    transform: translateY(5px);
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
@media (min-width: 375px) and (max-width: 440px) {
  .option {
    display: none;
    &__popup {
      max-width: 100%;
    }
  }
  .mainblock {
    padding: 5px;
    width: 100%;
    &__filter {
      padding: 5px;
      flex-wrap: nowrap;
      &_sort {
        text-align: center;
        font-size: 18px;
        align-self: center;
        display: none;
      }
      &_option {
        margin: 10px 0;
        &--icon {
          width: 10px;
          height: 10px;
          background-image: url('~/assets/icons/filters.png');
          transform: rotate(135deg);
          background-repeat: no-repeat;
          margin: 5px 5px;
          &-active {
            display: flex;
            align-self: center
            ;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(225deg);
          }
          &-reactive {
            display: flex;
            align-self: baseline;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(45deg);
            align-self: center;
          }
        }
        &--text {
          color: #a3a3a3;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 25px;
          text-align: left;
          border-bottom: 1px dashed #a3a3a3;
          padding-bottom: 5px;
          cursor: pointer;
          transition-property: border-bottom;
          transition-duration: .2s;
          &-active, &-reactive {
            color: #01b56b;
            border-bottom: 1px dashed #01b56b;
          }
            &:hover {
              border-bottom: 1px dashed #161616;
            }
        }
      }
    }
  }
  .filter-btn {
    max-width: 60px;
    height: 60px;
    background-color: #007645;
    font-size: 18px;
    color: white;
    position: fixed;
    top: 300px;
    right: 30px;
    display: flex;
    border-radius: 50%;
  }
  .filter_img {
    padding: 10px;
    transform: translateY(5px);
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
  .option {
    display: none;
    &__popup {
      max-width: 100%;
    }
  }
  .mainblock {
    padding: 10px;
    width: 100%;
    &__filter {
      width: 100%;
      padding: 5px;
      overflow-x: scroll;
      &_sort {
        font-size: 18px;
        width: 100%;
        text-align: center;
        font-size: 18px;
        display: none;
      }
      &_option {
        margin: 10px 0;
        &--icon {
          width: 10px;
          height: 10px;
          background-image: url('~/assets/icons/filters.png');
          transform: rotate(135deg);
          background-repeat: no-repeat;
          margin: 5px 5px;
          &-active {
            display: flex;
            align-self: center
            ;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(225deg);
          }
          &-reactive {
            display: flex;
            align-self: baseline;
            background-image: url('~/assets/icons/active_filters.png');
            transform: rotate(45deg);
            align-self: center;
          }
        }
        &--text {
          color: #a3a3a3;
          font-size: 17px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 25px;
          text-align: left;
          border-bottom: 1px dashed #a3a3a3;
          padding-bottom: 5px;
          cursor: pointer;
          transition-property: border-bottom;
          transition-duration: .2s;
          &-active, &-reactive {
            color: #01b56b;
            border-bottom: 1px dashed #01b56b;
          }
            &:hover {
              border-bottom: 1px dashed #161616;
            }
        }
      }
    }
    &__prodlist {
      min-width: 100%;
      flex-wrap: wrap;
    }
  }
  .filter-btn {
    max-width: 60px;
    height: 60px;
    background-color: #007645;
    font-size: 18px;
    color: white;
    position: fixed;
    top: 300px;
    right: 30px;
    display: flex;
    border-radius: 50%;
  }
  .filter_img {
    padding: 10px;
    transform: translateY(5px);
  }
}

</style>
