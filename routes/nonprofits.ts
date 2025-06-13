import express, { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import store from "../data/store";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const nonprofit = req.body;
  store.nonprofits.push({ id: uuidv4(), ...nonprofit });
  res.status(201).json(nonprofit);
});

router.get("/", (req: Request, res: Response) => {
  res.json(store.nonprofits);
});

router.get("/:nonprofitEmail/emails", (req: Request, res: Response) => {
  const { nonprofitEmail } = req.params;
  const nonprofit = store.nonprofits.find((np) => np.email == nonprofitEmail);

  const emails = store.campaigns.filter(
    (email) => email.nonprofit_id === nonprofit?.id
  );

  res.json(emails);
});

export default router;
