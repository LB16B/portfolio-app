<template>
    {{ food }}
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  import { useFoodStore } from "../../stores/food";
  
  const foodStore = useFoodStore();
  
  // foodプロップを受け取る
  const { food } = defineProps(["food"]);
  
  // updateイベントをemitできるようにする
  const emit = defineEmits(["updated"]);
  
  // UpdateFood関数を定義し、非プロップ属性の処理を追加
  const UpdateFood = async (event) => {
    // 非プロップ属性の処理を追加
    // 例: const someData = event.someData;
  
    // foodプロップのデータを更新
    // 例: food.name = someData;
  
    // 更新されたデータを親コンポーネントに送信
    emit("updated", food);
  
    // その他の処理を追加
  };
  </script>
  