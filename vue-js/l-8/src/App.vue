<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn color="white" plain raised to="/">Home</v-btn>
      <v-btn color="white" plain raised to="/about">Thx Vuetify</v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
color {
  color: rgb(1, 153, 158);
}
</style>