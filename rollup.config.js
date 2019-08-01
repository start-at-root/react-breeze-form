import buble from 'rollup-plugin-buble';
import copy from 'rollup-plugin-copy-glob';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
    copy([
      { files: 'src/**/*.{sass,scss}', dest: 'dist' },
    ], { verbose: true }),
    typescript(),
    buble({ transforms: { asyncAwait: false }, objectAssign: 'Object.assign' }),
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
