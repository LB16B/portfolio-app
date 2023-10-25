
<template>
    <main>
        <section class="text-gray-600 body-font  border-red-100 mx-auto w-2/3 relative border-4 h-72 mt-32">
            <h2 class="text-gray-600 body-font text-xl font-bold w-100 h-20 flex items-center justify-center">離乳食レシピ検索</h2>
            <div class="absolute container px-5 pt-6 mx-auto items-center justify-center flex" style="z-index: 3;">
                
                <div class="flex" >
                    <CategoryAges :categoryAges="categoryAges"   @categoryAgeSelected="handleCategoryAgeSelected"  />
                    <CategoryFoods :categoryFoods="categoryFoods" @categoryFoodSelected="handleCategoryFoodSelected" />
                </div>
            </div>

        </section>
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch, defineEmits  } from "vue";
import { storeToRefs } from "pinia"
import { useCategoryAgeStore } from "../stores/categoryage";
import { useCategoryFoodStore } from "../stores/category-food";
import CategoryAges from "../components/categoryAges/CategoryAges.vue";
import CategoryFoods from "../components/categoryFoods/CategoryFoods.vue";
import api from "../http/api";

const handleCategoryAgeSelected = (selectedItem) => {
  // 子コンポーネントから受け取ったデータを処理する
  console.log("Selected Category Age:", selectedItem);
  // ここで適切な処理を行います
};
const handleCategoryFoodSelected = (selectedItem) => {
  // 子コンポーネントから受け取ったデータを処理する
  console.log("Selected Category Food:", selectedItem);
  // ここで適切な処理を行います
};

const categoryAgeStore = useCategoryAgeStore()
const { categoryAges } = storeToRefs(categoryAgeStore)
const { fetchAllCategoryAges } = categoryAgeStore

const categoryFoodStore = useCategoryFoodStore()
const { categoryFoods } = storeToRefs(categoryFoodStore)
const { fetchAllCategoryFoods } = categoryFoodStore



onMounted(async () => {
    await fetchAllCategoryAges()
    await fetchAllCategoryFoods()
});


</script>