module.exports = function(cfg) {
  cfg.output.library = 'Gantt';
  cfg.output.libraryTarget = 'umd';
  cfg.babel.plugins.push(require.resolve('babel-plugin-transform-runtime'));
  return cfg;
}