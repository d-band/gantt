import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  output: {
    file: 'dist/gantt.js',
    format: 'umd',
    name: 'Gantt',
    exports: 'named'
  },
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', {
          modules: false
        }]
      ],
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          'pragma': 'h'
        }],
        '@babel/plugin-external-helpers',
        '@babel/plugin-transform-runtime'
      ],
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    })
  ]
};
