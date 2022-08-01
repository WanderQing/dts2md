import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { addCode, addTitle } from './markdown';
import { getJsDoc, isArrowFunction } from './utils';

export interface Options {
  out: string;
  src: string;
}

export function generate(options: Options): void {
  const { out, src } = options;
  fs.readdirSync(src).forEach((item) => {
    if (/.d.ts$/.test(item)) {
      let fileName = path.resolve(src, item);
      const markdownName = path.basename(fileName, '.d.ts');
      const buffer = fs.readFileSync(fileName);
      const code = buffer.toString();
      const ast = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest);
      let content = '';
      ast.forEachChild((node) => {
        if (ts.isFunctionDeclaration(node) || isArrowFunction(node, code)) {
          let comment = getJsDoc(node);
          content = content + addTitle(comment);
          const statement = code.slice(node.modifiers.pos, node.end);
          content = content + addCode(statement.trim());
        }
      });
      const fullName = path.resolve(out, markdownName) + '.md';
      if (!fs.existsSync(out)) {
        fs.mkdirSync(out);
      }
      if (fs.existsSync(fullName)) {
        fs.unlinkSync(fullName);
      }
      fs.writeFileSync(fullName, content);
    }
  });
  return;
}
