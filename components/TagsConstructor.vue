<template>
  <div>
    <b-form @submit.prevent="AddListPrintTags()">
      <b-container class="p-0 m-0">
        <b-row class="p-0 m-0">
          <!-- Code -->
          <b-col class="p-0 m-0" cols="4">
            <b-form-group label="Código" label-class="mb-n1" label-size="sm">
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <i class="fas fa-barcode" />
                </b-input-group-prepend>
                <b-input
                  v-model="ObjectTag.code"
                  type="number"
                  :disabled="!RulesCreatTag.code"
                  min="1"
                  :required="RulesCreatTag.code"
                />
                <b-form-select
                  v-model="selectedBranch"
                  :disabled="!RulesCreatTag.code || !RulesCreatTag.type"
                  :options="branch"
                  :class="
                    `font-weight-bold ${
                      SelectedBranch === 2 ? 'text-danger' : ''
                    }`
                  "
                />
                <b-input-group-append>
                  <b-btn
                    v-b-popover.hover="'Clique para buscar produto pelo cód.'"
                    :disabled="!RulesCreatTag.code || !ObjectTag.code"
                    :variant="
                      RulesCreatTag.code ? 'outline-secondary' : 'secondary'
                    "
                    @click="FindById()"
                  >
                    <i class="fas fa-search-location" />
                  </b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Code - End -->
          <!-- Lacation -->
          <b-col class="p-0 m-0 mr-3 ml-3" cols="2">
            <b-form-group label="Endereço" label-class="mb-n1" label-size="sm">
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <i class="fas fa-map-marked" />
                </b-input-group-prepend>
                <b-input
                  v-model="ObjectTag.location"
                  :disabled="!RulesCreatTag.location"
                  :required="RulesCreatTag.location"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Lacation - End -->
          <!-- Code-Maker -->
          <b-col class="p-0 m-0" cols="2">
            <b-form-group
              label="Cod.fabricante"
              label-class="mb-n1"
              label-size="sm"
            >
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <i class="fas fa-building" />
                </b-input-group-prepend>
                <b-input
                  v-model="ObjectTag.codeMaker"
                  :disabled="!RulesCreatTag.codeMaker"
                  :required="RulesCreatTag.codeMaker"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Code-Maker - End -->
          <!-- Type -->
          <b-col class="p-0 m-0 ml-3">
            <b-form-group
              :label="`Tipo ${!RulesCreatTag.type ? '(desativado)' : ''}`"
              label-class="mb-n1"
              label-size="sm"
              :description="
                `Contorno da etique será ${
                  ObjectTag.type === 'black' ? 'preto!' : 'vermelho!'
                }`
              "
            >
              <b-form-radio-group
                v-model="ObjectTag.type"
                buttons
                size="sm"
                class="btn-block"
                :disabled="!RulesCreatTag.type"
                :required="RulesCreatTag.type"
              >
                <b-form-radio
                  class="font-weight-bold"
                  :style="
                    `background-color: ${
                      objectTag.type === 'black' ? 'black' : ''
                    }`
                  "
                  name="some-radios"
                  value="black"
                  button-variant="outline-secondary"
                >
                  Estoque
                </b-form-radio>
                <b-form-radio
                  class="font-weight-bold"
                  :style="
                    `background-color: ${objectTag.type === 'red' ? 'red' : ''}`
                  "
                  name="some-radios"
                  value="red"
                  button-variant="outline-secondary"
                >
                  Excedente
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <!-- Type - End -->
        </b-row>
        <b-row class="p-0 m-0">
          <!-- Description -->
          <b-col cols="5" class="p-0 m-0">
            <b-form-group label="Descrição" label-class="mb-n1" label-size="sm">
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <i class="fas fa-file-alt" />
                </b-input-group-prepend>
                <b-textarea
                  v-model="ObjectTag.description"
                  :disabled="!RulesCreatTag.description"
                  :required="RulesCreatTag.description"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Description - End -->
          <!-- Image -->
          <b-col class="p-0 m-0 ml-2">
            <b-form-group label="Imagem" label-class="mb-n1" label-size="sm">
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <i class="fas fa-image" />
                </b-input-group-prepend>
                <b-file
                  v-model="file"
                  size="sm"
                  browse-text="..."
                  :disabled="!RulesCreatTag.img"
                  :required="RulesCreatTag.img"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Image - End -->
          <!-- Quantity -->
          <b-col class="p-0 m-0 ml-3">
            <b-form-group
              label="Qtd."
              :description="
                `Qtd. de etiquetas: ${ListPrintTagsLength} de ${QuantityTagPrint}.`
              "
              label-class="mb-n1"
              label-size="sm"
            >
              <b-input-group size="sm">
                <b-input-group-prepend is-text>
                  <span class="font-weight-bold small">Nª</span>
                </b-input-group-prepend>
                <b-input
                  v-model="quantity"
                  type="number"
                  min="1"
                  :max="QuantityTagPrint - ListPrintTagsLength"
                  @change="MaxQuantityPrint()"
                />
                <b-input-group-append>
                  <b-btn
                    variant="outline-secondary"
                    :disabled="
                      !(quantity <= QuantityTagPrint) ||
                        ListPrintTagsLength === QuantityTagPrint
                    "
                    type="submit"
                  >
                    <i class="fas fa-folder-plus mr-1" />
                  </b-btn>

                  <b-btn
                    variant="outline-danger"
                    class="ml-2 font-weight-bold"
                    @click="ClearObjectTag()"
                  >
                    <i class="fas fa-trash" />
                  </b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- Quantity - End -->
        </b-row>
      </b-container>
    </b-form>
    <div class="flex mr-2 justify-content-end mt-2 h-100">
      <b-btn
        v-b-modal.tb-modal-tags-print
        class="float-right font-weight-bold"
        size="sm"
        variant="outline-secondary"
        :disabled="ListPrintTagsLength == 0"
      >
        <i class="fas fa-tags mr-1" />
        Listagem de de etiquetas
      </b-btn>

      <b-btn
        v-b-modal.tb-modal-mold
        class="float-right font-weight-bold ml-2"
        size="sm"
        variant="outline-secondary hover-text-pdf"
        :disabled="ListPrintTagsLength == 0"
      >
        <i class="fas fa-file-pdf mr-1" />
        Visualizar arquivo
      </b-btn>
    </div>
    <!-- Tag controller -->

    <div class="mt-4 mb-2">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            v-b-toggle.accordion-1
            variant="secondary"
            class="font-weight-bold"
            size="sm"
            >Controle para tamanho das legendas</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-container>
              <b-row>
                <b-col>
                  <b-form-group
                    label="Código"
                    label-class="mb-n1"
                    label-size="sm"
                  >
                    <b-input-group size="sm">
                      <b-input-group-prepend is-text>
                        <i class="fas fa-barcode" />
                      </b-input-group-prepend>
                      <b-input-group-prepend>
                        <b-btn
                          :disabled="!RulesCreatTag.code"
                          variant="outline-dark"
                          @click="--objectTag.fsCode"
                        >
                          <i class="fas fa-minus" />
                        </b-btn>
                      </b-input-group-prepend>
                      <b-input
                        :disabled="!RulesCreatTag.code"
                        v-model="objectTag.fsCode"
                        min="1"
                        max="120"
                        type="number"
                        class="text-center border-dark"
                      />
                      <b-input-group-append>
                        <b-btn
                          :disabled="!RulesCreatTag.code"
                          variant="outline-dark"
                          @click="++objectTag.fsCode"
                        >
                          <i class="fas fa-plus" />
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    label="Endereço"
                    label-class="mb-n1"
                    label-size="sm"
                  >
                    <b-input-group size="sm">
                      <b-input-group-prepend is-text>
                        <i class="fas fa-map-marked" />
                      </b-input-group-prepend>
                      <b-input-group-prepend>
                        <b-btn
                          variant="outline-dark"
                          :disabled="!RulesCreatTag.location"
                          @click="--objectTag.fsLocation"
                        >
                          <i class="fas fa-minus" />
                        </b-btn>
                      </b-input-group-prepend>
                      <b-input
                        :disabled="!RulesCreatTag.location"
                        v-model="objectTag.fsLocation"
                        min="1"
                        max="120"
                        type="number"
                        class="text-center border-dark"
                      />
                      <b-input-group-append>
                        <b-btn
                          :disabled="!RulesCreatTag.location"
                          variant="outline-dark"
                          @click="++objectTag.fsLocation"
                        >
                          <i class="fas fa-plus" />
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    label="Cod. fabricante"
                    label-class="mb-n1"
                    label-size="sm"
                  >
                    <b-input-group size="sm">
                      <b-input-group-prepend is-text>
                        <i class="fas fa-building" />
                      </b-input-group-prepend>
                      <b-input-group-prepend>
                        <b-btn
                          :disabled="!RulesCreatTag.codeMaker"
                          variant="outline-dark"
                          @click="--objectTag.fsCodeMaker"
                        >
                          <i class="fas fa-minus" />
                        </b-btn>
                      </b-input-group-prepend>
                      <b-input
                        :disabled="!RulesCreatTag.codeMaker"
                        v-model="objectTag.fsCodeMaker"
                        min="1"
                        max="120"
                        type="number"
                        class="text-center border-dark"
                      />
                      <b-input-group-append>
                        <b-btn
                          :disabled="!RulesCreatTag.codeMaker"
                          variant="outline-dark"
                          @click="++objectTag.fsCodeMaker"
                        >
                          <i class="fas fa-plus" />
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col>
                  <b-form-group
                    label="Descrição"
                    label-class="mb-n1"
                    label-size="sm"
                  >
                    <b-input-group size="sm">
                      <b-input-group-prepend is-text>
                        <i class="fas fa-file-alt" />
                      </b-input-group-prepend>
                      <b-input-group-prepend>
                        <b-btn
                          :disabled="!RulesCreatTag.description"
                          variant="outline-dark"
                          @click="--objectTag.fsDescription"
                        >
                          <i class="fas fa-minus" />
                        </b-btn>
                      </b-input-group-prepend>
                      <b-input
                        v-model="objectTag.fsDescription"
                        min="1"
                        max="120"
                        type="number"
                        class="text-center border-dark"
                        :disabled="!RulesCreatTag.description"
                      />
                      <b-input-group-append>
                        <b-btn
                          :disabled="!RulesCreatTag.description"
                          variant="outline-dark"
                          @click="++objectTag.fsDescription"
                        >
                          <i class="fas fa-plus" />
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col cols="1" class="p-0">
                  <b-form-group
                    label="."
                    label-class="mb-n1 text-white"
                    label-size="sm"
                  >
                    <b-btn
                      size="sm"
                      block
                      variant="outline-success"
                      v-b-popover.hover="
                        'Clique para voltar ao tamanho padrão.'
                      "
                      @click="SetDimensionTagDefault(VisibleTag)"
                    >
                      <i class="fas fa-sync" />
                    </b-btn>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="pt-3 flex flex-column">
      <transition name="fade" mode="out-in">
        <cod-1-tag v-if="VisibleTag === 'COD1'" :object-tag="ObjectTag" />
        <cod-2-tag v-if="VisibleTag === 'COD2'" :object-tag="ObjectTag" />
        <cod-3-tag v-if="VisibleTag === 'COD3'" :object-tag="ObjectTag" />
        <cod-4-tag v-if="VisibleTag === 'COD4'" :object-tag="ObjectTag" />
        <cod-5-tag v-if="VisibleTag === 'COD5'" :object-tag="ObjectTag" />
        <cod-6-tag v-if="VisibleTag === 'COD6'" :object-tag="ObjectTag" />
        <cod-7-tag v-if="VisibleTag === 'COD7'" :object-tag="ObjectTag" />
      </transition>
    </div>

    <!-- Modal molds -->
    <section>
      <b-modal
        id="tb-modal-mold"
        centered
        size="xl"
        header-bg-variant="dark"
        header-border-variant="warning"
        header-close-variant="light"
        header-class="small"
      >
        <div class="w-100 flex">
          <cod-1-mold
            v-if="VisibleTag === 'COD1'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-2-mold
            v-if="VisibleTag === 'COD2'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-3-mold
            v-if="VisibleTag === 'COD3'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-4-mold
            v-if="VisibleTag === 'COD4'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-5-mold
            v-if="VisibleTag === 'COD5'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-6-mold
            v-if="VisibleTag === 'COD6'"
            :list-tags-for-print="ListPrintTags"
          />
          <cod-7-mold
            v-if="VisibleTag === 'COD7'"
            :list-tags-for-print="ListPrintTags"
          />
        </div>

        <template v-slot:modal-footer>
          <b-btn
            variant="outline-danger"
            size="sm"
            class="font-weight-bold"
            @click="PrintTags()"
          >
            <i class="fas fa-file-pdf mr-1" />
            Gerar PDF
          </b-btn>

          <b-btn
            variant="danger"
            size="sm"
            class="font-weight-bold"
            @click="$bvModal.hide('tb-modal-mold')"
          >
            <i class="fas fa-ban mr-1" />
            Cancelar
          </b-btn>
        </template>
      </b-modal>

      <b-modal
        id="tb-modal-tags-print"
        centered
        size="xl"
        header-bg-variant="dark"
        header-border-variant="warning"
        header-close-variant="light"
        header-class="small"
        hide-footer
      >
        <b-table
          small
          bordered
          head-variant="dark"
          :fields="FieldsListPrintTags"
          :items="listPrintTags"
        >
          <!-- Code -->
          <template v-slot:cell(code)="data">
            <p v-if="RulesCreatTag.code" v-text="data.item.tag.code" />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- Code - End -->
          <!-- Description -->
          <template v-slot:cell(description)="data">
            <p
              v-if="RulesCreatTag.description"
              v-text="data.item.tag.description"
            />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- Description - End -->
          <!-- Location -->
          <template v-slot:cell(location)="data">
            <p v-if="RulesCreatTag.location" v-text="data.item.tag.location" />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- Location - End -->
          <!-- Type -->
          <template v-slot:cell(type)="data">
            <b-input
              v-if="RulesCreatTag.type"
              type="color"
              :value="data.item.tag.type === 'black' ? '#000' : '#FF0000'"
              disabled
              size="sm"
            />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- Type - End -->
          <!-- CodeMaker -->
          <template v-slot:cell(codeMaker)="data">
            <p
              v-if="RulesCreatTag.codeMaker"
              v-text="data.item.tag.codeMaker"
            />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- CodeMaker - End -->
          <!-- Image -->
          <template v-slot:cell(image)="data">
            <b-img
              v-if="RulesCreatTag.img"
              :src="data.item.tag.pathImg"
              width="50"
              center
              class="img-thumbnail"
            />
            <p v-else>
              <i class="fas fa-times-circle" />
            </p>
          </template>
          <!-- Image - End -->
          <!-- Quantity -->
          <template v-slot:cell(quantity)="data">
            <b-input-group size="sm">
              <b-input-group-prepend>
                <b-btn
                  variant="outline-dark"
                  :disabled="data.item.quantity === 1"
                  @click="--data.item.quantity"
                >
                  <i class="fas fa-minus" />
                </b-btn>
              </b-input-group-prepend>
              <b-input
                v-model="data.item.quantity"
                size="sm"
                type="number"
                class="text-center"
                @focusout="MaxValueNoOut(data.item)"
              />
              <b-input-group-append>
                <b-btn
                  variant="outline-dark"
                  :disabled="ListPrintTagsLength === QuantityTagPrint"
                  @click="++data.item.quantity"
                >
                  <i class="fas fa-plus" />
                </b-btn>
              </b-input-group-append>
            </b-input-group>
          </template>
          <!-- Quantity - End -->
          <!-- Menu -->
          <template v-slot:cell(menu)="data">
            <div class="flex h-100">
              <b-btn
                variant="danger"
                size="sm"
                @click="ListPrintTags.splice(data.item, 1)"
              >
                <i class="fas fa-trash" />
              </b-btn>
            </div>
          </template>
          <!-- Menu - End -->
        </b-table>
      </b-modal>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import COD1 from "./tag/COD1.vue";
