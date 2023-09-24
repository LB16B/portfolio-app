<template>
    <button 
      @click="handleButtonClick"
      class="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
      変更する
    </button>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  
  // emits オプションを使用して 'edit' イベントを宣言
  const emit = defineEmits(['edit']); // 'edit' イベントを配列で宣言
  

  const handleButtonClick = () => {

    console.log('aaa')

  };
  </script>