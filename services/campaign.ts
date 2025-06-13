import store from "../data/store";
import { Campaign } from "../types/campaign";
import { Email } from "../types/email";
import { Nonprofit } from "../types/nonprofit";
import { interpolateString } from "../utils/interpolate";
const { v4: uuidv4 } = require("uuid");

function sendEmail(to: string, content: string): string {
  // Call external email api here
  console.log(`Sending to ${to}: ${content}`);
  return to;
}

async function sendBulkEmails(
  email: Email,
  recipients: string[]
): Promise<{ sentEmails: Campaign[]; unsentEmails: string[] }> {
  const unsentEmails: string[] = [];
  const sentEmails: Campaign[] = [];
  const today = new Date();
  const matchedNonprofits = store.nonprofits.filter((np) =>
    recipients.includes(np.email)
  );
  for (const np of matchedNonprofits) {
    const personalizedEmail = interpolateString(email.content, {
      name: np.name,
      address: np.address,
      date: today.toDateString(),
    });

    const sent = sendEmail(np.email, personalizedEmail);
    if (!sent) {
      unsentEmails.push(np.email);
      continue;
    }

    sentEmails.push({
      id: uuidv4(),
      nonprofit_id: np.id,
      email_id: email.id,
      personalizedEmail: personalizedEmail,
      date: today,
    });
  }
  store.campaigns.push(...sentEmails);
  return { sentEmails, unsentEmails };
}

export { sendBulkEmails };
