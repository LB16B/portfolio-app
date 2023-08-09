<template>
<div>

    <input
    ref="input"
    type="file"
    name="image"
    accept="image/*"
    @change="setImage"
    />

    <div class="content">
    <section class="cropper-area">
        <div class="img-cropper">
        <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="imgSrc"
            preview=".preview"
        />
        </div>
        <div class="actions">
        <a
            href="#"
            role="button"
            @click.prevent="zoom(0.2)"
        >
            Zoom In
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="zoom(-0.2)"
        >
            Zoom Out
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="move(-10, 0)"
        >
            Move Left
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="move(10, 0)"
        >
            Move Right
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="move(0, -10)"
        >
            Move Up
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="move(0, 10)"
        >
            Move Down
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="rotate(90)"
        >
            Rotate +90deg
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="rotate(-90)"
        >
            Rotate -90deg
        </a>
        <a
            ref="flipX"
            href="#"
            role="button"
            @click.prevent="flipX"
        >
            Flip X
        </a>
        <a
            ref="flipY"
            href="#"
            role="button"
            @click.prevent="flipY"
        >
            Flip Y
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="cropImage"
        >
            Crop
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="reset"
        >
            Reset
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="getData"
        >
            Get Data
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="setData"
        >
            Set Data
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="getCropBoxData"
        >
            Get CropBox Data
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="setCropBoxData"
        >
            Set CropBox Data
        </a>
        <a
            href="#"
            role="button"
            @click.prevent="showFileChooser"
        >
            Upload Image
        </a>
        </div>

        <textarea v-model="data" />
    </section>
    <section class="preview-area">
        <p>Preview</p>
        <div class="preview" />
        <p>Cropped Image</p>
        <div class="cropped-image">
        <img
            v-if="cropImg"
            :src="cropImg"
            alt="Cropped Image"
        />
        <div v-else class="crop-placeholder" />
        </div>
    </section>
    </div>
</div>
</template>

<script>
import { ref, defineProps, defineEmits } from 'vue';
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
    // クロップされた画像の一部をCanvasに描画し、それをデータURLとして取得し格納
    this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
//   水平方向への反転
    flipX() {
        const dom = this.$refs.flipX;
        // data-scale属性の値を取得。画像の水平方向スケールを表す値を保持
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        // 実際に反転を行う
        this.$refs.cropper.scaleX(scale);
        // 更新されたスケール値をdata-scale属性に再設定して、値を保持
        dom.setAttribute('data-scale', scale);
    },
    flipY() {
        const dom = this.$refs.flipY;
        let scale = dom.getAttribute('data-scale');
        scale = scale ? -scale : -1;
        this.$refs.cropper.scaleY(scale);
        dom.setAttribute('data-scale', scale);
    },
    getCropBoxData() {
    // 画像のクロップボックスのデータをJSON形式の文字列として格納
    // 第二引数nullでデフォルトの置換関数を指定
    // 第三比引数4でインシデントレベルを指定
        this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
        const trimmingData = this.$refs.cropper.getData(); // トリミング情報を取得
        this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        // console.log(trimmingData)

        // イベントを発火してトリミング情報を親コンポーネントに送信
        this.$emit('trimming-data', trimmingData);
    },
    move(offsetX, offsetY) {
        this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
        this.$refs.cropper.reset();
    },
    rotate(deg) {
        this.$refs.cropper.rotate(deg);
    },
// 保存されたクロップボックスのデータを読み込んで、
// それを基に画像のクロップボックスを指定
    setCropBoxData() {
    if (!this.data) return;
    // 保存されたクロップボックスのデータを使用して画像のクロップボックスを設定
    // JSON.parse(this.data) this.dateに格納されているJSON形式の文字列を解析してJSのオブジェクトに変換
    // this.$refs.cropper.setCropBoxData 解析されたクロップボックスのデータを使用して、
    // cropperのクロップボックスを指定。これにより、イゼンに保存されたクロップボックスの位置やサイズを復元
    this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
    if (!this.data) return;

    this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) { 
        const file = e.target.files[0];
        // console.log(file)
    if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
    }
      this.$emit('file-selected', file.name); // 'file-selected' イベントを発行
    // ブラウザがFileReader APIをサポートしているか確認
    // FileReader API 非同期で読み込むためのAPI
    if (typeof FileReader === 'function') {
        // 新しいFileReaderオブジェクトを作成
        const reader = new FileReader();
        // 読み込みが完了した際に実行されるコールバック関数
        // ファイルのデータ(データURL)を取得し、それを元に画像を表示し、くろっぱーを更新
        reader.onload = (event) => {
        // 読み込んだデータURLをimgSrcに代入。画像を表示するためのソースとして活用
        this.imgSrc = event.target.result;
        // クロッパーのソースを更新して、選択された画像をクロッパーに反映
        this.$refs.cropper.replace(event.target.result);
        };
    //   ファイルの内容をデータURLとして読み込み
    // 画像のバイナリデータがBase64エンコードされたデータURLに変換される
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
};
</script>


<style>
body {
font-family: Arial, Helvetica, sans-serif;
width: 1024px;
margin: 0 auto;
}

input[type="file"] {
display: none;
}

.header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 0 5px 0;
}

.header h2 {
margin: 0;
}

.header a {
text-decoration: none;
color: black;
}

.content {
display: flex;
justify-content: space-between;
}

.cropper-area {
width: 614px;
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
width: 307px;
}

.preview-area p {
font-size: 1.25rem;
margin: 0;
margin-bottom: 1rem;
}

.preview-area p:last-of-type {
margin-top: 1rem;
}

.preview {
width: 100%;
height: calc(372px * (9 / 16));
overflow: hidden;
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