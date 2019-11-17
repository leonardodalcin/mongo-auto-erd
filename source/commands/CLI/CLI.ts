#!/usr/bin/env node
import { getERD } from '@commands/getERD'
import * as yargs from 'yargs'
import { Argv } from 'yargs'

const argv = yargs
  .scriptName('mongo-erd')
  .options({
    db: { type: 'string', demandOption: true },
    outfile: { type: 'string', demandOption: true },
    uri: { type: 'string', demandOption: true }
  })
  .command(
    'mongo-erd',
    'Description: turns the given collection name into',
    async (args: Argv) => {
      await getERD(argv.uri, argv.db, argv.outfile)
    }
  )
  .usage('$0 <cmd> [args]').argv
