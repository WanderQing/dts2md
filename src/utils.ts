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
    comment = node['jsDoc'][0]['comment'];
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
export function hasJsDoc(node: ts.Node): boolean {
  return Array.isArray(node['jsDoc']) && node['jsDoc'].length > 0;
}
