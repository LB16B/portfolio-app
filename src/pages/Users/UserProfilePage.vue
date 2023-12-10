<template>
<div class="text-gray-600 body-font mt-24 relative">
    <div class="container px-5 pt-11 mx-auto">
        <div class="flex flex-col text-center w-full">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">プロフィールを編集する</h1>
            <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
        </div>
    </div>
</div>
<EditUserProfileCropper 
    :fileName="authStore.user.filename"
    @file-selected="handleFileSelected" 
    @trimming-data="handleTrimmingData"
/>

<div class="bg-red-400 bg-opacity-20 md:w-4/5 xl:w-1/2 mx-auto p-14 rounded-lg">
    <form @submit.prevent="handleSubmit">
    <div class="mb-8 flex flex-col">
        <label 
            for="name" 
            class="body-font text-2xl font-medium mr-4 mb-4 text-center"
        >
            名前
        </label>
        <input 
            type="text"
            id="name" 
            v-model="name"
            class="h-8 w-10/12 flex items-center mx-auto bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none  leading-8 transition-colors duration-200 ease-in-out" 
        />
    </div>
    <div class="mb-8 flex flex-col">
        <label 
            for="email" 
            class="body-font text-2xl font-medium mr-4 mb-4 text-center"
        >
            メールアドレス
        </label>
        <input 
            type="email" 
            id="email" 
            v-model="email"
            class="h-8 w-10/12 flex items-center mx-auto bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none  leading-8 transition-colors duration-200 ease-in-out"
        />
        <p v-if="!isEmailValid" class="text-red-500 ml-16">※正しい形式のメールアドレスを入力してください</p>
    </div>
    <button 
        type="submit"
        class="flex mx-auto bg-pink-500 text-center  text-white border-0 px-8  py-2 focus:outline-none hover:bg-pink-600 rounded text-lg"
    >
        更新する
    </button>
    </form>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserProfileStore } from '../../stores/userprofile';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useProfileImageUploadStore } from '../../stores/profileImageupload'
import EditUserProfileCropper from '../../components/EditUserProfileCropper.vue'

// モーダルウィンドウ

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

// プロフィール編集

const router = useRouter()
const authStore = useAuthStore()
const storeUpload = useProfileImageUploadStore()
const { uploadUserProfileImage } = storeUpload
const { updateProfile } = useUserProfileStore();
const selectedFile = ref(null);

const name = ref(authStore.user.name);
const email = ref(authStore.user.email);
const filename = ref('')

const emit = defineEmits('file-selected');

const path = "http://localhost:8000/profile_images/";
const trimmingInfo = ref({ x: 0, y: 0, height: 0, width: 0 });
const formData = new FormData();

const handleTrimmingData = (data) => {
    trimmingInfo.value = {
        x: data.x,
        y: data.y,
        height: data.height,
        width: data.width
    };

    formData.append('x', trimmingInfo.value.x);
    formData.append('y', trimmingInfo.value.y);
    formData.append('height', trimmingInfo.value.height);
    formData.append('width', trimmingInfo.value.width);
};

const handleFileSelected = (filename) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
    }
};

const isEmailValid = computed(() => {
  // メールアドレスの形式をチェックする正規表現
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
});

const handleSubmit = () => {
    if (selectedFile.value !== null) {
        formData.append('file', selectedFile.value);
    
            const currentDate = new Date();
            const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            const formatter = new Intl.DateTimeFormat('ja-JP', options);
            const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');
            const newFileName = `${formattedDateTime}_${selectedFile.value.name}`;
    
            const requestData = {
                name: name.value || authStore.user.name,
                email: email.value || authStore.user.email,
                filename: newFileName
            };
    
            updateProfile(requestData)
            uploadUserProfileImage(formData)
    } else {
        const requestData = {
                name: name.value || authStore.user.name,
                email: email.value || authStore.user.email,
                filename: authStore.user.filename
            };
    
            updateProfile(requestData)
    }

};
</script>