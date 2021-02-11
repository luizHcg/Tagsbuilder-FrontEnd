<template>
  <div>
    <b-modal
      id="tb-modal-authentication-user"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      header-bg-variant="dark"
      header-border-variant="dark"
      header-close-variant="light"
      body-bg-variant="dark"
      hide-header-close
    >
      <tb-authentication-user />
    </b-modal>

    <b-modal
      id="tb-modal-db-find"
      size="xl"
      centered
      hide-footer
      no-close-on-esc
      header-bg-variant="dark"
      header-border-variant="warning"
      header-close-variant="light"
    >
      <tb-db-find />
    </b-modal>

    <b-modal
      id="tb-modal-tag-watcher-view"
      size="xl"
      centered
      hide-footer
      no-close-on-esc
      header-bg-variant="dark"
      header-border-variant="warning"
      header-close-variant="light"
    >
      <tb-tag-watcher-view />
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AuthenticationUser from './AuthenticationUser.vue'
import DBFind from './DBFind.vue'
import TagWatcherView from './TagWatcherView.vue'

@Component({
  components: {
    'tb-authentication-user': AuthenticationUser,
    'tb-db-find': DBFind,
    'tb-tag-watcher-view': TagWatcherView
  }
})
export default class ModalOpening extends Vue {}
</script>

<style lang="scss" scoped>
</style>