import COD1MOLD from "./mold/COD1MOLD.vue";
import COD2 from "./tag/COD2.vue";
import COD2MOLD from "./mold/COD2MOLD.vue";
import COD3 from "./tag/COD3.vue";
import COD3MOLD from "./mold/COD3MOLD.vue";
import COD4 from "./tag/COD4.vue";
import COD4MOLD from "./mold/COD4MOLD.vue";
import COD5 from "./tag/COD5.vue";
import COD5MOLD from "./mold/COD5MOLD.vue";
import COD6 from "./tag/COD6.vue";
import COD6MOLD from "./mold/COD6MOLD.vue";
import COD7 from "./tag/COD7.vue";
import COD7MOLD from "./mold/COD7MOLD.vue";
import Tag from "~/src/model/Tag";
import PrintTag from "~/src/model/PrintTag";
import { WritePermission } from "~/src/controller/RulesWritingTags";
import CreatePdf from "~/src/controller/CreatePdf";

@Component({
  components: {
    "cod-1-tag": COD1,
    "cod-1-mold": COD1MOLD,
    "cod-2-tag": COD2,
    "cod-2-mold": COD2MOLD,
    "cod-3-tag": COD3,
    "cod-3-mold": COD3MOLD,
    "cod-4-tag": COD4,
    "cod-4-mold": COD4MOLD,
    "cod-5-tag": COD5,
    "cod-5-mold": COD5MOLD,
    "cod-6-tag": COD6,
    "cod-6-mold": COD6MOLD,
    "cod-7-tag": COD7,
    "cod-7-mold": COD7MOLD
  }
})
export default class TagsConstructor extends Vue {
  selectedTypeTag = "black";

