import buble from 'rollup-plugin-buble';
import copy from 'rollup-plugin-copy-glob';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    copy([{files: 'src/**/*.{sass,scss}', dest: 'dist'}], {verbose: true}),
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
