<template>
  <div>
    <header>
      <!-- <div class="header-content">
        <h4 class="title">DOCUMENT GENERATOR</h4>
      </div> -->
      <!-- <div class="bg-blue-500 text-white p-4">
  Hello, Tailwind!
</div> -->
      <div class="nav-bar">
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.png" /> -->
        <img alt="Vue logo" class="logo" src="https://govnet.africa/wp-content/uploads/2023/06/Govnet-logo.jpg" />

        <!-- <nav class="filter">
          <RouterLink to="/">Data Upload</RouterLink>
          <RouterLink to="/uploaded-data">Uploaded Data</RouterLink>
          <RouterLink to="/generated-files">Generated Files</RouterLink>
        </nav> -->
        <div class="header-content">
          <h4 class="title"><b>DOCUMENT GENERATOR</b></h4>
        </div>
      </div>
    </header>
    <HomeView>
      <RouterView />
    </HomeView>
  </div>
</template>

<script setup>
import HomeView from "./views/HomeView.vue";
</script>

<style scoped>
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

aside {
  width: 300px;
  height: 100%;
}
aside ul a.router-link-exact-active {
  color: var(--color-text);
}

aside ul a.router-link-exact-active:hover {
  background-color: transparent;
}

aside ul a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

aside ul {
  list-style: none;
}
aside ul a {
  text-decoration: none;
}
/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
