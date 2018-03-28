import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  output: {
    file: 'dist/gantt.js',
    format: 'umd',
    name: 'Gantt',
    exports: 'named'
  },
  input: 'src/index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelrc: false,
      presets: [
        ['env', {
          modules: false
        }],
        'stage-2'
      ],
      plugins: [
        ['transform-react-jsx', {
          'pragma': 'h'
        }],
        'external-helpers',
        'transform-runtime'
      ],
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};
