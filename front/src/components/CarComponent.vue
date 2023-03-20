<template>
  <div class="d-flex flex-column mt-4" v-if="car">
    <div>Авто - {{ car.brand }} {{ car.model }} {{car.release_year }}</div>
    <div>Владелец - {{ car.buyer || 'нет данных' }}</div>
    <div>Продавец - {{ car.seller || 'нет данных' }}</div>
    <div>Дата приобретения - {{ car.date_buy ? new Date(car.date_buy).toLocaleDateString('ru-RU') : 'нет данных' }}</div>
  </div>
</template>

<script>
export default {
  name: "CarComponent",
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      car: null
    }
  },
  methods: {
    async getCarById() {
      if (!this.id) return
      this.car = await fetch('http://localhost:8080/api/car/' + this.id)
        .then(async (res) => {
          if (!res.ok) throw await res.json();
          return res.json();
        })
    },
  },
  mounted() {
    this.getCarById()
  }
}
</script>

<style scoped>

</style>
