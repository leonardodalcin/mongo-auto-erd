module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '3.6.10',
      skipMD5: true
    },
    autoStart: true
  }
}
