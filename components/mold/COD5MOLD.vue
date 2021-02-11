<template>
  <div id="tb-preview">
    <div
      id="tb-mold-0"
      key="key-0-mold"
      class="tb-mold"
    >
      <div v-for="(tag, position) in ListTagsForPrint" :key="`key-${position}-cell`" :class="`t${position}`">
        <tag-cod-5 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD5 from '~/components/tag/COD5.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: { 'tag-cod-5': COD5 }
})
export default class COD5MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
.tb-mold {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 * 1fr);
  grid-template-areas: "t0" "t1" "t2";
  grid-gap: 2px;

  @for $i from 1 through 3 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: 572px;
      min-height: 320px;
    }
  }
}
</style>
