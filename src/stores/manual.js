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
        try{
            const { data: createdManual } = await createManual(newManual);
            manuals.value.unshift(createdManual.data);
            console.log('成功');
        } catch (error) {
            console.log("API リクエストエラー", error);
        }
    };

    // データ更新
    const handleUpdatedManual = async (manual) => {
        try {
            const { data: updatedManual } = await updateManual(manual.id, {
                body: manual.body,
            });

            // 更新後のデータを反映
            const index = manuals.value.findIndex(item => item.id === manual.id);
            if (index !== -1) {
                manuals.value[index].body = updatedManual.data.body;
            }

            console.log("変更しました。")
        } catch (error) {
            console.log("API リクエストエラー", error);
        }
    }

    return {
        manuals,
        fetchAllManuals,
        handleAddedManual,
        handleUpdatedManual
    };
});