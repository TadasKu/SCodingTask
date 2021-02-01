<template>
  <div class="issues">
    <ToDoForm
      @getNewList="GetIssues"
      v-if="$route.params.status === 'open'"
    ></ToDoForm>
    <b-container class="issues-list">
      <div class="scrollable mx-auto">
        <b-card
          v-for="(issue, index) in issues"
          v-bind:key="index"
          style="max-width: 40rem"
          class="mb-2 mx-auto h-100 card"
          bg-variant="dark"
          text-variant="white"
          border-variant="secondary"
        >
          <b-row class="mx-auto">
            <b-col cols="12" md="8"
              ><b-form-textarea
                v-b-tooltip.hover.right
                :title="'Edited: ' + issue.date"
                v-model="issue.description"
                @change="ChangeIssue(issue)"
                class="issues-description"
                no-resize
                rows="1"
              >
              </b-form-textarea
            ></b-col>
            <b-col cols="5" md="4">
              <b-row>
                <b-row>
                  <b-button-toolbar class="buttons-group">
                    <b-button-group class="ml-5 w-75">
                      <b-form-select
                        v-if="issue.isTrashed === true"
                        v-model="issue.status"
                        :options="options"
                        class="select-bar"
                        @change="ChangeStatus(issue)"
                      ></b-form-select>
                      <b-button
                        v-if="
                          issue.status === 'open' && issue.isTrashed === false
                        "
                        @click="ChangeStatus(issue)"
                        title="Mark as done"
                        size="lg"
                        variant="success"
                      >
                        <b-icon icon="check-square"></b-icon>
                      </b-button>
                      <b-button
                        v-if="
                          issue.status === 'done' && issue.isTrashed === false
                        "
                        @click="ChangeStatus(issue)"
                        title="Mark as not done"
                        size="lg"
                        variant="success"
                      >
                        <b-icon icon="arrow-counterclockwise"></b-icon>
                      </b-button>
                      <b-button
                        v-if="issue.isTrashed === false"
                        @click="ChangeTrashStatus(issue)"
                        title="Mark as trash"
                        size="lg"
                        variant="danger"
                      >
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                      </b-button>
                      <b-button
                        v-if="issue.isTrashed === true"
                        @click="ChangeTrashStatus(issue)"
                        title="Restore"
                        size="lg"
                        variant="success"
                      >
                        <b-icon
                          icon="arrow-counterclockwise"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                    </b-button-group>
                  </b-button-toolbar>
                </b-row>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import ToDoForm from "../components/ToDoForm.vue";
export default {
  name: "Issues",
  components: {
    ToDoForm,
  },
  data() {
    return {
      issues: [],
      options: [
        { value: "open", text: "Not done" },
        { value: "done", text: "Done" },
      ],
    };
  },
  watch: {
    "$route.params.status": function (stat) {
      this.GetIssues();
    },
  },
  created() {},
  mounted() {
    this.GetIssues();
  },
  methods: {
    GetIssues() {
      if (this.$route.params.status !== "trashed") {
        this.issues = this.$store.state.issues.filter(
          (el) =>
            el.status === this.$route.params.status && el.isTrashed === false
        );
      } else {
        this.issues = this.$store.state.issues.filter(
          (el) => el.isTrashed === true
        );
      }
      this.issues.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    ChangeStatus(issue) {
      if (issue.isTrashed === false) {
        if (issue.status === "open") {
          issue.status = "done";
          this.$store.dispatch("ChangeIssueStatusAction", issue);
        } else {
          issue.status = "open";
          this.$store.dispatch("ChangeIssueStatusAction", issue);
        }
      } else {
        this.$store.dispatch("ChangeIssueStatusAction", issue);
      }

      this.GetIssues();
    },
    ChangeTrashStatus(issue) {
      issue.isTrashed = !issue.isTrashed;
      this.$store.dispatch("ChangeTrashStatusAction", issue);
      this.GetIssues();
    },
    ChangeIssue(issue) {
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
      issue.date = formatted_date;
      this.$store.dispatch("ChangeIssueAction", issue);
      this.GetIssues();
    },
  },
};
</script>
<style scoped>
.select-bar {
  width: 7rem;
  margin-top: 0.4rem;
  margin-left: -2rem;
  margin-right: 1rem;
  background-color: #aaaaaa;
  border-color: black;
}
#textarea,
.select-bar:focus {
  box-shadow: 0 0 0 0.2rem #df4c1693;
}
.scrollable {
  max-height: 35rem;
  overflow-y: scroll;
}
.issues-list {
  margin-top: 0.5rem;
}
.issues-description {
  background-color: #aaaaaa;
  border-color: black;
  height: 3rem;
}
.issues-description:focus {
  height: 6rem;
}
.issues-description:focus {
  box-shadow: 0 0 0 0.2rem #df4c1693;
}
.card {
  border-radius: 3rem;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #5a5a5a;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #4b4b4b;
}
@media only screen and (min-width: 992px) {
  .scrollable {
    max-width: 40rem;
  }
}
@media only screen and (max-width: 768px) {
  .select-bar {
    margin-left: 0rem;
  }
  .buttons-group {
    margin-top: 0.5rem;
    margin-left: -1rem;
  }
}
@media only screen and (max-width: 450px) {
  @media only screen and (max-height: 846px) {
    .scrollable {
      max-height: 28.5rem;
    }
  }
}
@media only screen and (max-width: 450px) {
  @media only screen and (max-height: 741px) {
    .scrollable {
      max-height: 25rem;
    }
  }
}
@media only screen and (max-height: 450px) {
  @media only screen and (max-width: 846px) {
    .scrollable {
      max-height: 8rem;
    }
  }
}
@media only screen and (max-width: 375px) {
  @media only screen and (max-height: 667px) {
    .scrollable {
      max-height: 19rem;
    }
  }
}
@media only screen and (max-width: 360px) {
  @media only screen and (max-height: 640px) {
    .issues-list {
      margin-top: 1rem;
    }
    .scrollable {
      max-height: 20rem;
    }
  }
}
@media only screen and (max-width: 320px) {
  @media only screen and (max-height: 568px) {
    .issues-list {
      margin-top: 1rem;
    }
    .scrollable {
      max-height: 20.5rem;
    }
  }
}
</style>
