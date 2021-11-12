import express from "express";
import treasureRoutes from "./routes/treasureRoutes.js";
import { getDb } from "./tools/config.js";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

dotenv.config();

await getDb();

app.use(express.json());

treasureRoutes(app);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static('front/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
