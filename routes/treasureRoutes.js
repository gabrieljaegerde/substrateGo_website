import { Low, JSONFile } from "lowdb"
import _ from "lodash"
import bodyParser from "body-parser"

const adapter = new JSONFile("../huntbot/db/db.json")
const db = new Low(adapter)

export default(app) => {
  app.get("/api/treasures", async (req, res) => {
    await db.read()
    db.chain = _.chain(db.data)
    const treasures = db.chain.get("treasures").value()
    return res.status(200).send(treasures)
  })
}
