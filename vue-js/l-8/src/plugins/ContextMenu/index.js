export default {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$contextMenu = {
      EventBus: new Vue(),
      show(settings) {
        this.EventBus.$emit('show', settings);
      },

      hide() {
        this.EventBus.$emit('hide');
      },
    };
  },

};
