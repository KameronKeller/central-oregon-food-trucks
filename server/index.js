import express from "express";
import cors from "cors";
import { ensureTableExists, dbPut, dbScan, dbGetLots } from "./db/dbFunctions.js";

const PORT = process.env.PORT || 3001;

// Create the DynamoDB table
ensureTableExists();

const app = express();
app.use(cors());

app.get("/trucks", async (req, res) => {
    const params = ({
        TableName: "foodTrucks"
      });

    try {
        let data = await dbScan(params);
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
    }
});

app.get("/existinglots", async (req, res) => {

    const params = ({
        TableName: "foodTrucks",
        ProjectionExpression: "#pk, #address",
        ExpressionAttributeNames: {
            "#pk": "pk",
            "#address": "address"
        }
      });

    try {
        let data = await dbGetLots(params);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
    }
})

app.post("/savetruck", express.json(), (req, res) => {

    const params = {
        TableName: "foodTrucks",
        Item: {
            "pk": req.body.lot,
            "sk": req.body.truckName,
            "truckName": req.body.truckName,
            "type": req.body.type,
            "address": req.body.address
        }
    };

    dbPut(params);

    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});