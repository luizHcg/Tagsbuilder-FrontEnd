<template>
  <div>
    <div class="tag">
      <div class="location-1 text-danger text-uppercase font-weight-bold">
        <p
          :class="`text-${ObjectTag.fsLocation}`"
          v-text="Location"
        />
      </div>
      <div class="location-2 text-danger text-uppercase font-weight-bold">
        <p
          :class="`text-${ObjectTag.fsLocation}`"
          v-text="Location"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Tag from "~/src/model/Tag";

@Component
export default class COD4 extends Vue {
  @Prop() private objectTag!: Tag;

  private get ObjectTag() {
    return this.objectTag;
  }

  private get Location () {
    return this.ObjectTag.location ?? 'loc-00'
  }
}
</script>

<style lang="scss" scoped>
.m-lr {
  &.left {
    margin-left: 48px;
  }
  &.right {
    margin-right: 48px;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  background-image: url("../../assets/Location-rack.png");
  background-repeat: no-repeat;
  width: 285px;
  height: 229px;
  display: grid;
  grid-template-rows: 90px 90px;
  grid-template-columns: 1fr;
  grid-template-areas: "l1" "l2";

  .location-1 {
    grid-area: l1;
    margin-top: 44px;
    margin-bottom: -44px;
    @extend .flex;
  }

  .location-2 {
    grid-area: l2;
    margin-top: 54px;
    margin-bottom: -44px;
    @extend .flex;
  }
}
</style>
