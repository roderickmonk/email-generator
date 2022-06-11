import { EmailEvent, EmailType } from '../types'


// @ts-ignore
import emailSender from '@packages/emailSender';
import { OperationalEmailSender } from '../email-sender/operational-email-sender';
import { EmailSender } from '../email-sender/email-sender';


type EmailSenderSignature = (email: string, content: string, something?: number) => Promise<boolean>

// class EmailSender {
//     constructor(public sender: EmailSenderSignature = emailSender) { }
// }

export class EmailGenerator {

    constructor(protected emailSender: EmailSender) { }

    async sendEmail(html: string, emailEvent: EmailEvent): Promise<boolean> {
        try {
            return this.emailSender.send(emailEvent.email, html);
        } catch (err) {
            return Promise.reject(new Error(err));
        }
    }
}
