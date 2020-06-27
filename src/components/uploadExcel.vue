
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div style="height: 100vh" align="center" justify-xl="center">
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
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-file-input
                    multiple
                    label="Adjunta tus archivos"
                    v-bind="attrs"
                    v-on="on"
                    chips
                    show-size
                    v-model="files"
                  ></v-file-input>
                </template>
                <span>Solo archivos xlsx</span>
              </v-tooltip>

              <v-icon>mdi-account_circle</v-icon>
              <v-btn
                :loading="loading3"
                :disabled="loading3"
                color="blue-grey"
                class="ma-2 white--text"
                @click="uploadFiles"
              >
                Subir
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import uploadService from "../services/uploadExcel";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loader: null,
      loading3: false,
      files: null
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    uploadFiles() {
      let globalContext = this;
      console.log(this.infoUser);
      uploadService
        .uploadFile(this.files)
        .then(res => {
          if (res) {
            if (res === "ok")
              globalContext.$alertify.success("Archivo subido con exito");
            else if (res.includes("Can't find end of central directory")) {
              globalContext.$alertify.error(
                "Tipo de archivo no admitido, solo se admiten archivos xlsx"
              );
            } else
              globalContext.$alertify.error(
                "Hubo un problema al subir su archivo, por favor revise el formato permitido"
              );
          }
        })
        .catch(err => {
          if (err.response.data.error === "jwt expired")
            globalContext.$alertify.confirm(
              "su sesion ha expirado, porfavor inicie sesion",
              () => {
                globalContext.$router.push("/");
              }
            );
        });
    }
  },
  computed: {
    ...mapGetters({
      infoUser: "uploadExcel/getInfoUser"
    })
  }
};
</script>