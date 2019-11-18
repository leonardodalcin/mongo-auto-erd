"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getERDOracle = [
    {
        "name": "users",
        "properties": [
            {
                "name": "__v",
                "types": [
                    "number",
                    "number",
                    "number"
                ],
                "values": [
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "_id",
                "types": [
                    "objectId",
                    "objectId",
                    "objectId"
                ],
                "values": [
                    "5dd1a3e6f9c8cc72936a8dfe",
                    "5dd1a3e6f9c8cc72936a8dff",
                    "5dd1a3e6f9c8cc72936a8e00"
                ]
            },
            {
                "name": "name",
                "types": [
                    "string",
                    "string"
                ],
                "values": [
                    "Test user name",
                    "Test user name2"
                ]
            }
        ],
        "relationships": [
            {
                "propertyNames": [
                    "_id"
                ],
                "targetCollectionName": "users"
            }
        ]
    },
    {
        "name": "usergroups",
        "properties": [
            {
                "name": "__v",
                "types": [
                    "number",
                    "number"
                ],
                "values": [
                    0,
                    0
                ]
            },
            {
                "name": "_id",
                "types": [
                    "objectId",
                    "objectId"
                ],
                "values": [
                    "5dd1a3e6f9c8cc72936a8e03",
                    "5dd1a3e6f9c8cc72936a8e04"
                ]
            },
            {
                "name": "name",
                "types": [
                    "string",
                    "string"
                ],
                "values": [
                    "Test user group",
                    "Test user group2"
                ]
            },
            {
                "name": "users",
                "types": [
                    "objectId",
                    "objectId",
                    "objectId",
                    "objectId"
                ],
                "values": [
                    "5dd1a3e6f9c8cc72936a8dfe",
                    "5dd1a3e6f9c8cc72936a8dfe",
                    "5dd1a3e6f9c8cc72936a8dfe",
                    "5dd1a3e6f9c8cc72936a8dfe"
                ]
            }
        ],
        "relationships": [
            {
                "propertyNames": [
                    "_id"
                ],
                "targetCollectionName": "usergroups"
            },
            {
                "propertyNames": [
                    "users"
                ],
                "targetCollectionName": "users"
            }
        ]
    },
    {
        "name": "photos",
        "properties": [
            {
                "name": "__v",
                "types": [
                    "number",
                    "number"
                ],
                "values": [
                    0,
                    0
                ]
            },
            {
                "name": "_id",
                "types": [
                    "objectId",
                    "objectId"
                ],
                "values": [
                    "5dd1a3e6f9c8cc72936a8e01",
                    "5dd1a3e6f9c8cc72936a8e02"
                ]
            },
            {
                "name": "title",
                "types": [
                    "string",
                    "string"
                ],
                "values": [
                    "Test photo name",
                    "Test photo name2"
                ]
            },
            {
                "name": "user",
                "types": [
                    "objectId",
                    "objectId"
                ],
                "values": [
                    "5dd1a3e6f9c8cc72936a8dfe",
                    "5dd1a3e6f9c8cc72936a8dfe"
                ]
            }
        ],
        "relationships": [
            {
                "propertyNames": [
                    "_id"
                ],
                "targetCollectionName": "photos"
            },
            {
                "propertyNames": [
                    "user"
                ],
                "targetCollectionName": "users"
            }
        ]
    }
];
//# sourceMappingURL=getERDOracle.js.map