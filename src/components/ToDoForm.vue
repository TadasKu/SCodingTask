<template>
  <div id="todo">
    <b-container class="form-container">
      <b-form>
        <b-card
          style="max-width: 40rem"
          class="mb-2 mx-auto h-100 card"
          bg-variant="dark"
          text-variant="white"
          border-variant="secondary"
        >
          <b-form-textarea
            id="textarea"
            v-model="newTask"
            placeholder="Add an issue"
            class="mx-auto"
            no-resize
            rows="1"
            max-rows="3"
            autofocus
            @keydown.enter.exact.prevent
            @keyup.enter.exact="AddIssue()"
          >
          </b-form-textarea>
          <b-button @click="AddIssue" class="send-button shadow-none"
            >Add</b-button
          >
        </b-card>
      </b-form>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    AddIssue() {
      if (this.newTask !== "") {
        let current_datetime = new Date();
        let formatted_date =
          current_datetime.getFullYear() +
          "-" +
          (current_datetime.getMonth() + 1) +
          "-" +
          current_datetime.getDate() +
          " " +
          current_datetime.getHours() +
          ":" +
          current_datetime.getMinutes() +
          ":" +
          current_datetime.getSeconds();
        var lastId = this.$store.state.issues.length;
        var newIssue = {
          id: lastId + 1,
          date: formatted_date,
          status: "open",
          isTrashed: false,
          description: this.newTask,
        };
        this.$store.dispatch("AddIssueAction", newIssue);
        this.newTask = "";
        this.$emit("getNewList");
      }
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 2em;
}
#textarea {
  background-color: #aaaaaa;
  border-color: black;
}
#textarea:focus {
  box-shadow: 0 0 0 0.2rem #df4c1693;
}
#todo {
  margin-top: 4rem;
}
.send-button {
  background-color: #df4a16;
  margin-top: 1rem;
  width: 20%;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #aaaaaa;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #5a5a5a;
}
@media only screen and (max-width: 400px) {
  .send-button {
    width: 5rem;
  }
}
@media only screen and (max-width: 450px) {
  #todo {
    margin-top: 1rem;
  }
}
@media only screen and (max-height: 450px) {
  @media only screen and (max-width: 846px) {
    #todo {
      margin-top: 0.5rem;
    }
  }
}
</style>
