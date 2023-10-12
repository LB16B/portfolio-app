<template>
<div>
    <h1>Edit User Profile</h1>
    <form @submit.prevent="handleSubmit">
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" />
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
    </div>
    <button type="submit">Update Profile</button>
    </form>
</div>
</template>
  

<script setup>
import { useUserProfileStore } from '../../stores/userprofile';
import { ref } from 'vue';

const { updateProfile } = useUserProfileStore();

const name = ref('');
const email = ref('');

const handleSubmit = () => {
    const requestData = {
        name: name.value,
        email: email.value
    };

    updateProfile(requestData)
};
</script>