  @Prop() visibleTag = "COD1";
  get VisibleTag() {
    return this.visibleTag;
  }

  get RulesCreatTag() {
    return WritePermission(this.visibleTag);
  }

  objectTag = new Tag();
  get ObjectTag() {
    return this.objectTag;
  }

  file = null;
  @Watch("file", { immediate: true })
  AlterFile() {
    this.objectTag.image = this.file;
  }

  @Watch("$store.state.moduleTag.Tag", { immediate: true })
  SetTagFindInLocalTag() {
    this.objectTag = this.$store.getters["moduleTag/GetTag"].tag ?? new Tag();
  }

  quantity = 1;
  get QuantityTagPrint() {
    switch (this.VisibleTag) {
      case "COD1":
        return 6;
      case "COD2":
        return 10;
      case "COD3":
        return 1;
      case "COD4":
        return 8;
      case "COD5":
        return 3;
      case "COD6":
        return 30;
      case "COD7":
        return 30;
      default:
        return 1;
    }
  }

  listPrintTags: Array<PrintTag> = [];
  fieldsListPrintTags = [
    {
      key: "code",
      label: "Cód.",
      class: "align-middle m-w80px text-center"
    },
    {
      key: "description",
      label: "Descrição",
      class: "align-middle text-center"
    },
    {
      key: "codeMaker",
      label: "Cód. Fab.",
      class: "align-middle m-w80px text-center"
    },
    {
      key: "location",
      label: "Endereço",
      class: "align-middle text-center"
    },
    {
      key: "type",
      label: "Borda",
      class: "align-middle m-w50px text-center"
    },
    { key: "image", label: "Img", class: "align-middle text-center" },
    {
      key: "quantity",
      label: "Qtd.",
      class: "align-middle m-w100px text-center"
    },
    { key: "menu", label: "", class: "align-middle" }
  ];
  get FieldsListPrintTags() {
    return this.fieldsListPrintTags;
  }

