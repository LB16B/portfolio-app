<template>
  <div class="text-gray-600 body-font mt-12 relative">
    <div class="container px-5 pt-11 mx-auto">
        <div class="flex flex-col text-center w-full">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">パスワードを変更する</h1>
            <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
        </div>
    </div>
    </div>
    <div class="text-gray-600 body-font relative mt-6 w-2/4 mx-auto">
      <div class="container py-20 mx-auto bg-red-100 rounded-xl ">
      <form @submit.prevent="handleSubmit" class="flex flex-col -m-2 lg:w-2/3 mx-auto"  novalidate>
        <div class="flex flex-col ">
          <label for="currentPassword">現在のパスワード</label>
          <input
            type="password"
            v-model="currentPassword"
            required
            class="w-full  bg-opacity-50 rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <p class="text-red-500 mt-2" v-if="errorCurrentMessage">{{ errorCurrentMessage }}</p> 
        </div>

        <div class="flex flex-col mt-6">
          <label for="newPassword">新しいパスワード</label>
          <input
            type="password"
            v-model="newPassword"
            required
            class="w-full  bg-opacity-50 rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <p class="text-red-500 mt-2" v-if="errorNewMessage">{{ errorNewMessage }}</p>
        </div>
  
        <div class="flex flex-col mt-6">
          <label for="newConfirmPassword">新しいパスワード（再確認）</label>
          <input
            type="password"
            v-model="newConfirmPassword"
            class="w-full  bg-opacity-50 rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <p class="text-red-500 mt-2" v-if="errorConfirmationMessage">{{ errorConfirmationMessage }}</p>
        </div>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <button type="submit"
        class="flex mx-auto mt-8 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
        >
            変更</button>
      </form>
    </div>
    </div>
  </template>
  
  <script setup>
  import { useChangePasswordStore } from '../../stores/changepassword';
  import { ref } from 'vue';
  
  const { performChangePassword } = useChangePasswordStore();
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const newConfirmPassword = ref('');
  const errorCurrentMessage = ref('');
  const errorNewMessage = ref('');
  const errorConfirmationMessage = ref('');
  
  const handleSubmit = () => {
    if (currentPassword.value.length === 0) {
  errorCurrentMessage.value = '※現在のパスワードを入力してください。'; 
} else if (currentPassword.value.length <= 7) {
  errorCurrentMessage.value = '※現在のパスワードは8文字以上で入力してください。'; 
} else {
  errorCurrentMessage.value = ''; // エラーがない場合はエラーメッセージをリセット
}

if (newPassword.value.length === 0) {
  errorNewMessage.value = '※新しいパスワードを入力してください。'; 
} else if (newPassword.value.length <= 7) {
  errorNewMessage.value = '※新しいパスワードは8文字以上で入力してください。'; 
} else if (!/[A-Z0-9]/.test(newPassword.value)) {
  errorNewMessage.value = '※パスワードは大文字含む英数字を必ず入れてください。'; 
} else {
  errorNewMessage.value = ''; // エラーがない場合はエラーメッセージをリセット
}

if (newConfirmPassword.value.length === 0) {
  errorConfirmationMessage.value = '※新しいパスワード（再確認）を入力してください。'; 
} else if (newConfirmPassword.value.length <= 7) {
  errorConfirmationMessage.value = '※新しいパスワード（再確認）は8文字以上で入力してください。'; 
} else {
  errorConfirmationMessage.value = ''; // エラーがない場合はエラーメッセージをリセット
}

  if (newPassword.value.trim() !== newConfirmPassword.value.trim()) {
  errorNewMessage.value = '※入力された新しいパスワードと新しいパスワード(再確認)の値が一致しません。'; 
  return; 
}
    const requestData = {
      current_password: currentPassword.value,
      new_password: newPassword.value,
      new_password_confirmation: newConfirmPassword.value,
    };

    performChangePassword(requestData);
  };
  </script>
  