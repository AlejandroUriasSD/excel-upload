import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import es from 'vuetify/es5/locale/es'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify, {
    iconfont: 'mdi'
});

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.lighten3,
        },
      },
    },
    lang: {
      locales: { es },
      current: 'es'
    },
    customProperties: true,
});

