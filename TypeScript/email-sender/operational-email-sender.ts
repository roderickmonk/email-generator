// @ts-ignore
import emailSender from '@packages/emailSender'

import { EmailSender } from './email-sender';

export class OperationalEmailSender extends EmailSender {

    public async send(email: string, html: string): Promise<boolean> {

        try {
            return await emailSender.sender(email, html);
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
