import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2ed1cc',
                secondary: '#b0c4c5',
                accent: '#8cd7ff',
                error: '#c94040',
                white: '#ffffff',
            },
        },
    },
});
