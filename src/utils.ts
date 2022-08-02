import ts from 'typescript';

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
