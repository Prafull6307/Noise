/** @format */
import { connectDB } from "./mogodb.js";
import express from 'express';
import 'dotenv/config';
import sleepPostRoute from './sleepPostRoute.js';
import sleepGetRoute from './sleepGetRoute.js';
import sleepDeleteRoute from './sleepDeleteRoute.js';
import sleepPutRoute from './sleepPutRoute.js';

const app = express();

connectDB();

app.use(express.json());

app.use("/sleep", sleepPostRoute);
app.use("/sleep", sleepGetRoute);
app.use("/sleep", sleepDeleteRoute);
app.use("/sleep", sleepPutRoute);

app.get("/", (req, res) => {
  res.send("hello");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
export default app

