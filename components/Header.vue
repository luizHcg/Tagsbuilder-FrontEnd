<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      class="border-bottom border-warning"
    >
      <b-navbar-brand>
        <i class="fas fa-tags border p-2 border-radius-default bg-warning" />
        <b>
          Tags<span class="text-warning font-italic font-weight-bolder"
            >Builder</span
          >
        </b>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-b-modal:tb-modal-db-find>
            <span>
              <i class="fas fa-dolly-flatbed" />
              Localização de produtos
            </span>
          </b-nav-item>

          <b-nav-item v-if="Permission()" v-b-modal:tb-modal-tag-watcher-view>
            <span>
              <i class="fas fa-chart-pie" />
              Verificar atividades
            </span>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.tb-modal-authentication-user>
            <span>
              <i class="fas fa-user mr-1" />
              <em>{{ UserOn }}</em>
            </span>
          </b-nav-item>
          <b-nav-item
            v-if="$store.getters['moduleAuthorization/GetUser'] !== undefined"
            @click="SingOff()"
          >
            <i
              class="fas fa-power-off btn-danger p-1 ml-2"
              style="font-size: 20px; border-radius: 20px"
            />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Header extends Vue {
  get UserOn() {
    return this.$store.getters["moduleAuthorization/GetUser"] ?? "Login";
  }

  SingOff() {
    this.$store.dispatch("moduleAuthorization/ClearAuthorization").then(() => {
      location.reload();
    });
  }

  Permission() {
    return (
      this.$store.getters["moduleAuthorization/GetType"] !== undefined &&
      this.$store.getters["moduleAuthorization/GetType"] !== 2
    );
  }
}
</script>

<style lang="scss"></style>
