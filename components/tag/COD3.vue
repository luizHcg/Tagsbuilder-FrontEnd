<template>
  <div>
    <div :class="`tb-tag ${ObjectTag.type}`">
      <div class="tb-tag-body">
        <div class="tb-img-location" style="max-width: 314px">
          <h1
            :class="`tb-text text-uppercase text-nowrap text-${ObjectTag.fsLocation}`"
            v-text="!ObjectTag.location ? '00-00-00' : ObjectTag.location"
          />
        </div>
        <div class="tb-img-code">
          <p :class="`tb-text text-${ObjectTag.fsCode}`" v-text="!ObjectTag.code ? '000000' : ObjectTag.code" />
        </div>
        <div class="tb-img-description">
          <p
            :class="`tb-text m-1 text-${ObjectTag.fsDescription}`"
            v-text="!ObjectTag.description ? 'Sem descrição até o momento.' : ObjectTag.description"
          />
        </div>
        <div class="tb-img-reference">
          <p
            :class="`tb-text text-uppercase text-${ObjectTag.fsCodeMaker}`"
            v-text="!ObjectTag.codeMaker ? '000000' : ObjectTag.codeMaker"
          />
        </div>
        <div class="tb-img">
          <b-img fluid class="tb-tag-img border-radius-default set-img-tag" :src="Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'

@Component
export default class COD3 extends Vue {
  @Prop() private objectTag!: Tag;
  private baseImgPath = process.env.VUE_APP_IMG_PATH_BASE;

  private get ObjectTag () {
    return this.objectTag
  }

  private get Image () {
    return this.ObjectTag.pathImg ?? require('../../assets/no-image.png')
  }
}
</script>

<style lang="scss" scoped>
@import "../../src/views/styles/index";

.tb-tag {
  height: 279px;
  width: 572px;

  @extend .flex;
  align-items: flex-end;

  .tb-tag-body {
    height: 279px;
    width: 572px;

    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: 40% 15% 30% 15%;
    grid-template-areas: "location img" "code img" "description img" "reference img";

    .tb-img-location {
      grid-area: location;
      @extend .flex;
      margin: 8px 3px 0 8px;
    }

    .tb-img-code {
      grid-area: code;
      @extend .flex;
      margin: 5px 3px 0 8px;

      .tb-text {
        font-weight: bold;
      }
    }

    .tb-img-description {
      grid-area: description;
      @extend .flex;
      align-items: flex-start;
      margin: 5px 3px 0 8px;

      .tb-text {
        font-weight: bold;
      }
    }

    .tb-img-reference {
      grid-area: reference;
      @extend .flex;
      margin: 5px 3px 8px 8px;

      .tb-text {
        font-weight: bold;
      }
    }

    .tb-img {
      grid-area: img;
      margin: 10px;
      @extend .flex;

      .tb-tag-img {
        width: 100%;
        height: auto;
      }
    }
  }

  &.red {
    background-image: url("../../assets/FullSize-Red.png");
  }

  &.black {
    background-image: url("../../assets/FullSize-Black.png");
  }
}
</style>
