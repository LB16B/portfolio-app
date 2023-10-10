<template>
    <div>
      <h1>パスワード変更</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="currentPassword">現在のパスワード</label>
          <input
            type="password"
            v-model="currentPassword"
            required
            class="border-2"
          />
        </div>
  
        <div>
          <label for="newPassword">新しいパスワード</label>
          <input
            type="password"
            v-model="newPassword"
            required
            class="border-2"
          />
        </div>
  
        <div>
          <label for="newConfirmPassword">新しいパスワード（確認）</label>
          <input
            type="password"
            v-model="newConfirmPassword"
            class="border-2"
          />
        </div>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <button type="submit" class="border-2 bg-gray-400">変更</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useChangePasswordStore } from '../../stores/changepassword';
  import { ref } from 'vue';
  
  const { performChangePassword } = useChangePasswordStore();
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const newConfirmPassword = ref('');
  
  const handleSubmit = () => {
    const requestData = {
      current_password: currentPassword.value,
      new_password: newPassword.value,
      new_password_confirmation: newConfirmPassword.value,
    };

    performChangePassword(requestData);
  };
  </script>
  