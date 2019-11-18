[![Test Coverage](https://api.codeclimate.com/v1/badges/16064394f798d92ffc0f/test_coverage)](https://codeclimate.com/github/leonardodalcin/mongo-auto-erd/test_coverage)
<a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>
# mongo-auto-erd
This is an Entity Relationship Diagram generator for MongoDB databases. Given a connection url, it performs reverse engineering by map reducing db collections into a well defined interface with properties and it's relationships.

## Usage
`mongo-erd --uri mongodb://127.0.0.1:27017 --db dbname --outfile ./erd`

This command will produce a result like: https://github.com/leonardodalcin/mongo-auto-erd/blob/master/erd.json
