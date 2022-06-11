import { EmailGenerator } from "./email-generator";
import { OperationalEmailSender } from "../email-sender/operational-email-sender";
import { CustomerTemplate } from '../templates'
import { EmailEvent } from "../types";
import ejs from 'ejs';

/**
* Generate e-mails based on customerId, input JSON event, and customer's own templates,
* then send the e-mail to the user.
*/
export class CustomerEmailGenerator extends EmailGenerator {

    private customerTemplate = new CustomerTemplate()

    constructor(private customerId: number, emailSender = new OperationalEmailSender()) {
        super(emailSender)
    }

    async email(emailEvent: EmailEvent): Promise<boolean> {
        try {
            const template = await this.customerTemplate.get({ customerId: this.customerId, name: emailEvent.name });
            const html = ejs.render(template, emailEvent);
            return await super.sendEmail(html, emailEvent);
        } catch (err) {
            return Promise.reject(new Error(err));
        }
    }
}
