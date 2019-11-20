import { IEntity } from '@interfaces/IEntity'
import { IPropertyType } from '@interfaces/IPropertyType'
import { digraph } from 'graphviz'
import { resolve } from 'path'

export function convertEntitiesToDotLanguage(entities: IEntity[]) {
  const graph = digraph('1')
  for (const entity of entities) {
    const mapped: { [propName: string]: IPropertyType } = {}
    for (const property of entity.properties) {
      mapped[property.name] = property.types[0]
    }
    graph.addNode(entity.name, { label: JSON.stringify(mapped, undefined, 2).replace(/"/g, '') })

  }
  graph.output('png', resolve(__dirname + '.png'))
  return graph.to_dot()
}
