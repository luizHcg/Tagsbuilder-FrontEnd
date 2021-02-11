<template>
  <div>
    <b-form @submit.prevent="Authorization">
      <b-container fluid class="m-0 p-0">
        <b-row class="m-0 p-0">
          <b-col class="m-0 p-0">
            <div class="logo">
              <span>
                <i class="fas fa-tags border p-2 border-radius-default bg-warning text-white" />
                <b class="text-white">
                  Tags<span class="text-warning font-italic font-weight-bolder">Builder</span>
                </b>
              </span>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mb-n3 mt-3">
            <h3 class="text-white">
              <em>Login</em>
            </h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- User -->
            <b-col class="p-0 m-0 mt-3">
              <b-form-group label="Usuário" label-class="mb-n1 text-white font-weight-bold">
                <b-input-group size="sm">
                  <b-input-group-prepend is-text>
                    <i class="fas fa-user" />
                  </b-input-group-prepend>
                  <b-input v-model="login" type="number" required />
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- User - End -->
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- Password -->
            <b-col class="p-0 m-0">
              <b-form-group label="Senha" label-class="mb-n1 text-white font-weight-bold">
                <b-input-group size="sm">
                  <b-input-group-prepend is-text>
                    <i class="fas fa-key" />
                  </b-input-group-prepend>
                  <b-input v-model="password" type="password" required />
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- Password - End -->
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-btn block size="sm" variant="warning" class="mt-5 font-weight-bolder text-white" type="submit">
              <i class="fas fa-sign-in-alt mr-1" /> Login
            </b-btn>

            <b-btn
              block
              size="sm"
              variant="secondary"
              class="font-weight-bolder"
              @click="$bvModal.hide('tb-modal-authentication-user')"
            >
              <i class="fas fa-sign-out-alt mr-1" /> Cancelar
            </b-btn>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AuthenticationUser extends Vue {
  private login = ''
  private password = ''
  async Authorization () {
    await this.$store.dispatch('moduleAuthorization/Authorization', { login: parseInt(this.login), password: this.password })
      .then(() => {
        location.reload()
      })
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 42px;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
