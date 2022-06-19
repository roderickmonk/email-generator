// All interfaces, types, and enums gathered here

export interface Customer {
    id: number
}

export interface CustomerTemplateQuery extends Customer{
    name: string
}

export enum EmailType {
    VALIDATE_ACCOUNT = "validate_account",
    PASSWORD_RESET = "password_reset",
    RENEW_REMINDER = "renew_reminder",
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
