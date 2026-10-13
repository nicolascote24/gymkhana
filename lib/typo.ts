// French typography: non-breaking spaces before high punctuation and inside
// guillemets, so "!" or "»" never start a line.
const NBSP = " ";
const NNBSP = " ";

export function fr(text: string): string {
  return text
    .replace(/ ([!?;])/g, `${NNBSP}$1`)
    .replace(/ :/g, `${NBSP}:`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/(\d) (\$|h\b|%)/g, `$1${NBSP}$2`)
    .replace(/(\d) h (\d)/g, `$1${NBSP}h${NBSP}$2`);
}
