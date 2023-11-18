import express from "express";
import { createTable, dbPut } from "./db/dbCreate.js";

const PORT = process.env.PORT || 3001;

// Create the DynamoDB table
createTable();

const app = express();

// app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

app.post("/posttest", express.json(), (req, res) => {
    console.log(req.body);

    const params = {
        TableName: "foodTrucks",
        Item: {
            "pk": req.body.lot,
            "sk": "t1",
            "truckName": req.body.truckName,
            "type": req.body.type,
            "hours": req.body.hours
        }
    };

    dbPut(params);

    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});