<template>
 <div class="main-layout flex h-screen">
  <!-- Sidebar -->
  <aside class="sidebar bg-white w-60 shadow-md flex flex-col pt-5">
    <!-- Sidebar Navigation -->
    <ul class="sidebar-nav space-y-4 px-4 mt-10">
      <li class="nav-item">
        <router-link
          to="/"
          class="nav-link"
        >
          Data Upload
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/uploaded-data"
          class="nav-link"
        >
          Uploaded Files
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/generated-files"
          class="nav-link"
        >
          Create From Template
        </router-link>
      </li>
    </ul>
  </aside>
  <!-- Main Content -->
  <main class="main-content flex-grow p-6 bg-gray-100 overflow-y-auto">
    <!-- Slot for injecting page content -->
    <slot></slot>
  </main>
</div>



</template>
