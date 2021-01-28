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
  },
  data () {
    return {
      issues: []
    }
  },
  watch: {
    '$route.params.status': function (stat) {
      this.GetIssues()
    }
  },
  mounted () {
    this.GetIssues()
  },
  methods: {
    GetIssues () {
      if (this.$route.params.status !== 'trashed') {
        this.issues = this.$store.state.issues.filter(el => el.status === this.$route.params.status)
      } else {
        this.issues = this.$store.state.issues.filter(el => el.isTrashed === true)
      }
    }
  }
}
</script>
<style scoped>
</style>
