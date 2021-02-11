<template>
  <div id="tb-preview">
    <div
      id="tb-mold-0"
      key="key-0-mold"
      class="tb-mold"
    >
      <div v-for="(tag, position) in ListTagsForPrint" :key="`key-${position}-cell`" :class="`t${position}`">
        <tag-cod-3 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD3 from '~/components/tag/COD3.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: {
    'tag-cod-3': COD3
  }
})
export default class COD3MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
$row: 572px;
$column: 279px;

#tb-six-way-body {
  margin: 0 auto;
  width: 50%;
  min-width: 1120px;
}

.tb-mold {
  display: grid;
  grid-template-columns: 572px;
  grid-template-rows: 279px;
  grid-template-areas: "t0";
  grid-gap: 5px;

  @for $i from 1 through 1 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: $row;
      min-height: $column;
    }
  }
}
</style>
