export declare const getERDOracle: {
    "name": string;
    "properties": ({
        "name": string;
        "types": string[];
        "values": number[];
    } | {
        "name": string;
        "types": string[];
        "values": string[];
    })[];
    "relationships": {
        "propertyNames": string[];
        "targetCollectionName": string;
    }[];
}[];
