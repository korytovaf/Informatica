<template>
    <div class="d-flex justify-content-end align-items-center my-4 ml-auto" v-if="weather">
        <div class="max-width-200 mr-4">
            <select class="form-select" aria-label="Выбор города для просмотра погоды" v-model="city">
                <option value="Ivanovo">Иваново</option>
                <option value="Kostroma">Кострома</option>
                <option value="Yaroslavl">Ярославль</option>
            </select>
        </div>
        <div>{{weather.weather[0].description}}</div>
        <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`" alt="">
        <div>{{  ~~weather.main.temp }}</div>

    </div>
</template>

<script>
export default {
    name: "WeatherComponent",
    data() {
      return {
          weather: null,
          city: "Ivanovo"
      }
    },
    methods: {
          async fetchWeather() {
              const res = await fetch('http://api.openweathermap.org/data/2.5/weather?' + new URLSearchParams({
                  q: this.city,
                  appid: '0ad3df4030a233c298c8cf93b05395a7',
                  lang: 'ru',
                  units: 'metric'
              }))
              this.weather = await res.json()
          }
    },
    mounted() {
        this.fetchWeather()
    },
    watch: {
        city() {
            this.fetchWeather()
        }
    }
}
</script>

<style scoped>

</style>
