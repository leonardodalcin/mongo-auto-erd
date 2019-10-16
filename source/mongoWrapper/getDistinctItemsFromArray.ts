export function getDistinctItems(items: any[]) {
  return items.filter(function(
    value,
    index,
    self
  ) {
    return self.indexOf(value) === index
  })
}
