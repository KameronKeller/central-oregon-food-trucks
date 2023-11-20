import express from "express";
import { createTable, dbPut, dbScan } from "./db/dbCreate.js";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const PORT = process.env.PORT || 3001;

// Create the DynamoDB table
createTable();

const app = express();

// app.use(express.json());

app.get("/trucks", async (req, res) => {
    console.log("request made");
    const params = ({
        TableName: "foodTrucks"
      });

    try {
        let data = await dbScan(params);
        console.log(data);
        // const jsonData = JSON.stringify(data, null, 2);
        // console.log(JSON.stringify(data, null, 2));
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
    }
});

app.post("/posttest", express.json(), (req, res) => {
    console.log(req.body);

    const params = {
        TableName: "foodTrucks",
        Item: {
            "pk": req.body.lot,
            "sk": req.body.truckName,
            "truckName": req.body.truckName,
            "type": req.body.type,
            "hours": req.body.hours,
            "address": req.body.address
        }
    };

    dbPut(params);

    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});