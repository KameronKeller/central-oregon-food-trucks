import { DynamoDB, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

let dynamodb = new DynamoDB({ region: process.env.NODE_ENV === 'production' ? 'us-east-2' : 'local' });
let docClient = DynamoDBDocumentClient.from(dynamodb);

let params = {
    TableName: "foodTrucks",
    KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },  //Partition key - Food truck lot
        { AttributeName: "sk", KeyType: "RANGE" }  //Sort key - Food truck name
    ],
    AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

function createTable(params) {
    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Error JSON.", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table.", JSON.stringify(data, null, 2));
        }
    });
}

export function ensureTableExists() {
    dynamodb.describeTable({ TableName: params.TableName }, function (err, data) {
        if (err && err.code === 'ResourceNotFoundException') {
            // If the table isn't found, create it
            createTable();
        } else if (err) {
            console.error("Unable to describe table. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
}

export function dbPut(params) {
    docClient.send(new PutCommand(params));
}

function getUniqueLots(data) {
    const uniqueLots = {};
    for (const item of data.Items) {
        if (!uniqueLots.hasOwnProperty(item.pk.S)) {
            uniqueLots[item.pk.S] = item.address.S;
        }
    }
    return uniqueLots;
}

export async function dbGetLots(params) {
    const data = await docClient.send(new ScanCommand(params));
    const uniqueLots = getUniqueLots(data);

    try {
        return uniqueLots;
    } catch (error) {
        console.error('Error retrieving items:', error);
        throw error;
    }

}

export async function dbScan(params) {
    const data = await docClient.send(new ScanCommand(params));
    try {
        return data.Items.map(item => ({
            name: item.truckName.S,
            type: item.type.S,
            lot: item.pk.S,
            address: item.address.S
        }));
    } catch (error) {
        console.error('Error retrieving items:', error);
        throw error;
    }
}
