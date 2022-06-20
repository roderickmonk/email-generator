export abstract class EmailSender {
    public abstract send(email: string, html: string): Promise <boolean>;
}

