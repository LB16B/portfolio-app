<template>
    <div class="text-gray-600 body-font text-xl bg-red-100 mt-10">
        <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div class="flex-shrink-0 md:mx-0 mx-auto text-center md:text-left xl:mt-8 md:mb-8">
            <a class="flex title-font items-center md:justify-start justify-center text-gray-900">
              <img class="xl:w-80 lg:w-62 md:w-72" src="../../public/logo.png">
            </a>
          </div>
          <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font text-gray-900 tracking-widest mb-3">CATEGORIES</h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font text-gray-900 tracking-widest mb-3">CATEGORIES</h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font text-gray-900 tracking-widest mb-3">CATEGORIES</h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font text-gray-900 tracking-widest mb-3">CATEGORIES</h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">First Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Second Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Third Link</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="bg-gray-100">
          <div class="container mx-auto py-4 xl:px-4 flex flex-wrap flex-col sm:flex-row ">
            <p class="text-gray-500 text-center sm:text-left">© 2023 YumYum離乳食専門レシピサイト —
              <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@yumyumforbaby</a>
            </p>
            <span 
              class="inline-flex sm:ml-auto sm:mt-0 mt-2 pl-20  sm:justify-start md:items-bottom"
            >
              <button 
                @click="shareOnFacebook"
                class=" md:w-8 md:h-8"
                >
                <svg 
                  fill="currentColor" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  class="w-5 h-5 md:w-6 md:h-6" 
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </button>
              <div>
                <button 
                  @click="shareOnTwitter"
                  class=" md:w-8 md:h-8"
                  >
                  <svg 
                    fill="currentColor" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    class="w-5 h-5 md:w-6 md:h-6" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </button>
              </div>
              <button 
                @click="shareOnInstagram"
                class=" md:w-8 md:h-8"
                >
                <svg 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  class="w-5 h-5 md:w-6 md:h-6" 
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </button>
        
              <div>

              </div>
            </span>
          </div>
        </div>
      </div>
</template>

<script setup>
const shareOnTwitter = () => {
  const tweetText = "ポートフォリオのテストです";
  const url = encodeURIComponent("http://localhost:5173");
  const hashtags = "ポートフォリオのテスト"; 
  const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}&hashtags=${hashtags}`;
  window.open(shareUrl, "_blank");
};

const shareOnInstagram = () => {
  const url = encodeURIComponent("http://localhost:5173");
  const shareUrl = `https://www.instagram.com/share?url=${url}`;
  window.open(shareUrl, "_blank");
};

const shareOnFacebook = () => {
  const url = encodeURIComponent("");
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, "_blank");
};
</script>