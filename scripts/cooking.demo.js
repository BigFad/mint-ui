var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: path.join(__dirname, '../example/entry.js'),
    vendor: ['vue', 'vue-router', 'fastclick']
  },
  dist: './example/dist',
  template: path.join(__dirname, '../example/index.tpl'),
  devServer: {
    port: 8789,
    hostname: require('my-local-ip')(),
    publicPath: '/',
    log: false
  },

  clean: true,
  hash: true,
  publicPath: '/mint-ui/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: true,
  extends: ['vue', 'lint', 'saladcss']
});

cooking.add('resolve.alias', {
  'src': path.join(__dirname, '../src'),
  'mint-ui': path.join(__dirname, '..')
});

cooking.add('preLoader.js.exclude', /node_modules|lib/);
cooking.add('preLoader.vue.exclude', /node_modules|lib/);

if (process.env.NODE_ENV === 'production') {
  cooking.remove('entry.vendor');
  cooking.add('externals.vue', 'Vue');
  cooking.add('externals.vue-router', 'VueRouter');
  cooking.add('fastclick', 'FastClick');
}

module.exports = cooking.resolve();
