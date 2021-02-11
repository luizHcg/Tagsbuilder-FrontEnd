<template>
  <div>
    <div class="tag">
      <div class="location right">
        <p
          :class="`m-2 font-weight-bold text-uppercase text-${ObjectTag.fsLocation}`"
          v-text="!ObjectTag.location ? '00-00-00' : ObjectTag.location"
        />
      </div>
      <div class="description right">
        <p
          :class="`m-2 font-weight-bold text-${ObjectTag.fsDescription}`"
          v-text="!ObjectTag.description ? 'Sem descrição até o momento' : ObjectTag.description"
        />
      </div>
      <div class="code right">
        <p
          :class="`m-2 font-weight-bold text-${ObjectTag.fsCode}`"
          v-text="!ObjectTag.code ? 'COD: 000000' : `COD: ${ObjectTag.code}`"
        />
      </div>
      <div class="ref right">
        <p
          :class="`m-2 font-weight-bold text-${ObjectTag.fsCodeMaker}`"
          v-text="!ObjectTag.codeMaker ? 'REF: 000000' : `REF: ${ObjectTag.codeMaker}`"
        />
      </div>
      <div class="img right">
        <b-img
          class="set-img-tag"
          style="border-radius: 5px"
          :src="require('../../assets/no-image.png')"
          height="78px"
          width="auto"
          center
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'

@Component
export default class COD2 extends Vue {
  @Prop() private objectTag!: Tag

  private get ObjectTag () {
    return this.objectTag
  }
}
</script>

<style lang="scss" scoped>
@import "../../src/views/styles/index";

.m-lr {
  &.left {
    margin-left: 48px;
  }
  &.right {
    margin-right: 48px;
  }
}

.tag {
  background-image: url("../../assets/Image-black-lr-min.png");
  background-repeat: no-repeat;
  width: 222px;
  height: 278px;
  display: grid;
  grid-template-rows: 15% 35% 10% 10% 30%;
  grid-template-columns: 1fr;
  grid-template-areas: "l" "d" "c" "r" "i";

  .location {
    grid-area: l;
    @extend .m-lr, .flex;
  }

  .description {
    grid-area: d;
    @extend .m-lr, .flex;
  }

  .code {
    grid-area: c;
    @extend .m-lr, .flex;
  }

  .ref {
    grid-area: r;
    @extend .m-lr, .flex;
  }

  .img {
    grid-area: i;
    @extend .m-lr;
  }
}
</style>
