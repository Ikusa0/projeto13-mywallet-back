import db from "../databases/mongo.js";
import dayjs from "dayjs";

export async function getReceipt(req, res) {
  const user = await db.collection("users").findOne({ email: req.headers.email });
  const registries = await db.collection("registries").find({ userId: user._id }).toArray();
  const receipt = Number(registries.reduce((sum, registry) => sum + registry.value, 0).toFixed(2));
  res.send({ registries, receipt });
}

export async function createRegistry(req, res) {
  const user = await db.collection("users").findOne({ email: req.headers.email });
  const registry = req.body;
  const registryId = await db
    .collection("registries")
    .insertOne({ userId: user._id, ...registry, date: dayjs().format("DD/MM") });
  res.status(201).send({ id: registryId.insertedId });
}
