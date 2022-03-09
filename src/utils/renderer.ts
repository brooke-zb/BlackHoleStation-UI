import store from '@/utils/store'

const renderer = {
  options: {},
  code: (code: string, language: string) => {
    return `<div class="code-block"><div class="code-lang">${ language }</div><pre class="line-numbers"><code class="language-${ language }">${ code }</code></pre></div>`
  },

  blockquote: (quote: string) =>
    `<blockquote class="blockquote">${ quote }</blockquote>\n`,

  // html: (html: string) => html,
  heading: (text: string, level: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (level < 4) {
      let id = store.addAnchor(text, level)
      return `<h${ level } id="${ id }" class="heading">${ text }</h${ level }>\n`
    } else {
      return `<h${ level } class="heading">${ text }</h${ level }>\n`
    }
  },

  hr: () => '<hr class="hr"/>\n',

  list: (body: string, ordered: boolean, start: number) => {
    let type = ordered ? 'ol' : 'ul'
    let _class = body.indexOf('<input type="checkbox"') != -1 ? 'class="checklist"' : 'class="list"'
    let startatt = (ordered && start !== 1) ? ('start="' + start + '"') : ''
    return `<${ type } ${ startatt } ${ _class }>${ body }</${ type }>\n`
  },

  listitem: (text: string) => `<li>${ text }</li>\n`,

  checkbox: (checked: boolean) =>
    `<input type="checkbox" ${ checked ? 'checked' : '' } disabled />`,

  paragraph: (text: string) => `<p class="p">${ text }</p>`,

  table: (header: string, body: string) => {
    if (body)
      body = `<tbody>${ body }</tbody>`
    return `<table class="table">\n<thead>${ header }</thead>\n${ body }</table>\n`
  },

  tablerow: (content: string) => `<tr>${ content }</tr>\n`,

  tablecell: (content: string, flags: { header: boolean, align: string }) => {
    let type = flags.header ? 'th' : 'td'
    let tag = flags.align ? `<${ type } align="${ flags.align }">` : `<${ type }>`
    return `${ tag }${ content }</${ type }>\n`
  },

  strong: (text: string) => `<b>${ text }</b>`,

  em: (text: string) => `<em>${ text }</em>`,

  codespan: (code: string) => `<code>${ code }</code>`,

  br: () => '<br/>',

  del: (text: string) => `<del>${ text }</del>`,

  link: (href: string, title: string, text: string) =>
    `<a href="${ href }" class="link" ${ title ? 'title="' + title + '"' : '' }>${ text }</a>`,

  image: (href: string, title: string, text: string) => {
    let _title = title ? `title="${ title }"` : ''
    let _text = text ? `alt="${ text }"` : ''
    return `<div class="flex justify-center"><img class="cursor-pointer max-w-4xl min-w-0" data-gallery data-src="${ href }" ${ _title } ${ _text }></div>`
  },
  // text: (text: string) => text,
}

export default Object.assign(new marked.Renderer(), renderer)