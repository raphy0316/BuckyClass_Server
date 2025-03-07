import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import firebaseRoutes from "./routes/firebaseRoutes";
import madgradesRoutes from "./routes/madgradesRoutes";

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());

app.use("/firebase", firebaseRoutes);
app.use("/courses", madgradesRoutes);

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});