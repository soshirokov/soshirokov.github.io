<template>
  <div :class="$style.costBlock">
    <table :class="$style.costList">
      <tr>
        <th :class="$style.cell">id</th>
        <th :class="$style.cell">Date</th>
        <th :class="$style.cell">Category</th>
        <th :class="$style.cell">Value</th>
        <th :class="$style.cell">Action</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td :class="$style.cell">{{ item.id }}</td>
        <td :class="$style.cell">{{ item.date }}</td>
        <td :class="$style.cell">{{ item.category }}</td>
        <td :class="$style.cell">{{ item.value }}</td>
        <td :class="$style.cell">
          <span
            :class="$style.context__icon"
            @click="showMenu($event.currentTarget, item)"
            ><i class="fas fa-ellipsis-v"></i>
          </span>
        </td>
      </tr>
    </table>
    <transition :name="$style.fade">
      <ContextMenu v-if="showContext" :settings="settings" />
    </transition>
  </div>
</template>
<script>
import ContextMenu from "./ContextMenu.vue";

export default {
  name: "PaymentDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showContext: false,
      settings: null,
    };
  },
  methods: {
    showMenu(element, item) {
      if (this.showContext == true) this.$contextMenu.hide();
      else this.$contextMenu.show({ item: item, element: element });
    },
    contextOpen(settings) {
      this.settings = settings;
      this.showContext = true;
    },
    contextClose() {
      this.showContext = false;
    },
  },
  components: {
    ContextMenu,
  },
  mounted() {
    this.$contextMenu.EventBus.$on("show", this.contextOpen);
    this.$contextMenu.EventBus.$on("hide", this.contextClose);
  },
};
</script>

<style lang="scss" module>
.costBlock {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.costList {
  width: 600px;
}

.cell {
  padding: 5px 10px;
  border-bottom: 1px solid #d6d6d6;
}

.context__icon {
  cursor: pointer;
  display: block;
  position: relative;
  width: 100%;
}

.fade {
  &:global(-enter-active) {
    transition: opacity 0.5s;
  }
  &:global(-leave-active) {
    transition: opacity 0.5s;
  }
  &:global(-enter) {
    opacity: 0;
  }
  &:global(-leave-to) {
    opacity: 0;
  }
}
</style>
