import { marked } from 'marked'

type Extension = marked.TokenizerExtension & marked.RendererExtension

const latexblock: Extension = {
  name: 'latexblock',
  level: 'block',
  start(src) {
    return src.match(/\$/)?.index!
  },
  tokenizer(src, tokens) {
    const rule = /^\$\$([^\n]+)\$\$(?:\n|$)/
    const match = rule.exec(src)
    if (match) {
      return {
        type: 'latexblock',
        raw: match[0],
        text: match[1].trim(),
        tokens: []
      }
    }
  },
  renderer(token) {
    return `<div data-katex>${ token.text }</div>`
  },
}

export default { extensions: [latexblock] }