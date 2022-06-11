import ejs from 'ejs';
// Assume internal library of `emailSender`
// `emailSender` returns a Promise holding a potential boolean
import emailSender from '@packages/emailSender';
function getTemplate(customerId, name): string {
    // Assume template is fetched from a storage (e.g. DynamoDB, PSQL, MySQL)
}
/**
* (Inside EmailGenerator.ts)
*
* Generate e-mails based on input JSON event and customer's own templates,
* then send the e-mail to the user.
*/
class EmailCustomer {
    async email(event: any, customerId: number): void {
        const template = await getTemplate(customerId, event.name);
        const html = ejs.render(template, event);
        this.sendemailtocustomer(html, event);
    }
    async sendemailtocustomer(html, event): void {
        return emailSender(event.email, html);
    }
}
module.exports = EmailGenerator;
/**
* (Inside EmailGenerator.test.ts)
*/
import EmailGenerator from './EmailGenerator.ts'
it('email', async () {
    new EmailGenerator().email({
        id: 'password_reset',
        email: 'fake@test.com'
    }, 23);
});