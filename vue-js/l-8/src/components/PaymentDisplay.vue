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
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon color="primary">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title
                      :class="$style.pointer"
                      @click="editPayment(item.id)"
                    >
                      Редактировать
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      :class="$style.pointer"
                      @click="deleteItemFromList(item.id)"
                      >Удалить</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="showEdit"
    >
      <template>
        <EditPayment :item="selectedItem" @close-edit="closeEdit" />
      </template>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapMutations } from "vuex";
import EditPayment from "../components/EditPayment.vue";

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
      showEdit: false,
      selectedItem: {},
    };
  },
  methods: {
    ...mapMutations({ deleteItemFromList: "REMOVE_PAYMENT_DATA" }),
    editPayment(id) {
      this.selectedItem = this.items.filter(item => item.id == id)[0];
      this.showEdit = true;
    },
    closeEdit() {
      this.showEdit = false;
    }
  },
  components: {
    EditPayment
  }
};
</script>

<style lang="scss" module>
.pointer {
  cursor: pointer;
}
</style>
