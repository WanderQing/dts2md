import ts from 'typescript';
import { addCode, addTitle } from './markdown';

export function isArrowFunction(node, sourceCode: string): boolean {
  return (
    ts.isVariableStatement(node) &&
    sourceCode.slice(node.pos, node.end).includes('=>')
  );
}
export function getJsDoc(node: ts.Node): string {
  let comment: string;
  if (hasJsDoc(node)) {
    comment = parserJsDoc(node);
  } else {
    if (ts.isFunctionDeclaration(node)) {
      comment = node.name.escapedText.toString();
    }
    if (ts.isVariableStatement(node)) {
      let variable = node.declarationList.declarations[0];
      if (
        ts.isVariableDeclaration(variable) &&
        ts.isIdentifier(variable.name)
      ) {
        comment = variable.name.escapedText.toString();
      }
    }
  }
  return comment;
}
interface JsDoc {
  comment: string;
}
function parserJsDoc(node: ts.Node): string {
  const jsDocs: Array<JsDoc> = node['jsDoc'] as Array<JsDoc>;
  const lastJsDoc = jsDocs[jsDocs.length - 1];
  return lastJsDoc.comment.trim().split('\n')[0];
}
export function hasJsDoc(node: ts.Node): boolean {
  return Array.isArray(node['jsDoc']) && node['jsDoc'].length > 0;
}
export function getContent(node: ts.Node, code: string): string {
  let result: string = '';
  if (ts.isFunctionDeclaration(node) || isArrowFunction(node, code)) {
    let comment = getJsDoc(node);
    result = result + addTitle(comment);
    const statement = code.slice(node.modifiers.pos, node.end);
    result = result + addCode(statement.trim());
  }
  return result;
}
