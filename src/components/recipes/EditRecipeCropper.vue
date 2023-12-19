<template>
    <section class="text-gray-600 body-font overflow-hidden">
        <div class="py-20 mx-auto ">
            <div class="lg:w-1/2 w-4/5  mx-auto flex flex-wrap bg-red-100 rounded-lg">


        <div class=" flex p-8 mx-auto">
            <div class=" lg:h-auto">
  
                  <vue-cropper
                      ref="cropper"
                      :view-mode="2"
                      :auto-crop-area="1"
                      :aspect-ratio="1"
                      :min-container-width="350"
                      :min-container-height="350"
                      :src="imageData"
                      preview=".preview"
                      class="w-2/3 h-2/3"
                  />
                </div>

 
      <div class="ml-8  w-full flex  items-center justify-center">
        <div class="">
          <a
              href="#"
              role="button"
              @click.prevent="rotate(90)"
              class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  lg:w-22"
          >
              右回転
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="rotate(-90)"
              class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  lg:w-22"
          >
              左回転
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="reset"
              class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  lg:w-22"
          >
              リセット
          </a>
          <a
              href="#"
              role="button"
              @click.prevent="getData"
              class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  lg:w-22"
              >
              適用する
          </a>
          <div class="mt-8 mx-auto flex items-center justify-center">
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
                class=" inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-2 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0  lg:w-22"
            >
                画像を選択
            </label>
        </div>

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
import 'cropperjs/dist/cropper.css';


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
      this.imageData = 'http://localhost:8000/recipe_images/' + this.fileName;
      this.loadImage();
  },
created() {
  this.loadImage();
}
};
</script>
<!-- <style>




.actions {
margin-top: 1rem;
}

.actions a {
display: inline-block;
padding: 5px 15px;
background: #0062CC;
color: white;
text-decoration: none;
border-radius: 3px;
margin-right: 1rem;
margin-bottom: 1rem;
}

textarea {
width: 100%;
height: 100px;
}





.crop-placeholder {
width: 100%;
height: 200px;
background: #ccc;
}

.cropped-image img {
max-width: 100%;
}
</style> -->