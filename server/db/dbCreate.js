import { DynamoDB, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

var dynamodb = new DynamoDB({ region: 'local', endpoint: "http://localhost:8000"});
var docClient = DynamoDBDocumentClient.from(dynamodb);

var params = {
    TableName : "foodTrucks",
    KeySchema: [
        { AttributeName: "pk", KeyType: "HASH"},  //Partition key
        { AttributeName: "sk", KeyType: "RANGE"}
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

export function createTable() {
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Error JSON.", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table.", JSON.stringify(data, null, 2));
        }
    });
}

export function dbPut(params) {
    docClient.send(new PutCommand(params));
}

// export function dbScan(params) {
//     dynamodb.scan(params, function (err, data) {
//         if (err) {
//           console.log("Error", err);
//         } else {
//           console.log("Success", data);
//           const jsonString = JSON.stringify(data);
//           console.log(jsonString);
//         //   data.Items.forEach(function (element, index, array) {
//         //     console.log(
//         //         "printing",
//         //         element.sk.S
//         //     );
//         //   });
//         }
//       });
// }

export async function dbScan(params) {
    const data = await docClient.send(new ScanCommand(params));
    try {
        return data.Items.map(item => ({
            name: item.truckName.S,
            type: item.type.S,
            hours: item.hours.S,
            lot: item.sk.S,
            address: item.address.S
        }));
        } catch (error) {
        console.error('Error retrieving items:', error);
        throw error;
        }
}