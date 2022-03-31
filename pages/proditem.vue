<template>
  <div class="container">
    <div class="main">
      <div class="main__product">
        <div class="main-product__image">
          <div class="main-product__image_main">
            <img :src="product.image" class="main-product__image_main-big">
          </div>
          <div class="main-product__image_add">
            <div v-for="image in 3" :key="image" class="main-product__image_add-group">
              <img :src="product.image" class="main-product__image_add-small">
            </div>
          </div>
        </div>
        <div class="main-product__wrap">
          <div class="main-product__nav">
            <div class="main-product__nav_block">
              <nuxt-link to="/store" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  Главная
                </div>
              </nuxt-link>
              <nuxt-link to="/store" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  Маркет Чартов
                </div>
              </nuxt-link>
              <nuxt-link to="/store" class="main-product__nav_block-link">
                <div
                  class="product-nav_link"
                >
                  {{ product.name }}
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="main-product__about">
            <div class="main-product__about_title">
              <div class="main-product__about_title-text">
                {{ product.name }}
              </div>
            </div>
            <div class="main-product__about_author">
              <div class="main-product__about_author-text">
                {{ product.author }}
              </div>
            </div>
            <div class="main-product__about_results">
              <div class="main-product__about_results-result">
                <a class="main-product__about_results-result--link"><img class="main-product__about_results-result--img" src="~/assets/icons/result-icon.png" alt="">РЕЗУЛЬТЫ</a>
              </div>
              <div class="main__product_about-results-online">
                <a class="main-product__about_results-result--link"><img class="main-product__about_results-result--img" src="~/assets/icons/online-icon.png" alt="">ОНЛАЙН</a>
              </div>
            </div>
            <div class="main-product__about_descr">
              <p>{{ product.description }}</p>
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
            <div class="main-product__option_youtube">
              <div
                class="main-product__option_youtube-screen"
              >
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/MkqO3JMbhHM"
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </div>
          </div>
          <div class="main-product__offer">
            <div class="main-product__offer_title">
              <p class="main-product__offer_title-text">
                Пакетное предложение
              </p>
            </div>
            <div class="main-product__offer_wrapp">
              <div class="main-product__offer_content">
                <div class="product-content">
                  <div class="product-content__wrap">
                    <div class="product-content__main">
                      <el-checkbox />
                      <div class="product-content__name">
                        Стратегия игры
                      </div>
                    </div>
                    <div class="product-content__price">
                      <div class="product-content__price_coast">
                        4920
                      </div>
                      <div class="product-content__price_currency">
                        руб
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video-content">
                  <div class="video-content__wrap">
                    <div class="video-content__main">
                      <el-checkbox />
                      <div class="video-content__name">
                        Видеокурс
                      </div>
                    </div>
                    <div class="video-content__price">
                      <div class="video-content__price_coast">
                        1000
                      </div>
                      <div class="video-content__price_currency">
                        руб
                      </div>
                    </div>
                  </div>
                  <div class="video-content__link">
                    <a>или бесплатно по подписке</a>
                  </div>
                </div>
              </div>
              <div class="main-product__offer_coast">
                <div class="offer-coast">
                  <div class="offer-coast__wrap">
                    <div class="offer-coast__main">
                      <p>Стоимость пакета</p>
                    </div>
                    <div class="offer-coast__price_total">
                      <div class="offer-coast__price_total-coast">
                        5920
                      </div>
                      <div class="offer-coast__price_total-currency">
                        руб
                      </div>
                    </div>
                  </div>
                  <button type="button" class="addToCart">
                    В корзину
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
            <img class="all-package__title_icon" src="../assets/icons/all-pack-icon.png">
            <div class="all-package__title_text">
              ВСЕ ВИДЕОКУРСЫ В ОДНОЙ ПОДПИСКЕ
            </div>
          </div>
          <button type="button" class="all-package__btn">
            Оформить сейчас
          </button>
        </div>
      </div>
      <div class="other__offers">
        <h2 style="text-align: center">
          Другие предложения
        </h2>
        <Product :products="products" />
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
      product: {
        image: require('~/assets/icons/product_4.png'),
        galry: [],
        name: 'Крушим Spin&Go',
        author: 'Roman RVM1978',
        description: 'Курс от известного регуляра и тренера Spin-n-Go Романа Легкий постфлоп" - видео курс для игроков в турнирный покер.Содержит структурированный материал от самых основ постфлопRVM1978 Мосолова. Курс расcчитан на пользователей начального уровня и тех кто хочет дальше двигаться по лимитам',
        price: '109240',
        currency: 'руб',
        youtube: 'https://www.youtube.com/embed/MkqO3JMbhHM'
      },
      products: [
        {
          image: require('~/assets/icons/product_1.png'),
          name: 'MTT 1$-5$',
          author: 'Roman',
          description: 'Именной пак от Глеба "Ti0" Тремзина для игроков ABI 3$. Внутри оптимальные диапазоны открытиях, 3-вet, cold call, защиты бб. Таблица пуш фолда для стеков 10бб.',
          price: '5920',
          currency: 'руб',
          youtube: 'https://www.youtube.com/embed/MkqO3JMbhHM'
        },
        {
          image: require('~/assets/icons/product_2.png'),
          name: 'CASH 6max ML100',
          author: 'Dyrdom1',
          description: 'Пак от Dyrdom1 Регуляра cash nl2000, зарабатывающего только покером и своими тренировками. В 2020 году в рейтингах PokerStars становился самым успешным игроком. ',
          price: '6540',
          currency: 'руб',
          youtube: 'https://www.youtube.com/embed/MkqO3JMbhHM'
        },
        {
          image: require('~/assets/icons/product_3.png'),
          name: 'MTT Easy Postflop',
          author: 'Exan13 Videocuorse',
          description: '"Легкий постфлоп" - видео курс для игроков в турнирный покер.Содержит структурированный материал от самых основ постфлоп игры до революционных идей',
          price: '7920',
          currency: 'руб',
          youtube: 'https://www.youtube.com/embed/MkqO3JMbhHM'
        },
        {
          image: require('~/assets/icons/product_4.png'),
          name: 'Крушим Spin&Go',
          author: 'Roman RVM1978',
          description: 'Курс от известного регуляра и тренера Spin-n-Go Романа Легкий постфлоп" - видео курс для игроков в турнирный покер.Содержит структурированный материал от самых основ постфлопRVM1978 Мосолова. Курс расcчитан на пользователей начального уровня и тех кто хочет дальше двигаться по лимитам',
          price: '109240',
          currency: 'руб'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
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
    padding-top: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &_main {
      width: 500px;
      height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      &-big {
        width: 400px;
      }
    }
    &_add {
      display: flex;
      &-small {
        margin: 30px;
      }
    }
  }
  &__about {
    display: flex;
    flex-direction: column;
    min-width: 300px;;
    max-width: 600px;
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
  }
}
.addToCart {
  width: 180px;
  height: 41px;
  background-color: #007545;
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
    width: 85%;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  &__title {
    display:flex;
    width: 90%;
    justify-content: space-around;
    align-items: center;
    background: url('../assets/icons/all-pack-back.png') no-repeat;
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
    width: 15%;
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

</style>
