// https://github.com/luyilin/json-format-highlight

const defaultColors = {
  keyColor: '#ddd',
  numberColor: 'tomato',
  stringColor: 'limeGreen',
  trueColor: 'dodgerBlue',
  falseColor: 'dodgerBlue',
  nullColor: 'dodgerBlue'
}

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (html) {
  return String(html).replace(/[&<>"'`=]/g, function (s) {
      return entityMap[s];
  });
}

export default function (json, colorOptions = {}) {
  const valueType = typeof json
  if (valueType !== 'string') {
    json = JSON.stringify(json, null, 2) || valueType
  }
  let colors = Object.assign({}, defaultColors, colorOptions)
  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g, (match) => {
    let color = colors.numberColor
    let style = 'line-height: 1.4; font-size: calc(1rem*.8);'
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        color = colors.keyColor
      } else {
        color = colors.stringColor;
        match = '"' + escapeHtml(match.substr(1, match.length - 2)) + '"';
        // style = 'word-wrap:break-word;white-space:pre-wrap;';
      }
    } else {
      color = /true/.test(match)
        ? colors.trueColor
        : /false/.test(match)
          ? colors.falseColor
          : /null/.test(match)
            ? colors.nullColor
            : color
    }
    return `<span style="${style} color:${color}">${match}</span>`
  })
}