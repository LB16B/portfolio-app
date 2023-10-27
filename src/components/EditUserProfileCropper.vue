<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="px-5 py-24 mx-auto">
      <div class=" mx-auto flex flex-wrap border-2">

        <div class="w-2/3 h-96">
          <section class="">
              <div class="">
                  <vue-cropper
                      ref="cropper"
                      :aspect-ratio="10 / 10"
                      :src="imageData"
                      preview=".preview"
                      class="w-2/3 h-96 border-4 object-cover"
                  />
              </div>
          </section>
      </div>
      <div class="">
      <div class="flex ml-8 mt-24">
        <div class="">
          <a
              href="#"
              role="button"
              @click.prevent="rotate(90)"
              class="bg-pink-500 p-2 font-bold m-2 text-white rounded-md"
          >
              右回転
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="rotate(-90)"
              class="bg-pink-500 p-2 font-bold m-2 text-white rounded-md"
          >
              左回転
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="reset"
              class="bg-pink-500 p-2 font-bold m-2 text-white rounded-md"
          >
              リセット
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="getData"
              class="bg-pink-500 p-2 font-bold m-2 text-white rounded-md"
              >
              適用する
          </a>
          <input
          ref="input"
          type="file"
          name="image"
          accept="image/*"
          @change="setImage"
      />

          <!-- <a
              href="#"
              role="button"
              @click.prevent="showFileChooser"
              class="bg-pink-500 p-2 font-bold m-2 text-white rounded-md"
          >
              画像選択
          </a> -->

        </div>
      </div>
    </div>
    </div>
  </div>
</section>


</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import VueCropper from 'vue-cropperjs';
// import 'cropperjs/dist/cropper.css';


export default {

components: {
  VueCropper,
},
data() {
  return {
      imageData: '',
      cropImg: '',
      data: null,
  };
},
props: ['fileName'], 
  methods: {
      loadImage() {

  },
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
          this.imageData = event.target.result;
          this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
      } else {
          alert('Sorry, FileReader API not supported');
      }
      },
      showFileChooser() {
      this.$refs.input.click();
      },
      zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
      },
  },
  mounted() {
      // コンポーネントがマウントされた後にcurrentImageを計算し、設定
      this.imageData = 'http://localhost:8000/profile_images/' + this.fileName;
      this.loadImage();
  },
created() {
  this.loadImage();
}
};
</script>
<style>

</style>