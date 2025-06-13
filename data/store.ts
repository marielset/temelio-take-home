import { Campaign } from "../types/campaign";
import { Email } from "../types/email";
import { Nonprofit } from "../types/nonprofit";

const store: {
  campaigns: Campaign[];
  nonprofits: Nonprofit[];
  emails: Email[];
} = {
  nonprofits: [],
  campaigns: [],
  emails: [],
};

export default store;
