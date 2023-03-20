<template>
  <form class="card my-5" style="width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">Продать автомобиль</h5>

      <div class="mb-3">
        <select
          class="form-select"
          aria-label="Выбор автомобиля"
          v-model="car"
          @change="person = ''"
        >
          <option disabled selected>Выбрать автомобиль</option>
          <option
            v-for="car in listCar"
            :key="car.car_id"
            :value="car"
          >
            {{car.brand}} {{car.model}} ({{car.release_year}})
          </option>
        </select>
      </div>

      <div class="mb-3">
        <select
          class="form-select"
          aria-label="Выбор покупателя"
          v-model="person"
        >
          <option disabled selected>Выбрать покупателя</option>
          <option
            v-for="person in listPerson"
            :key="person.person_id"
            :value="person"
            :disabled="car.fk_person_id === person.id"
          >
            {{person.first_name}} {{person.last_name}}
          </option>
        </select>
      </div>

      <div >
        <button type="button" class="btn btn-primary" @click="sellCar">Продать</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormSellCar",
  props: {
    listCar: Array,
    default: [],
  },
  data() {
    return {
      car: {},
      person: {},
      listCars: [],
      listPerson: [],
    }
  },
  methods: {
    async getListPerson() {
      this.listPerson = await fetch('http://localhost:8080/api/person')
        .then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        })
    },
    async sellCar() {
      try {
        const res = await fetch('http://localhost:8080/api/sell', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            buyer: this.person.id,
            seller: this.car.fk_person_id || null,
            car_id: this.car.car_id,
          })
        })
        const data = await res.json()
        if (res.status !== 200 || res.status !== 201) {
          this.$emit('updateListCar')
          this.car = {}
          this.person = {}
        } else {
          console.log(data)
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.getListPerson()
  },
}
</script>

<style scoped>

</style>
