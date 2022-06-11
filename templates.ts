import { CustomerTemplateQuery, TemplatesInterface } from "./types";

export class CustomerTemplate<T extends CustomerTemplateQuery> implements TemplatesInterface<T> {
    async get(customerTemplate: CustomerTemplateQuery): Promise<string> {
        // Assume template is fetched from a storage (e.g. DynamoDB, PSQL, MySQL)
        try {
            return "some template"
        } catch (err) {
            return Promise.reject(new Error(err));
        }
    }
}