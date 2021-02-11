<template>
  <div>
    <header>
      <tb-header />
    </header>
    <main>
      <tb-body />
    </main>

    <tb-modals />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/Header.vue'
import BodyTagsBuilder from '~/components/BodyTagsBuilder.vue'
import ModalOpening from '~/components/ModalOpening.vue'

export default Vue.extend({
  components: {
    'tb-header': Header,
    'tb-body': BodyTagsBuilder,
    'tb-modals': ModalOpening
  }
})
</script>

<style lang="scss">
@import '../src/views/styles/index';
</style>
