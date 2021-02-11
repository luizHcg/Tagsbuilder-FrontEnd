<template>
  <div>
    <b-container class="m-0 p-0">
      <b-row class="m-0 p-0">
        <b-col class="m-0 p-1">
          <b-form-group label="Codigo" label-class="mb-n2">
            <b-input-group size="sm">
              <b-input-group-prepend is-text>
                <input
                  v-model="findBy"
                  type="radio"
                  name="findBy"
                  value="code"
                  @change="ClearInputs()"
                />
              </b-input-group-prepend>
              <b-input
                v-model="code"
                type="number"
                size="sm"
                :disabled="findBy !== 'code'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col class="m-0 p-1">
          <b-form-group
            label="Produto"
            label-class="mb-n2"
            :description="HaveProductName"
          >
            <b-input-group size="sm">
              <b-input-group-prepend is-text>
                <input
                  v-model="findBy"
                  type="radio"
                  name="findBy"
                  value="product"
                  @change="ClearInputs()"
                />
              </b-input-group-prepend>
              <b-input
                v-model="product"
                size="sm"
                :disabled="findBy !== 'product'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col class="m-0 p-1">
          <b-form-group label="Cod. fabricante" label-class="mb-n2">
            <b-input-group size="sm">
              <b-input-group-prepend is-text>
                <input
                  v-model="findBy"
                  type="radio"
                  name="findBy"
                  value="codeMaker"
                  @change="ClearInputs()"
                />
              </b-input-group-prepend>
              <b-input
                v-model="codeMaker"
                size="sm"
                :disabled="findBy !== 'codeMaker'"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="m-0 p-0">
        <b-col class="m-0 p-1">
          <b-btn
            size="sm"
            variant="dark"
            class="mt-n3 mb-1 float-right"
            @click="Find()"
          >
            <i class="fas fa-search mr-1" />
            Pesquisar
          </b-btn>

          <b-btn
            size="sm"
            variant="danger"
            class="mt-n3 mb-1 mr-2 float-right"
            :disabled="findBy === ''"
            @click="CancelFindBy()"
          >
            <i class="fas fa-eraser mr-1" />
            Limpar
          </b-btn>
        </b-col>
      </b-row>
    </b-container>

    <b-table
      id="pcprodts-table"
      :fields="fields"
      :items="Items"
      small
      bordered
      head-variant="dark"
    >
      <template v-slot:cell(DESCRICAO4)="data">
        <b-btn
          size="sm"
          class="text-uppercase font-weight-bold"
          variant="outline-dark"
          block
          @click="SetLocalization(data.item, 'black')"
        >
          <i class="fas fa-window-close" v-if="data.item.DESCRICAO4 === null" />
          {{ data.item.DESCRICAO4 }}
        </b-btn>
      </template>

      <template v-slot:cell(DESCRICAO5)="data">
        <b-btn
          size="sm"
          class="text-uppercase font-weight-bold"
          variant="outline-danger"
          block
          @click="SetLocalization(data.item, 'red')"
        >
          <i class="fas fa-window-close" v-if="data.item.DESCRICAO5 === null" />
          {{ data.item.DESCRICAO5 }}
        </b-btn>
      </template>

      <template v-slot:cell(DESCRICAO7)="data">
        <b-btn
          size="sm"
          class="text-uppercase font-weight-bold"
          variant="outline-secondary"
          block
          @click="SetLocalization(data.item, 'black')"
        >
          <i class="fas fa-window-close" v-if="data.item.DESCRICAO7 === null" />
          {{ data.item.DESCRICAO7 }}
        </b-btn>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="Rows"
      size="sm"
      align="center"
      aria-controls="pcprodts-table"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { WritePermission } from "~/src/controller/RulesWritingTags";
import PcProdut from "~/src/model/PcProdut";
import Tag from "~/src/model/Tag";

@Component
export default class DBFind extends Vue {
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

  private fields = [
    {
      key: "CODPROD",
      label: "Cod.",
      class: "text-center align-middle font-weight-bold"
    },
    {
      key: "DESCRICAO",
      label: "Descrição",
      class: "text-center align-middle font-weight-bold"
    },
    {
      key: "UNIDADE",
      label: "UN.",
      class: "text-center align-middle font-weight-bold"
    },
    {
      key: "CODFAB",
      label: "Cod. Fab.",
      class: "text-center align-middle font-weight-bold"
    },
    {
      key: "EMBALAGEM",
      label: "Emb.",
      class: "text-center align-middle font-weight-bold"
    },
    {
      key: "DESCRICAO4",
      label: "Principal",
      class: "text-center align-middle m-w50px"
    },
    {
      key: "DESCRICAO5",
      label: "Excedente",
      class: "text-center align-middle m-w50px"
    },
    {
      key: "DESCRICAO7",
      label: "Filial.",
      class: "text-center align-middle m-w50px"
    }
  ];

  private findBy = "";
  private code = 0;
  private codeMaker = "";
  private product = "";

  private get HaveProductName() {
    return this.product.length > 0
      ? "O produto não necessariamente deve ter o nome digitado por completo, acentos e caracteres especiais ainda serão levados em consideração."
      : "";
  }

  private items: Array<PcProdut> = [];
  private get Items() {
    const list = this.$store.state.modulePcProdut.ListPcProdut ?? [];

    return (
      list.filter((item: PcProdut) => {
        if (this.findBy === "code") {
          return item.CODPROD.toString().match(this.code.toString());
        } else if (this.findBy === "codeMaker") {
          return item.CODFAB.toLowerCase().match(this.codeMaker.toLowerCase());
        } else if (this.findBy === "product") {
          return item.DESCRICAO.toLowerCase().match(this.product.toLowerCase());
        } else {
          return item;
        }
      }) ?? []
    );
  }

  private Find() {
    if (this.findBy === "") {
      this.FindAll();
    } else {
      this.FindBy();
    }
  }

  private async FindBy() {
    let content!: string;
    switch (this.findBy) {
      case "code":
        content = this.code.toString();
        break;
      case "codeMaker":
        content = this.codeMaker;
        break;
      case "product":
        content = this.product;
        break;
    }
    await this.$store.dispatch("modulePcProdut/FindFilter", {
      attr: this.findBy === "codeMaker" ? 1 : 0,
      content,
      page: this.currentPage
    });
  }

  private async FindAll() {
    await this.$store.dispatch("modulePcProdut/FindAll", this.currentPage);
  }

  private ClearInputs() {
    this.product = "";
    this.codeMaker = "";
    this.code = 0;
  }

  private CancelFindBy() {
    this.findBy = "";
    this.ClearInputs();
  }

  private SetLocalization(item: PcProdut, type: string) {
    const tag = new Tag();
    tag.code = item.CODPROD;
    tag.codeMaker = item.CODFAB;
    tag.description = item.DESCRICAO;

    switch (type) {
      case "black":
        if (item.DESCRICAO4) {
          tag.location = item.DESCRICAO4;
        }
        break;
      case "red":
        if (item.DESCRICAO5) {
          tag.location = item.DESCRICAO5;
        }
        break;
      case "secondary":
        if (item.DESCRICAO7) {
          tag.location = item.DESCRICAO7;
        }
        break;
    }

    tag.type = type;

    this.$store.commit("moduleTag/Set", { tag });
  }
}
</script>

<style></style>
