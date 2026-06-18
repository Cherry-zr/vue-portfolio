import { defineStore } from "pinia";
import { projects } from "../data/projects";
import { campusCategories, campusGoods } from "../data/campusMarket";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projects,
    campusCategories,
    campusGoods,
    selectedCampusCategory: "全部",
    campusKeyword: ""
  }),
  getters: {
    featuredProject: (state) => state.projects.find((project) => project.highlight),
    getProjectBySlug: (state) => (slug) => state.projects.find((project) => project.slug === slug),
    getGoodsById: (state) => (id) => state.campusGoods.find((item) => item.id === id),
    filteredCampusGoods(state) {
      const keyword = state.campusKeyword.trim().toLowerCase();
      return state.campusGoods.filter((item) => {
        const matchCategory =
          state.selectedCampusCategory === "全部" || item.category === state.selectedCampusCategory;
        const matchKeyword =
          !keyword ||
          item.title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword);
        return matchCategory && matchKeyword;
      });
    }
  },
  actions: {
    setCampusCategory(category) {
      this.selectedCampusCategory = category;
    },
    setCampusKeyword(keyword) {
      this.campusKeyword = keyword;
    }
  }
});
