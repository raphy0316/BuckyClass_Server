import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import madgradesRoutes from "./routes/madgradesRoutes";

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());

app.use("/courses", madgradesRoutes);

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});