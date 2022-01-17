import Vue from 'vue';

export default {
  state: {
    categoryList: [],
  },
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    ADD_CATEGORY_LIST(state, category) {
      Vue.set(state.categoryList, state.categoryList.length, category);
    },
  },
  getters: {
    categoryList: ({ categoryList }) => categoryList,
  },
  actions: {
    fetchCategoryListData({ commit }) {
      setTimeout(() => {
        const categoryList = ['Food', 'Transport', 'Education', 'Sport', 'Navigation', 'Entertaiment'];

        commit('SET_CATEGORY_LIST', categoryList);
      });
    },
  },
};
