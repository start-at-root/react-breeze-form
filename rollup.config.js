import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    builtins(),
    typescript(),
    external(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers',
        'env',
        'react',
        'syntax-async-functions'
      ],
    }),
    buble({ transforms: { asyncAwait: false }, objectAssign: 'Object.assign' }),
    commonjs()
  ],
  external: [
    'react-dom',
    'react-hook-form',
    'react-i18next',
    'react-select',
    'react',
    'reactstrap'
  ],
  output: [
    {
      file: 'dist/index.jsx',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.jsx',
      format: 'es',
    },
  ],
};
