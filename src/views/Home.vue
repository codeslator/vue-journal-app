<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="goToDaybook" class="btn btn-primary">Go To Daybook</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>
