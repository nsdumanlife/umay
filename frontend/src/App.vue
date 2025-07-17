<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar app class="header">
        <v-app-bar-title>Umay</v-app-bar-title>

        <template v-slot:append>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/text">Text</RouterLink>
        </template>
      </v-app-bar>

      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  padding-inline: 2rem;
}

.v-app-bar a {
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
}

.v-app-bar a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-app-bar a.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.15);
  font-weight: 500;
}
</style>
