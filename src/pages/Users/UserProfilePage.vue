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

const name = ref('');
const email = ref('');
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


const handleSubmit = () => {
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
            // filename: newFileName || authStore.user.filename
        };

        updateProfile(requestData)
        uploadUserProfileImage(formData)




};
</script>