  get ListPrintTags() {
    return this.listPrintTags;
  }

  get ListPrintTagsLength() {
    return (
      this.listPrintTags
        .map((item: PrintTag) => parseInt(item.quantity.toString()))
        .reduce((a, c) => a + c, 0) ?? 0
    );
  }

  AddListPrintTags() {
    const base64: HTMLEmbedElement | null = document.querySelector(
      ".set-img-tag"
    );
    if (base64 !== null) {
      this.ObjectTag.pathImg = base64.src;
    }

    this.listPrintTags.push({ tag: this.ObjectTag, quantity: this.quantity });
    this.ClearObjectTag();
  }

  ClearObjectTag() {
    this.quantity = 1;
    this.objectTag = new Tag();
    this.objectTag.image = null;
    this.selectedBranch = 1;
    this.file = null;

    const base64: HTMLEmbedElement | null = document.querySelector(
      ".set-img-tag"
    );

    if (base64 !== null) {
      base64.src = require("../assets/no-image.png");
    }

    this.SetDimensionTagDefault(this.visibleTag);
  }

  MaxQuantityPrint() {
    if (this.quantity > this.QuantityTagPrint) {
      this.quantity = this.QuantityTagPrint;
    } else if (this.quantity <= 0) {
      this.quantity = 1;
    }
  }

