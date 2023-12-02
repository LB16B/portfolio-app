import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allManuals, createManual, updateManual } from "../http/manual-api";
import { useRouter } from "vue-router";

export const useManualStore = defineStore('manualStore', () => {
    const manuals = ref([]);
    const router = useRouter();

    // データ全件取得
    const fetchAllManuals = async () => {
        const { data } = await allManuals();
        manuals.value = data.data;
    }

    // 新規データ追加
    const handleAddedManual = async (newManual) => {

            const { data: createdManual } = await createManual(newManual);
            manuals.value.unshift(createdManual.data);
            console.log('成功');
        router.push({ name: 'top' });
    };

    // データ更新
    const handleUpdatedManual = async (manual) => {

            const { data: updatedManual } = await updateManual(manual.id, {
                body: manual.body,
                recipe_id: manual.recipe_id,
            });

            // 更新後のデータを反映
            const index = manuals.value.findIndex(item => item.id === manual.id);
            if (index !== -1) {
                manuals.value[index].body = updatedManual.data.body;
                manuals.value[index].recipe_id = updatedManual.data.recipe_id;
            }

            console.log("変更しました。")
    }

    return {
        manuals,
        fetchAllManuals,
        handleAddedManual,
        handleUpdatedManual
    };
});