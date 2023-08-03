import api from "./api";

const resource = "/recipes";

export const allRecipes = () => api.get(resource);

export const createRecipe = (recipe) => api.post(resource, recipe);

export const updateRecipe = (id, recipe) => api.put(`${resource}/${id}`, recipe);

export const removeRecipe = id => api.delete(`${resource}/${id}`);

export const completeRecipe = (id, recipe) => api.put(`${resource}/${id}/complete`, recipe);