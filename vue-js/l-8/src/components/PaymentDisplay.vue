<template>
  <v-row justify="center">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>id</th>
            <th>Date</th>
            <th>Category</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
            <td>
              <v-icon
                @click="showMenu($event.currentTarget, item)"
                color="primary"
                >mdi-dots-vertical</v-icon
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <transition :name="$style.fade">
      <ContextMenu v-if="showContext" :settings="settings" />
    </transition>
  </v-row>
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
