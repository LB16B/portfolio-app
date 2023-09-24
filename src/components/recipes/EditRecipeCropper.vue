<template>
    <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="mx-auto flex flex-wrap border-2">
            <input
                ref="input"
                type="file"
                name="image"
                accept="image/*"
                @change="setImage"
            />
            <div class="lg:w-1/2 w-full lg:h-auto border-2">
                <vue-cropper
                    ref="cropper"
                    :aspect-ratio="16 / 9"
                    :src="imageData"
                    preview=".preview"
                    class="cropper-area-img"
                />
            </div>
            <div class="lg:w-1/2 w-full ">
                <div class="content">
                    <section class="preview-area border-2">
                        <p>Preview</p>
                        <div class="preview" />
                    </section>
                </div>
              <div class="flex ml-8">
                <div class="actions">
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(90)"
                    >
                        右回転
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="rotate(-90)"
                    >
                        左回転
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="reset"
                    >
                        リセット
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="getData"
                        >
                        適用する
                    </a>
                    <a
                        href="#"
                        role="button"
                        @click.prevent="showFileChooser"
                    >
                        画像選択
                    </a>
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
        // currentImage: 'http://localhost:8000/recipe_images/' + this.recipeFilename,
    };
},
props: ['fileName', 'recipeFilename'], 
    methods: {
        loadImage() {
      // 画像データを取得
        // axios.get('/api/test/{filename}')
        // .then(response => {
        //   this.imageData = response.data.data; // Base64エンコードされたデータURLを取得
        // })
        // .catch(error => {
        //   // エラーハンドリング
        // });
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
    // computed: {
    // currentImage() {
    //   // 画像データが変更されるたびに、このcomputedプロパティが再計算される
    //   // ここで初期表示の画像データと更新後の画像データを切り替える
    // //   this.imageData = 'http://localhost:8000/recipe_images/' + this.recipeFilename;
    //   return this.imageData;
    // },
    mounted() {
        // コンポーネントがマウントされた後にcurrentImageを計算し、設定
        this.imageData = 'http://localhost:8000/recipe_images/' + this.recipeFilename;
        this.loadImage();
    },
//   },
  created() {
    // コンポーネントが作成された際に初期画像をロード
    this.loadImage();
  }
};
</script>

'http://localhost:8000/recipe_images/' + this.recipeFilename,
<style>

.recipe-cropper {
    font-family: Arial, Helvetica, sans-serif;
    width: 1400px;
    margin: 0 auto;
}

input[type="file"] {
display: none;
}


.content {
display: flex;
justify-content: space-between;
padding: 30px;
}




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

.preview-area {
    width: 700px;
}

.preview {
width: 500px;
height: 500px;
overflow: hidden;
border: 1px solid blue;
}

.crop-placeholder {
width: 100%;
height: 200px;
background: #ccc;
}

.cropped-image img {
max-width: 100%;
}
</style>