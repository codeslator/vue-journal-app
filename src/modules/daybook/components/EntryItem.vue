<template>
  <div
    class="card mb-2 border-success entry-card pointer"
    @click="$router.push({ name: 'entry', params: { id: 1 } })"
  >
    <div class="card-body">
      <h5 class="card-title text-success">Hola</h5>
      <p class="card-subtitle mb-2 text-muted">{{ new Date() }}</p>
      <div class="card-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
        dolor sed doloribus sequi expedita! Vel veritatis deleniti quaerat eum
        doloribus.
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-card {
  &:hover {
    background-color: lighten($color: grey, $amount: 40);
    transition: 0.2s all ease-in;
  }
}
</style>