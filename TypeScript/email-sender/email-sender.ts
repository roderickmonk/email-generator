// @ts-ignore
import emailSender from '@packages/emailSender'

export abstract class EmailSender {
    public abstract send(email: string, html: string): Promise <boolean>;
}

