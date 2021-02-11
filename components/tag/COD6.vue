<template>
  <div class="tb-tag">
    <div class="tb-tag-body">
      <div class="tb-tag-title font-weight-bold">
        COR./COL./APT.
      </div>
      <div :class="`tb-tag-location font-weight-bold text-uppercase text-${ObjectTag.fsLocation}`">
        {{ Location }}
      </div>
      <div class="tb-tag-img" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Tag from '~/src/model/Tag'

@Component
export default class COD6 extends Vue {
  @Prop() private objectTag!: Tag;

 private get ObjectTag() {
    return this.objectTag;
  }

  private get Location() {
    return this.ObjectTag.location ?? "loc-00";
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
    grid-template-rows: 40% 60%;
    grid-template-areas: "title img" "location img";

    .tb-tag-title {
      grid-area: title;
      @extend .flex;
      align-items: flex-end;
      font-size: 20px;
    }

    .tb-tag-location {
      grid-area: location;
      @extend .flex;
      align-items: flex-start;
    }

    .tb-tag-img {
      grid-area: img;
      margin-top: 8px;
      height: 80px;
      width: 95%;
      background-image: url('../../assets/arrow_up.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>
