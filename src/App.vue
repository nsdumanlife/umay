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
          <RouterLink to="/about">About</RouterLink>
        </template>
      </v-app-bar>

      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* App bar navigation links */
.v-app-bar a {
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.v-app-bar a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-app-bar a.router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.15);
  font-weight: 500;
}

nav {
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
