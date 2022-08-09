import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { addTitle } from './markdown';
import { getContent } from './utils';

export interface Options {
  out: string;
  src: string;
  titleMap?: Record<string, string>;
}

export function generate(options: Options): void {
  const { out, src, titleMap } = options;
  fs.readdirSync(src).forEach((item) => {
    if (/.d.ts$/.test(item)) {
      let fileName = path.resolve(src, item);
      const markdownName = path.basename(fileName, '.d.ts');
      const buffer = fs.readFileSync(fileName);
      const code = buffer.toString();
      const ast = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest);
      let fileBody: string = '';
      ast.forEachChild((node) => {
        fileBody = fileBody + getContent(node, code);
      });
      let content: string = '';
      if (isNotEmptyContent(fileBody)) {
        if (titleMap && Object.keys(titleMap)) {
          let title = titleMap[markdownName]
            ? titleMap[markdownName]
            : markdownName;
          content = content + addTitle(title, 1);
        }
        content = content + fileBody;
      }
      writeMarkdown(content, out, markdownName);
    }
  });
}

function writeMarkdown(content: string, out: string, markdownName): void {
  if (isNotEmptyContent(content)) {
    const fullName = path.resolve(out, markdownName) + '.md';
    if (!fs.existsSync(out)) {
      fs.mkdirSync(out);
    }
    if (fs.existsSync(fullName)) {
      fs.unlinkSync(fullName);
    }
    fs.writeFileSync(fullName, content);
  }
}
function isNotEmptyContent(content: string): boolean {
  return content.trim().length > 0;
}
