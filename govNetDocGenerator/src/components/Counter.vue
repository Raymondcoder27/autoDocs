<template>
     <div class="counter">
      <button @click="storeCounter.decreament" class="btn">-</button>
      <span class="btn">{{ storeCounter.count }}</span>
      <button @click="storeCounter.increament" class="btn">+</button>
    </div>
</template>

<script setup>
    // import { useCounterStore } from '@/stores/taskStore';
    // const storeCounter = useCounterStore()
</script>

<style scoped>
  main{
    text-align: center;
  }
  .btn{
    font-size: 30px;
    padding: 10px;
  }
</style>