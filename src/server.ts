import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import courseRoutes from "./routes/courseRoutes";
// import reviewRoutes from "./routes/reviewRoutes";

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use(express.json());

app.use("/courses", courseRoutes);
// app.use("/reviews", reviewRoutes);


app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});