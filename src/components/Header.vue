<template>
  <div id="nav">
      <b-container>
        <b-navbar toggleable="sm" type="dark" variant="dark" align="center" class="nav-bar">
          <b-navbar-brand class="d-block d-sm-none" >ToDo</b-navbar-brand>
          <b-navbar-toggle
            target="nav-collapse"
            class="ml-auto">
          </b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <b-container  >
                <b-nav-item id="home" to="/" >Home</b-nav-item>
                <b-nav-item to="/issues/opened" custom>Open</b-nav-item>
                <b-nav-item to="/issues/done">Done</b-nav-item>
                <b-nav-item to="/issues/trashed">Trash</b-nav-item>
                </b-container>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        </b-container>
    </div>
</template>
<style scoped>
#nav a {
  font-weight: bold;
  font-size: medium;
  color: #fff;
  margin-left: 2em;
}
#home a{
  margin-left: 0;
}
.nav-bar{
  border: 1px solid;
  border-bottom-left-radius: 2em;
  border-bottom-right-radius: 2em;
}
#nav a.router-link-exact-active {
  color: #df4a16;
  text-decoration: underline;
}
</style>
