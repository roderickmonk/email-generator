import { EmailType } from '../types'
import { CustomerEmailGenerator } from './customer-email-generator'
import { EmailSender } from '../email-sender/email-sender';
import assert from 'assert';

export class TestEmailSender extends EmailSender {

    static counter = 0


    public async send(email: string, html: string): Promise<boolean> {
        // First call to send succeeds
        // Second one fails
        // Third one throws an error
        try {
            switch (TestEmailSender.counter++ % 3) {
                case 0:
                    return true;
                case 1:
                    return false;
                case 2:
                    return Promise.reject(new Error("Artificially Forced Error"));
            }
            return Promise.reject(new Error("Software Anomaly"));

        } catch (err) {
            return Promise.reject(err)
        }
    }
}

describe('Testing Email Transmissions', function () {

    it('Test successful email send', async () => {

        try {
            const result = await (new CustomerEmailGenerator(Customer(1), new TestEmailSender()).email({
                name: "event_name",
                email: 'fake@test.com',
                type: EmailType.PASSWORD_RESET
            }));

            assert(result == true);
            return Promise.resolve()

        } catch (err) {
            return Promise.reject(new Error(err))
        }
    });

    it('Test failed email send', async () => {

        try {
            const result = await (new CustomerEmailGenerator(Customer(1), new TestEmailSender()).email({
                name: "event_name",
                email: 'fake@test.com',
                type: EmailType.PASSWORD_RESET
            }));

            assert(result == false);
            return Promise.resolve()

        } catch (err) {
            return Promise.reject(new Error(err))
        }
    });

    it('Test catch of async error', async () => {

        try {
            await (new CustomerEmailGenerator(Customer(1), new TestEmailSender()).email({
                name: "event_name",
                email: 'fake@test.com',
                type: EmailType.PASSWORD_RESET
            }));

            return Promise.reject(new Error("Test should have thrown an async error"))

        } catch (err) {
            // Failing is good
            return Promise.resolve()
        }
    });
})

function Customer(arg0: number): import("../types").Customer {
    throw new Error('Function not implemented.');
}