  MaxValueNoOut(obj: PrintTag) {
    if (obj.quantity > this.QuantityTagPrint) {
      obj.quantity =
        this.QuantityTagPrint - (this.ListPrintTagsLength - obj.quantity);
    } else if (obj.quantity < 1) {
      obj.quantity = 1;
    }
  }

  async PrintTags() {
    try {
      await this.$store.dispatch("moduleTagWatcher/HowCreateTag", {
        CREATED_BY: parseInt(
          this.$store.getters["moduleAuthorization/GetCode"]
        ),
        PRODUCT_CODE: Array.from(
          new Set(this.listPrintTags.map(item => item.tag.code))
        ).toString(),
        CREATED_NAME: this.$store.getters["moduleAuthorization/GetUser"]
      });
    } finally {
      new CreatePdf().Print(this.VisibleTag);
    }
  }

  get Image() {
    return this.ObjectTag.pathImg ?? require("../assets/no-image.png");
  }

  selectedBranch = 1;
  get SelectedBranch() {
    return this.selectedBranch;
  }

  @Watch("objectTag.type", { immediate: true })
  AlterSelectedTypeTag() {
    if (this.objectTag.type === "red") {
      this.selectedBranch = 2;
    } else {
      this.selectedBranch = 1;
    }
  }

  @Watch("selectedBranch", { immediate: true })
  AlterSelected() {
    if (this.SelectedBranch === 2) {
      this.ObjectTag.type = "red";
    } else {
      this.ObjectTag.type = "black";
    }
  }

