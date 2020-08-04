
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
      <v-container style="width:800px">
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
              <v-btn
                :loading="loading3"
                v-bind:disabled="disabled"
                color="blue-grey"
                class="ma-2 white--text float-right"
                @click="uploadFiles"
              >Subir Archivos</v-btn>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-file-input
                    multiple
                    label="Adjunta tus archivos"
                    v-bind="attrs"
                    v-on="on"
                    chips
                    outlined
                    :show-size="1000"
                    v-model="files"
                    @change="onChangeFileUpload"
                    class="left"
                    @click:clear="resetTemplate"
                  ></v-file-input>
                </template>
                <span>Solo archivos xlsx</span>
              </v-tooltip>
              <v-data-table
                :headers="headers"
                :items="tableContent"
                class="elevation-1"
                :items-per-page="5"
              >
                <template v-slot:item.models="{item}">
                  <v-select
                    :items="modelTypes"
                    label="Selecciona modelo"
                    @change="onChangeDropdown(item.id, $event)"
                  ></v-select>
                </template>
              </v-data-table>
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
      disabled: true,
      value: null,
      id: null,
      loader: null,
      loading3: false,
      files: null,
      selected: [],
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Tipo de modelo", value: "models" },
      ],
      tableContent: [],
      modelTypes: [
        "covid_resultado_indeterminado",
        "universidad_notif_curso_colaborador_5",
        "covid_demora_resultados3",
        "sk_notif_benef_campa1"
      ],
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  methods: {
    uploadFiles() {
      let thisContext = this;
      let formData = new FormData();
      let helper = this.files.map((file) => {
        return { name: file.name, model: file.model };
      });
      this.files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("models", JSON.stringify(helper));
      uploadService
        .uploadFile(formData)
        .then((res) => {
          if (res) {
            if (res === "ok")
              thisContext.$alertify.success("Archivo subido con exito");
            else if (res.includes("Can't find end of central directory")) {
              thisContext.$alertify.error(
                "Tipo de archivo no admitido, solo se admiten archivos xlsx"
              );
            } else
              thisContext.$alertify.error(
                "Hubo un problema al subir su archivo, por favor revise el formato permitido"
              );
          }
        })
        .catch((err) => {
          if (err.response.data.error === "jwt expired")
            thisContext.$alertify.confirm(
              "su sesion ha expirado, porfavor inicie sesion",
              () => {
                thisContext.$router.push("/");
              }
            );
        });
    },
    onChangeFileUpload() {
      const thisContext = this;
      thisContext.files.forEach((file, index) => {
        var fileType = file.name.substring(
          file.name.lastIndexOf(".") + 1,
          file.name.length
        );
        console.log(index);
        if (fileType !== "xls" && fileType !== "xlsx") {
          delete thisContext.files[index];
          thisContext.$alertify.error(
            `El archivo numero: ${index + 1} no es admitido`
          );
        } else if (fileType === "xls" || fileType === "xlsx") {
          this.tableContent.push({ name: file.name, id: index });
        }
      });

      this.validateUpload();
    },
    onChangeDropdown(index, model) {
      this.files[index].model = model;
      this.validateUpload();
    },
    validateUpload() {
      if (!this.files) {
        this.disabled = true;
      } else if (this.files.length > 0) {
        this.files.forEach((file) => {
          if (!file.model) {
            this.disabled = true;
            return;
          } else {
            this.disabled = false;
          }
        });
      } else {
        this.disabled = true;
      }
    },
    resetTemplate() {
      this.tableContent = [];
      this.validateUpload();
    },
  },
  computed: {
    ...mapGetters({
      infoUser: "uploadExcel/getInfoUser",
    }),
  },
};
</script>