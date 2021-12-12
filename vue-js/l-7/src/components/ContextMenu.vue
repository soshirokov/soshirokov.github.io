<template>
  <div
    :class="$style.contextMenu"
    :style="{
      left: settings.element.offsetLeft - 150 + 'px',
      top: settings.element.offsetTop + 25 + 'px',
    }"
  >
    <div v-if="!showEdit">
      <div :class="$style.contextMenu__item" @click="showEdit = true">
        Редактировать
      </div>
      <div
        :class="$style.contextMenu__item"
        @click="deleteItem(settings.item.id)"
      >
        Удалить
      </div>
    </div>
    <EditPayment v-if="showEdit" :item="settings.item" @close-edit="close" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import EditPayment from "./EditPayment.vue";

export default {
  name: "ContextMenu",
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showEdit: false,
    };
  },
  methods: {
    ...mapMutations({ deleteItemFromList: "REMOVE_PAYMENT_DATA" }),
    deleteItem(id) {
      this.deleteItemFromList(id);
      this.$contextMenu.hide();
    },
    close() {
      this.$contextMenu.hide();
    },
  },
  components: {
    EditPayment,
  },
};
</script>

<style module>
.contextMenu {
  z-index: 999;
  border: 1px solid #d6d6d6;
  position: absolute;
  width: 200px;
  background: #fff;
}

.contextMenu__item {
  line-height: 32px;
  height: 32px;
  width: 100%;
  margin: 5px 0;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.contextMenu__item:hover {
  background: #d6d6d6;
}
</style>