  branch = [
    { value: 1, text: "Estoque" },
    { value: 2, text: "Excedente" },
    { value: 3, text: "Filial" }
  ];

  async FindById() {
    await this.$store
      .dispatch("modulePcProdut/FindById", this.objectTag.code)
      .then(r => {
        const obj = new Tag();
        obj.code = r.CODPROD;
        obj.codeMaker = r.CODFAB;

        switch (this.selectedBranch) {
          case 1:
            obj.location = r.DESCRICAO4;
            break;
          case 2:
            obj.location = r.DESCRICAO5;
            obj.type = "red";
            break;
          case 3:
            obj.location = r.DESCRICAO7;
            break;
        }

        obj.description = r.DESCRICAO;
        this.objectTag = obj;
      })
      .finally(() => {
        this.SetDimensionTagDefault(this.visibleTag);
      });
  }

  @Watch("visibleTag", { immediate: true })
  AlterVisibleTag(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.listPrintTags = new Array<PrintTag>();
      this.objectTag = new Tag();

      this.SetDimensionTagDefault(newValue);
    }
  }

  SetDimensionTagDefault(tag: string) {
    const fs = new Tag().DimensionsTag(tag);
    this.objectTag.fsCode = fs.code;
    this.objectTag.fsCodeMaker = fs.codeMaker;
    this.objectTag.fsLocation = fs.location;
    this.objectTag.fsDescription = fs.description;
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
