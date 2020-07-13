<template>
  <div style="height: 100vh" align="center" justify-xl="center">
    <v-bottom-sheet v-model="sheet" persistent>
      <template v-slot:activator="{ on }">
        <v-card class="d-inline-block mt-50 margenLogin">
          <v-container>
            <v-row>
              <v-col>
                <div>
                  <img class="logo" src="../assets/imgs/logo.svg" />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-5">
                <v-form ref="form" lazy-validation>
                  <v-icon>mdi-account_circle</v-icon>
                  <v-text-field
                    @keypress="validar"
                    @mousemove="validar"
                    prepend-icon="mdi-account-circle"
                    v-model="user"
                    outlined
                    label="Usuario"
                    required
                  ></v-text-field>

                  <v-text-field
                    @keypress="validar"
                    @mousemove="validar"
                    @keypress.enter="login"
                    v-model="pass"
                    prepend-icon="mdi-lock"
                    label="Contraseña"
                    required
                    outlined
                    type="password"
                  ></v-text-field>
                  <v-btn color="primary" text class="mr-4" v-on="on">Olvidé la constraseña</v-btn>
                  <br />
                  <v-btn
                    :disabled="!valid||loading"
                    color="success"
                    class="mr-4"
                    @click="login"
                    :loading="loading"
                  >Acceder</v-btn>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-alert prominent type="warning" class="alertLogin" v-if="alert" dismissible>
                <v-row align="center">
                  <v-col class="grow">Usuario o contraseña incorrecto</v-col>
                </v-row>
              </v-alert>
              <v-alert prominent type="danger" class="alertLogin" v-if="status" dismissible>
                <v-row align="center">
                  <v-col class="grow">{{this.error}}</v-col>
                </v-row>
              </v-alert>
            </v-row>
          </v-container>
        </v-card>
      </template>

      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" flat dark color="indigo" @click="sheet = !sheet">Aceptar</v-btn>
        <div class="py-3">
          Para recuperar tu contraseña será necesario acudir al
          <a
            href="http://csi.sisprevencion.org/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >SisPrevencion.org</a>
          <br />Ó contactarse con
          <a
            href="mailto:mesadeayuda@salud-digna.org"
            target="_blank"
          >Mesa de ayuda</a>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import LoginService from "../services/login";
export default {
  name: "login",
  data() {
    return {
      valid: false,
      error: null,
      alert: false,
      status: false,
      user: null,
      pass: null,
      sheet: false,
      loading: false,
      local: localStorage.getItem("tema")
    };
  },
  components: {
    //
  },
  created() {
    localStorage.clear();
  },
  methods: {
    ...mapActions({
      updateUserInfo: "uploadExcel/updateUserInfo"
    }),
    validar() {
      if (
        this.user !== null &&
        this.pass !== null &&
        this.user !== "" &&
        this.pass !== ""
      ) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    },
    login() {
      this.loading = true;
      LoginService.login(this.user.toLowerCase(), this.pass)
        .then(res => {
          if (res.status) {
            let datosUser = {
              id: res.data.usuario.id,
              name: res.data.usuario.name,
              email: res.data.usuario.email,
              token: res.data.usuario.token
            };
            this.updateUserInfo(datosUser);
            sessionStorage.setItem("user-token", datosUser.token);
            this.$router.push("cargaDeExcel");
          } else {
            this.alert = true;
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          if (err.message === "Network Error") {
            this.$alertify.error("No hay conexión con el servidor");
          } else if (err.response.status === 400) {
            this.$alertify.error("Usuario o contraseña incorrecto");
          } else {
            this.$alertify.error(err.response.err);
          }
        });
    }
  }
};
</script>