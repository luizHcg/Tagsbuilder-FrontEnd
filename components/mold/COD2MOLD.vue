<template>
  <div id="tb-preview">
    <div
      id="tb-mold-0"
      key="key-0-mold"
      class="tb-mold"
    >
      <div v-for="(tag, position) in ListTagsForPrint" :key="`key-${position}-cell`" :class="`t${position}`">
        <tag-cod-2 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD2 from '~/components/tag/COD2.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: {
    'tag-cod-2': COD2
  }
})
export default class COD2MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
$row: 278px;
$column: 222px;

#tb-six-way-body {
  margin: 0 auto;
  width: 50%;
  min-width: 1120px;
}

.tb-mold {
  display: grid;
  grid-template-columns: $column $column $column $column $column;
  grid-template-rows: $row $row;
  grid-template-areas: "t0 t1 t2 t3 t4" "t5 t6 t7 t8 t9";
  grid-gap: 5px;

  @for $i from 1 through 10 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: $row;
      min-height: $column;
    }
  }
}
</style>
