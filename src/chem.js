export function chemicalname(name) {
  name = name.replace(/[\d]/g, function (num) {
    return "<sub>" + num + "</sub>"
  })
  name = name.replace(/(\+|-)/g, function (num) {
    return "<sup>" + num + "</sup>"
  })
  name = name.replace(/<sub>[\d]<\/sub><sup>(\+|-)<\/sup>/g, function (num) {
    return "<sup>" + num.replace(/<\/?su(b|p)>/g, "") + "</sup>"
  })
  return name
}

export function scicount(value, num) {
  const format = require('string-format')
  format.extend(String.prototype, {});
  if (value == 0) return value
  var p = Math.floor(Math.log(Math.abs(value)) / Math.LN10)
  var n = value * Math.pow(10, -p)
  return n.toFixed(num) + (p == 0 ? "" : "×10<sup>{0}</sup>".format(p))
}
