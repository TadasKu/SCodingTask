<template>
  <div class="home">
    <b-container class="home-container">
    <b-card
      style="max-width: 40rem;"
      class="mb-2 mx-auto h-100 card"
      bg-variant="dark"
      text-variant="white"
      border-variant="secondary"
    >
    <b-card-title>Click button to open an "Open Issues" page!</b-card-title>
      <b-button to="/issues/opened" class="open-button">Open</b-button>
    </b-card>
    </b-container>
  </div>
</template>
<script>

export default {
  name: 'Home',
  components: {}
}
</script>
<style scoped>
.card{
  border-radius: 2em;
}
.home {
  margin-top: 10rem;
}
.home-container{
  height: 15rem;
}
.card-title{
  margin-top: 3rem;
}
.open-button {
  background-color: #df4a16;
}
.open-button:hover {
  background-color: #b34219;
}
@media only screen and (max-width: 325px) {
.card-title{
  margin-top:0;
}
}
@media only screen and (max-width: 198px) {
.home-container{
  height: 20rem;
}
}
</style>
