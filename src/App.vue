<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Inicio</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/acceso">OMG</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
export default {
  name: 'App',
  watch: {
        $route(to) {
            document.title = to.meta.title || 'Salud Digna - Covid19',
            document.icon='https://salud-digna.org/wp-content/uploads/2018/01/salud-digna.png'
        },
    }
}
</script>
