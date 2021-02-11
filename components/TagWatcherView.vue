<template>
  <div>
    <b-table
      id="tag-watcher-table"
      small
      bordered
      head-variant="dark"
      :fields="fields"
      :items="List"
    >
      <template v-slot:cell(CREATE_AT)="data">{{ ToLocalDate(data.item.CREATE_AT) }}</template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="Rows"
      size="sm"
      align="center"
      aria-controls="tag-watcher-table"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";

@Component
export default class TagWatcherView extends Vue {
  private fields = [
    {
      key: "SEQTAGWATCHER",
      label: "#",
      class: "align-middle text-center",
    },
    { key: "PRODUCT_CODE", label: "Cód. Produto/Loc.", class: "align-middle" },
    {
      key: "CREATE_AT",
      label: "Data",
      class: "align-middle text-center",
    },
    { key: "CREATED_NAME", label: "Nome/Codigo", class: "align-middle" },
  ];

  private currentPage = 1;
  private rows = 1;
  private perPage = 20;

  @Watch("currentPage", { immediate: true })
  private RefreshTable() {
    this.Find();
  }

  private get Rows() {
    return this.$store.state.modulePcProdut.CountLenghtPcProdut ?? 1;
  }

  private list = [];
  get List() {
    return this.list;
  }

  private async Find() {
    await this.$store
      .dispatch("moduleTagWatcher/ListTagsGenerate", {
        type: this.$store.getters["moduleAuthorization/GetType"],
        page: this.currentPage,
      })
      .then((r) => {
        this.list = r.list;
        this.rows = r.count;
      });
  }

  ToLocalDate(data: Date) {
    return `${new Date(data).toLocaleDateString()} ${new Date(
      data
    ).toLocaleTimeString()}`;
  }

  mounted() {
    this.Find();
  }
}
</script>

<style lang="scss" scoped>
</style>
