#!/usr/bin/env node
// tslint:disable-next-line:no-require-imports no-var-requires
require('module-alias/register')
import { getERD } from '@commands/getERD'
import * as yargs from 'yargs'

(async () => {
  process.on('unhandledRejection', up => {
    throw up
  })
  const argv = yargs.options({
    db: { type: 'string', demandOption: true },
    outfile: { type: 'string', demandOption: true },
    uri: { type: 'string', demandOption: true }
  }).argv
  await getERD(argv.uri, argv.db, argv.outfile)
  process.exit(0)
})()
