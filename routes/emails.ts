import express, { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
import store from "../data/store";
import { Email } from "../types/email";
import { sendBulkEmails } from "../services/campaign";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { content, recipients } = req.body;

  const email: Email = {
    id: uuidv4(),
    content,
  };

  store.emails.push(email);

  const { sentEmails, unsentEmails } = await sendBulkEmails(email, recipients);
  unsentEmails.length == 0
    ? res.status(201).json(sentEmails)
    : res.status(400).json({
        sentEmails,
        unsentEmails,
        message: "Some emails were not able to be sent",
      });
});

router.get("/", (req: Request, res: Response) => {
  res.json(store.campaigns);
});

export default router;
