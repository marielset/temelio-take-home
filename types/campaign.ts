import { Email } from "./email";
import { Nonprofit } from "./nonprofit";

interface Campaign {
  id: string;
  email_id: string;
  nonprofit_id: string;
  personalizedEmail: string;
  date: Date;
}

export type { Campaign };
