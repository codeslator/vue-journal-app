<template>
  <div
    class="card mb-2 border-success entry-card pointer"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="card-body">
      <h5 class="card-title text-success">{{ month }} {{ day }}</h5>
      <p class="card-subtitle mb-2 text-muted">{{ yearDay }}</p>
      <div class="card-text">
        {{ truncatedText }}
      </div>
    </div>
  </div>
</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    truncatedText() {
      return this.entry.text.lenght > 150
        ? `${this.entry.text.substring(0, 150)}...`
        : this.entry.text;
    },
    day() {
      const date = new Date(this.entry.date);
      return date.getDay();
    },

    month() {
      const date = new Date(this.entry.date);
      return months[date.getMonth()];
    },
    yearDay() {
      const date = new Date(this.entry.date);
      return `${date.getFullYear()}, ${days[date.getDay()]}`
    }
  },
};
</script>

<style lang="scss" scoped>
.entry-card {
  &:hover {
    background-color: lighten($color: grey, $amount: 40);
    transition: 0.2s all ease-in;
  }
}
</style>