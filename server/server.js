import dotenv from "dotenv";
import express from "express";
import aiRoutes from "./src/routes/ai.routes.js";
dotenv.config();
import cors from "cors";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.URL,
    methods: ["POST"],
    credentials: true,
  })
);

app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is live at ${PORT}`);
});
