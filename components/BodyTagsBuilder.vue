<template>
  <div>
    <div v-if="$store.getters['moduleAuthorization/GetUser'] !== undefined">
      <div class="tb-body-scoped m-5 border shadow">
        <section id="tb-menu-selected-tag" class="tb-body-menu p-3">
          <div>
            <b-form-group label="Lista de etiquetas:" label-class="mb-n2">
              <b-form-radio-group
                v-model="selected"
                :options="options"
                buttons
                size="sm"
                class="btn-block"
                button-variant="light"
                stacked
                name="radio-btn-stacked"
              />
            </b-form-group>
            <details>
              <summary>Detalhes</summary>
              <section>
                <p>
                  Numeração no final do nome das etiquetas significão, linhas
                  por colunas
                </p>
              </section>
            </details>
          </div>
        </section>
        <section class="tb-tags-body p-3 border-left">
          <tb-tags-constructor :visible-tag="selected" />
        </section>
      </div>
    </div>

    <div v-else class="w-100 flex border p-3">
      <b-btn v-b-modal.tb-modal-authentication-user variant="link" size="sm">
        <span class="h1 text-dark">
          Fassa o <em class="text-danger">login</em> para cotinuar
        </span>
        <br />
        <span>
          <small class="font-weight-bold text-dark">Clique áqui!</small>
        </span>
      </b-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Tag from "~/src/model/Tag";
import TagsConstructor from "./TagsConstructor.vue";

@Component({
  components: {
    "tb-tags-constructor": TagsConstructor
  }
})
export default class BodyTagsBuilder extends Vue {
  selected = "COD1";

  options = [
    { text: "Informativa c/ imagem (2x3)", value: "COD1" },
    { text: "Informativa lateral c/ imagem (2x5)", value: "COD2" },
    { text: "Informativa c/ imagem (1x1)", value: "COD3" },
    { text: "Edentificação local dobraveis (2x4)", value: "COD4" },
    { text: "Edentificação local (1x3)", value: "COD5" },
    { text: "Edentificação estreita (3x10)", value: "COD6" },
    { text: "Edentificação estreita c/ image (3x10)", value: "COD7" }
  ];
}
</script>

<style lang="scss" scoped>
.tb-body-scoped {
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 1fr;
  grid-template-areas: "menu tag-constructor";

  .tb-body-menu {
    grid-area: menu;
  }

  .tb-tags-body {
    grid-area: tag-constructor;
  }
}
</style>
