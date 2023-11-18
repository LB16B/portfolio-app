<template>
    <section class="text-gray-600 body-font overflow-hidden">
        <div class=" px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap border-red-400">
            <div class="lg:w-1/2 w-full lg:h-auto h-64">
                <section class="">
                    <div class="">
                        <div class="">
                            <vue-cropper
                                ref="cropper"
                                :view-mode="2"
                                :auto-crop-area="1"
                                :aspect-ratio="1"
                                :min-container-width="240"
                                :min-container-height="240"
         
                                drag-mode="none"
                                :src="imgSrc"
                                preview=".preview"
                                class="w-2/3 h-2/3"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6  lg:mt-0">
              <div class="flex ml-8">
                <div class="">
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(90)"
                        class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  w-22"
                    >
                        右回転
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(-90)"
                        class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  w-22"
                    >
                        左回転
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="reset"
                        class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  w-22"
                    >
                        リセット
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="getData"
                        class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  w-22"
                        >
                        適用する
                    </a>
                    <input
                    ref="input"
                    type="file"
                    name="image"
                    accept="image/*"
                    @change="setImage"
                    style="display: none;"
                    id="fileInput"
                    >
                    <label 
                        for="fileInput"
                        class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  w-22"
                    >
                        画像を選択
                    </label>
                    </div>
              </div>
            </div>
    </div>
</div>
</section>


</template>

<script>
import { ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {

components: {
    VueCropper,
},
data() {
    return {
    imgSrc: 'src/assets/images/2.png',
    cropImg: '',
    data: null,
    
    };
},
props: ['fileName'], // 親コンポーネントから受け取るプロパティを定義
methods: {
    cropImage() {
    this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
        const dom = this.$refs.flipX;
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleX(scale);    
        dom.setAttribute('data-scale', scale);
    },
    flipY() {
        const dom = this.$refs.flipY;
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleY(scale);
        dom.setAttribute('data-scale', scale);
    },
    getData() {
        const trimmingData = this.$refs.cropper.getData();
        this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        console.log('Trimming Data:', trimmingData); 
        this.$emit('trimming-data', trimmingData);
    },
    reset() {
        this.$refs.cropper.reset();
    },
    rotate(deg) {
        this.$refs.cropper.rotate(deg);
    },
    setImage(e) { 
        const file = e.target.files[0];
    if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
    }
    this.$emit('file-selected', file.name);
    if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
        this.imgSrc = event.target.result;
        this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Sorry, FileReader API not supported');
    }
    },
    zoom(percent) {
    this.$refs.cropper.relativeZoom(percent);
    },
},
};
</script>

