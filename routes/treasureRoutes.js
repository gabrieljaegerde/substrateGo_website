import Treasure from "../models/treasure.js";

export default (app) => {
  app.get("/api/treasures", async (req, res) => {
    const treasures = await Treasure.find({ "active": true })
      .select('_id location name creator hint description file createdAt');
    const newTreasures = await Promise.all(treasures.map(async (treasure) => {
      const creator = await treasure.getCreator();
      const noCollected = await treasure.howManyCollected();
      const dayInMs = 1000 * 60 * 60 * 24;
      return {
        id: treasure._id.toString(),
        location: treasure.location,
        name: treasure.name,
        creator: creator._id.toString(),
        hint: treasure.hint,
        description: treasure.description,
        file: treasure.file,
        noCollected: noCollected,
        popular: noCollected > 3,
        new: (new Date().getTime() - treasure.createdAt.getTime()) < (3 * dayInMs)
      };
    }));
    return res.status(200).send(newTreasures);
  });
};
