<template>
  <div class="nav-container">
    <b-nav pills fill vertical>
      <router-link class="nav-link" tag="a" active-class="active" to="/fixtures">FIXTURES</router-link>
      <router-link class="nav-link" tag="a" active-class="active" to="/leagues">LEAGUES</router-link>
      <router-link class="nav-link" tag="a" active-class="active" to="/teams">TEAMS</router-link>
    </b-nav>
  </div>
</template>

<style scoped>
.nav-link {
  font-size: 20px;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
}

.nav-container {
  margin-top: 150px;
}
</style>
