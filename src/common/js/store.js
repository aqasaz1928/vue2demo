export function saveToLocal (id, key, value) {
  let seller = localStorage.__seller__ || '{}'
  seller = JSON.parse(seller)
  seller[id] = seller[id] || {}
  seller[id][key] = value
  localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal (id, key, def) {
  console.log(id)
  let res = def
  let seller = localStorage.__seller__ || '{}'
  seller = JSON.parse(seller)
  if (seller[id]) {
    if (seller[id][key]) {
      res = seller[id][key]
    }
  }
  return res
}

