<template>
  <div id="tb-preview">
    <div
      id="tb-mold-0"
      key="key-0-mold"
      class="tb-mold"
    >
      <div v-for="(tag, position) in ListTagsForPrint" :key="`key-${position}-cell`" :class="`t${position}`">
        <tag-cod-4 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD4 from '~/components/tag/COD4.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: {
    'tag-cod-4': COD4
  }
})
export default class COD4MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
$row: 229px;
$column: 285px;

#tb-six-way-body {
  margin: 0 auto;
  width: 50%;
  min-width: 1094px;
}

.tb-mold {
  display: grid;
  grid-template-columns: $column $column;
  grid-template-rows: $row $row $row;
  grid-template-areas: "t0 t1" "t2 t3" "t4 t5" "t6 t7";
  grid-gap: 2px;

  @for $i from 1 through 8 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: 285px;
      min-height: 229px;
    }
  }
}
</style>
