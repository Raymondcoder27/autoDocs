<template>
    <transition name="fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[96vh] overflow-y-auto relative transition-opacity duration-300 ease-in-out"
        >
          <button
            class="absolute top-1 right-4 text-sm rounded-md px-4 py-2 bg-gray-800 text-white hover:text-white"
            @click="$emit('close')"
          >
            &times;
          </button>
          <br>
          <slot></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
  });
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  