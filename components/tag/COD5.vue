<template>
  <div class="tag-center">
    <div class="tag-location m-2">
      <div class="location">
        <h1 :class="`text-${ObjectTag.fsLocation}`" v-text="Location" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Tag from "~/src/model/Tag";

@Component
export default class COD5 extends Vue {
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
.tag-location {
  background-image: url("../../assets/Location.png");
  width: 572px;
  height: 344px;
  background-repeat: no-repeat;
  background-size: cover;

  .location {
    height: 278px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;

    h1 {
      text-transform: uppercase;
    }
  }
}

.tag-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
