// import * as yargs from 'yargs'
//
// export class CLI {
//   constructor() {
//     this.configureCLI()
//   }
//
//   private configureCLI(): void {
//     yargs
//       .scriptName('mongo-erd')
//       .usage('$0 <cmd> [args]')
//       .command(
//         'mongo-erd',
//         'Description: turns the given collection name into' +
//           ' a Entity JSON file.' +
//           ' The JSON' +
//           ' File will be saved in the given --outdir with the filename `${collectionName}.json`. The structure of the JSON' +
//           ' Object implements the following interface\n' +
//           'interface Entity {\n' +
//           '  collectionName: string // collection name\n' +
//           '  properties: Property[] // it`s properties\n' +
//           '}\n' +
//           'interface Property {\n' +
//           '  name: string // the property name\n' +
//           '  possibleTypes: PropertyType[] // types of possible values array\n' +
//           '  possibleValues: string[] // an array of possible values, useful for describing enums\n' +
//           '}\n' +
//           ' type PropertyType =' +
//           ' string' +
//           ' | enum' +
//           ' | undefined' +
//           ' | null' +
//           ' | date' +
//           ' | int' +
//           ' | float' +
//           ' | objectId' +
//           ' | boolean' +
//           ' | unknown',
//         // {'collectionName': {
//         //   type: 'string',
//         //   describe: 'A collection name to run build entity on',
//         // },
//         // 'all': {
//         //   type: 'boolean',
//         //   describe: 'If you want to build all db collections into entities',
//         // },
//         // 'outdir': {
//         //   type: 'string',
//         //   describe: 'A folder in which the entities.json files will be saved',
//         //   // demand: true
//         // } },
//         async (argv) => {
//           return
//         }
//       )
//       .help()
//   }
// }
