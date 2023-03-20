<template>
  <h2>Список пользователей</h2>

  <form class="card my-5" style="width: 30rem;">
    <div class="card-body">
      <h5 class="card-title">Добавить пользователя</h5>
      <div class="mb-3">
        <input type="text" class="form-control" id="last_name" placeholder="Фамилия" v-model="last_name">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" id="first_name" placeholder="Имя" v-model="first_name">
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" id="passport" placeholder="Паспорт" v-model="passport">
      </div>
      <div >
        <button type="button" class="btn btn-primary" @click="createPerson">Сохранить</button>
      </div>
    </div>
  </form>

  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Паспорт</th>
        <th scope="col">Авто</th>
      </tr>
    </thead>
    <tbody v-if="listPerson">
      <tr
        v-for="(person, index) in listPerson"
        :key="person.id"
      >
        <th scope="row">{{index + 1}}</th>
        <td>{{person.last_name}}</td>
        <td>{{person.first_name}}</td>
        <td>{{person.passport}}</td>
        <td v-if="person.cars?.length > 0">
          <div v-for="(car, index) in person.cars || []" :key="index">
            {{car.brand}} {{car.model}} ({{car.release_year}} г.в.)
          </div>
        </td>
        <td v-else>-</td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: "ListPerson",
  data() {
    return {
      listPerson: [],
      first_name: '',
      last_name: '',
      passport: '',
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

    async createPerson() {
      try {
        const res = await fetch('http://localhost:8080/api/person', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            passport: this.passport
          })
        })
        const data = await res.json()
        if (res.status !== 200 || res.status !== 201) {
          this.listPerson.push(data)
        } else {
          console.log(data)
        }
      } catch (e) {
        console.log(e)
      }
    },

    clearForm() {
      this.first_name = ''
      this.last_name = ''
      this.passport = ''
    },
  },
  mounted() {
    this.getListPerson()
  },
}
</script>

<style scoped>

</style>
