import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import { userRouter } from "./routes/user.js";
import { accountRouter } from "./routes/account.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/v1", router);
app.use("/api/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully!");
});

// Render PORT fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
