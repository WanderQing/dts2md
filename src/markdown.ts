export enum Language {
  TS = 'typescript',
  JS = 'javascript',
}
export function addCode(
  code: string,
  language: Language = Language.TS
): string {
  let result = '';
  if (code) {
    const start = '\n```' + language + '\n';
    const end = '\n```\n';
    result = start + code + end;
  }
  return result;
}
export function addTitle(title: string, level: number = 2) {
  let prefix = getTitlePrefix(level) + ' ';
  return prefix + title + '\n';
}
export function getTitlePrefix(level: number): string {
  switch (level) {
    case 1:
      return '#';
    case 2:
      return '##';
    case 3:
      return '###';
    case 4:
      return '####';
    default:
      return '#####';
  }
}
