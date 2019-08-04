import buble from 'rollup-plugin-buble';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    typescript(),
    buble({ transforms: {asyncAwait: false}, objectAssign: 'Object.assign' }),
    terser(),
  ],
  external: ['react', 'react-dom'],
  output: [
    {
      file: 'dist/index.min.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.min.es.js',
      format: 'es',
    },
  ],
};
