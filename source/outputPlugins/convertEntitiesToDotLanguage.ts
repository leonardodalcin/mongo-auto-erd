import { IEntity } from '@interfaces/IEntity'
import { digraph } from 'graphviz'
import { resolve } from 'path'

function entityToNodeLabel(entity: IEntity) {
  const propLabels = entity.properties.map((property) => {
    return `${property.name} : ${property.types[0]}`
  })
  const label = `{${entity.name} | ${propLabels.reduce(
    (previousValue = '', currentValue) => {
      return `${previousValue}\\l${currentValue}`
    }
  )}}`
  return label
}
export function convertEntitiesToDotLanguage(entities: IEntity[]) {
  const graph = digraph('1')
  for (const entity of entities) {
    graph.addNode(entity.name, {
      shape: 'record',
      label: entityToNodeLabel(entity)
    })
  }
  graph.output('png', resolve(__dirname + '.png'))
  graph.output('dot', resolve(__dirname + '.dot'))
  graph.output('svg', resolve(__dirname + '.svg'))
  graph.output('xml', resolve(__dirname + '.xml'))

  return graph.to_dot()
}
