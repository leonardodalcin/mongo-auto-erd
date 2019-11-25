import { IEntity } from '@interfaces/IEntity'
import { readFileSync } from 'fs'

export function importJSON(path: string): IEntity[] {
  return JSON.parse(readFileSync(path) as unknown as string)
}
