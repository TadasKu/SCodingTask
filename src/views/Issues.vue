<template>
  <div class="issues">
      <ToDoForm v-if="$route.params.status==='open'"></ToDoForm>
      <b-container>
      </b-container>
  </div>
</template>
<script>
import ToDoForm from '../components/ToDoForm.vue'
export default {
  name: 'Issues',
  components: {
    ToDoForm
  }
}
</script>
<style scoped>
</style>
