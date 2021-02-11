<template>
  <div id="tb-preview">
    <div id="tb-mold-0" key="key-0-mold" class="tb-mold">
      <div
        v-for="(tag, position) in ListTagsForPrint"
        :key="`key-${position}-cell`"
        :class="`t${position}`"
      >
        <tag-cod-7 :object-tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'
import PrintTag from '~/src/model/PrintTag'
import COD7 from '~/components/tag/COD7.vue'
import CreateListTagsForPrint from '~/src/controller/CreateListTagsForPrint'

@Component({
  components: {
    'tag-cod-7': COD7
  }
})
export default class COD7MOLD extends Vue {
  private objectTag = new Tag();

  @Prop() private listTagsForPrint!: Array<PrintTag>;

  private get ListTagsForPrint () {
    return CreateListTagsForPrint(this.listTagsForPrint)
  }
}
</script>

<style lang="scss" scoped>
$row: 104px;
$column: 247px;

.tb-mold {
  display: grid;
  grid-template-columns: repeat(3 * 247px);
  grid-template-rows: repeat(10 * 104px);
  grid-template-areas: "t0 t1 t2" "t3 t4 t5" "t6 t7 t8" "t9 t10 t11" "t12 t13 t14" "t15 t16 t17" "t18 t19 t20" "t21 t22 t23" "t24 t25 t26" "t27 t28 t29";
  grid-gap: 2px;

  @for $i from 1 through 30 {
    .t#{$i} {
      grid-area: t#{$i};
      min-width: 247px;
      min-height: 104px;
    }
  }
}
</style>
