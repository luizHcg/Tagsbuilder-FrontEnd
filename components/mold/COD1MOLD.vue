<template>
  <div id="tb-preview">
    <div
      id="tb-mold-0"
      key="key-0-mold"
      class="tb-mold"
    >
      <div v-for="(tag, position) in ListTagsForPrint" :key="`key-${position}-cell`" :class="`t${position}`">
        <tag-cod-1 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD1 from '~/components/tag/COD1.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: {
    'tag-cod-1': COD1
  }
})
export default class COD1MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
#tb-six-way-body {
  margin: 0 auto;
  width: 50%;
  min-width: 1094px;
}

.tb-mold {
  display: grid;
  grid-template-columns: 542px 542px;
  grid-template-rows: 244px 244px 244px;
  grid-template-areas: "t0 t1" "t2 t3" "t4 t5";
  grid-gap: 5px;

  @for $i from 1 through 6 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: 542px;
      min-height: 244px;
    }
  }
}
</style>
