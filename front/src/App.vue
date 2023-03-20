<template>
  <div class="container">
    <div class="d-flex">

      <ul class="nav my-5">
        <li class="nav-item mr-4">
          <button
            type="button"
            class="btn btn-primary"
            @click="onChangeMode('person')"
          >
            Пользователи
          </button>
        </li>
        <li class="nav-item mr-4">
          <button
            type="button"
            class="btn btn-primary"
            @click="onChangeMode('cars')"
          >
            Авто
          </button>
        </li>

        <li class="nav-item mr-4" v-if="mode === 'car'">
          <button
            type="button"
            class="btn btn-primary"
            @click="onChangeMode('cars')"
          >
            Назад
          </button>
        </li>
      </ul>

      <weather-component />
    </div>

    <list-person v-if="mode === 'person'" />
    <list-car v-if="mode === 'cars'" @onChangeMode="onSelectedCar" />
    <car-component v-if="mode === 'car'" :id="idSelectedCar" />

  </div>

</template>

<script>

import ListPerson from "@/components/ListPerson";
import ListCar from "@/components/ListCar";
import WeatherComponent from "@/components/Weather";
import CarComponent from "@/components/CarComponent";

export default {
  name: 'App',
  components: {
    ListPerson,
    ListCar,
    WeatherComponent,
    CarComponent,
  },
  data() {
    return {
      mode: 'person',
      load: false,
      idSelectedCar: null,
    }
  },
  methods: {
    onChangeMode(mode) {
      this.mode = mode
    },
    onSelectedCar(id) {
      this.idSelectedCar = id
      this.mode = "car"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
