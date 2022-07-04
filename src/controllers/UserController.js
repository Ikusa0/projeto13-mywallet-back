import db from "../databases/mongo.js";

export async function getUser(req, res) {
  //TODO: uuid/token
  const user = req.body;

  db.collection("users")
    .findOne({ email: user.email })
    .then((u) => {
      if (!u) {
        res.sendStatus(404);
        return;
      }

      res.status(200).send(u);
    });
}

export async function createUser(req, res) {
  // TODO: bcrypt
  const user = req.body;
  await db.collection("users").insertOne(user);
  res.sendStatus(201);
}
