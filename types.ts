
export interface CustomerTemplateQuery {
    customerId: number,
    name: string
}
export enum EmailType {
    VALIDATE_ACCOUNT = "validate_account",
    PASSWORD_RESET = "password_reset",
    RENEW_REMINDER = "validate_account",
    // etc.
}

export interface EmailEvent {
    type: EmailType,
    name: string,
    email: string
}

export interface TemplatesInterface<T> {
    get(entity: T): void;
}
