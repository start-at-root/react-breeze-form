import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  plugins: [typescript(), terser()],
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
