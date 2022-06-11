import { EmailType } from '../types'
import { CustomerEmailGenerator } from './customer-email-generator'
import { EmailSender } from '../email-sender/email-sender';
import assert from 'assert';

export class TestEmailSender extends EmailSender {

    static counter = 0

    public async send(email: string, html: string): Promise<boolean> {

        try {
            if (TestEmailSender.counter++ % 2 == 0) {
                return true;
            }
            else {
                return false;
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

describe('Testing Email Transmissions', function () {

    it('Test successful email send', async () => {

        try {
            const result = await (new CustomerEmailGenerator(1, new TestEmailSender()).email({
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
            const result = await (new CustomerEmailGenerator(1, new TestEmailSender()).email({
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
})