import buble from 'rollup-plugin-buble';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  plugins: [
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
