<template>
  <h2>Автомобили</h2>

  <div class="d-flex forms">
    <form class="card my-5" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">Добавить авто</h5>
        <div class="mb-3">
          <input type="text" class="form-control" id="last_name" placeholder="Марка" v-model="brand">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="first_name" placeholder="Модель" v-model="model">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="passport" placeholder="Год выпуска" v-model="release_year">
        </div>
        <div >
          <button type="button" class="btn btn-primary" @click="createCar">Создать</button>
        </div>
      </div>
    </form>

    <form-sell-car :list-car="listCar" @updateListCar="getListCar" />
  </div>


  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Марка</th>
      <th scope="col">Модель</th>
      <th scope="col">Год выпуска</th>
      <th scope="col">Владелец</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="({ car_id, brand, model, first_name, last_name, release_year }, index) in listCar"
      :key="index"
      class="row-car"
      @click="$emit('onChangeMode', car_id)"
    >
      <th scope="row">{{index + 1}}</th>
      <td>{{brand}}</td>
      <td>{{model}}</td>
      <td>{{release_year}}</td>
      <td >{{last_name}} {{first_name}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import FormSellCar from "@/components/FormSellCar";

export default {
  name: "ListCar",
  components: {
    FormSellCar,
  },
  data() {
    return {
      listCar: [],
      brand: '',
      model: '',
      release_year: ''
    }
  },
  methods: {
    async getListCar() {
      this.listCar = await fetch('http://localhost:8080/api/car')
        .then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        })
    },

    async createCar() {
      try {
        const res = await fetch('http://localhost:8080/api/car', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            brand: this.brand,
            model: this.model,
            release_year: this.release_year
          })
        })
        const data = await res.json()
        if (res.status !== 200 || res.status !== 201) {
          this.listCar.push(data)
        } else {
          console.log(data)
        }
      } catch (e) {
        console.log(e)
      }
    },

  },
  mounted() {
    this.getListCar()
  }
}
</script>

<style scoped>
.row-car {
  cursor: pointer;
}

.forms {
  justify-content: space-between;
  row-gap: 40px;
}
</style>
