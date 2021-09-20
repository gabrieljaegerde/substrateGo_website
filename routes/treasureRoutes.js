import { Low, JSONFile } from "lowdb"
import _ from "lodash"
import bodyParser from "body-parser"

const adapter = new JSONFile("../substrateGo_telegram/db/db.json")
const db = new Low(adapter)

export default(app) => {
  app.get("/api/treasures", async (req, res) => {
    await db.read()
    db.chain = _.chain(db.data)
    const treasures = db.chain.get("treasures").filter({ 'active': true }).value()
    const newTreasures = treasures.map(({id, active, message, creator, nft, ...item}) => item)
    console.log(newTreasures)
    return res.status(200).send(newTreasures)
  })
}
