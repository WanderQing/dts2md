import { generate } from './src/generator';
import * as path from 'path';

generate({
  src: path.resolve(__dirname, '__test__'),
  out: path.resolve(__dirname, 'docs'),
});
