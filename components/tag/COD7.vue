<template>
  <div class="tb-tag">
    <div class="tb-tag-body">
      <div :class="`tb-tag-location font-weight-bold text-uppercase text-${ObjectTag.fsLocation}`">
        {{ Location }}
      </div>
      <div :class="`tb-tag-code font-weight-bold text-${ObjectTag.fsCode}`">
        {{ Code }}
      </div>
      <div :class="`tb-tag-description font-weight-bold p-1 text-${ObjectTag.fsDescription}`">
        {{ Description }}
      </div>
      <div :class="`tb-tag-codeMaker font-weight-bold text-${ObjectTag.fsCodeMaker}`">
        {{ CodeMaker }}
      </div>
      <div class="tb-tag-img">
        <b-img fluid class="set-img-tag" center :src="Image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'

@Component
export default class COD7 extends Vue {
  @Prop() private objectTag!: Tag;

   private get ObjectTag () {
    return this.objectTag
  }

  private get Location () {
    return this.ObjectTag.location ?? 'loc-00'
  }

  private get Code () {
    return this.ObjectTag.code ?? '000000'
  }

  private get CodeMaker () {
    return this.ObjectTag.codeMaker ?? '000000'
  }

  private get Description () {
    return this.ObjectTag.description ?? 'Sem descrição até o momento'
  }

  private get Image () {
    return this.ObjectTag.pathImg ?? require('../../assets/no-image.png')
  }
}
</script>

<style lang="scss" scoped>
@import "../../src/views/styles/index";

$w: 247px;
$h: 104px;

.tb-tag {
  width: $w;
  height: $h;
  background-image: url("../../assets/LocationRack.png");

  .tb-tag-body {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 68% 32%;
    grid-template-rows: 30% 15% 40% 15%;
    grid-template-areas: "location img" "code img" "description img" "codeMaker img";

    .tb-tag-location {
      grid-area: location;
      @extend .flex;
    }

    .tb-tag-code {
      grid-area: code;
      @extend .flex;
      align-items: flex-start;
    }

    .tb-tag-description {
      grid-area: description;
      @extend .flex;
      align-items: flex-start;
    }

    .tb-tag-codeMaker {
      grid-area: codeMaker;
      @extend .flex;
      align-items: flex-start;
    }

    .tb-tag-img {
      grid-area: img;
       @extend .flex;
      .set-img-tag {
        max-width: 95%;
      }
    }
  }
}
</style>
