import express from "express";
import nonprofitRoutes from "./routes/nonprofits";
import emailRoutes from "./routes/emails";

const app = express();
app.use(express.json());
app.use("/api/nonprofits", nonprofitRoutes);
app.use("/api/emails", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
