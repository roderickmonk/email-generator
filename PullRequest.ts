/* General PR review comments:
    1.  I suggest catching of async errors, although perhaps there is some wider error handling 
        philosophy going on here that I am missing.
    2.  I suggest putting all 'magic numbers' (23 in this case) into consts with their name (e.g. const TIMEOUT=23).  
        Makes for less friction during subsequent maintenance phases.
    3.  Consider using a TypeScript 'interface' to deliver the parameters to the method 'email()'  Personally I like doing 
        so as it means the caller an opportunity to explicityly identify the parameters s/he is referring and, further, takes 
        away the need to pass the params in a specific order.  Agreed, there may be a small performance penalty to using an interface.
    4.  I could be wrong here, but I am wondering if it may be a time to lay some ground work for a wider email infrastructue.
        I have in mind the following: 
            i.  I can imagine some future need to 'get templates', hence coding against a generic 'get template' interface may 
                be an advantage.
            ii. And similarly the EmailCustomer class could be refactored into 'Email' and 'EmailCustomer', with the latter inheriting
                from the former, with a method 'send()' available to both EmailCustomer and all future clients of Email.  In fact,
                applying the Single Responsbility Principle, I can imagine classes Customer, Email, and EmailCustomer, with 
                Customer having (minimally) the customerId, Email having the send() and EmailCustomer using both.
            iii.And then applying 'Dependency Inversion', there is a possibility to abstract away the call to 'emailSender' and 
                instead allow for other 'emailSender's to be exploited instead.  My immediate application of this is allow a 'test'
                instance of 'emailSender' to be dropped into place to allow for coverage testing, without actually triggering  
                the sending of test emails.
    5.  Other PR comments are provided inline below.

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
    // PR comment: I suggest the following:
    async email(event: any, customerId: number): /* Promise<boolean> */ void {
        const template = await getTemplate(customerId, event.name);
        const html = ejs.render(template, event);
        this.sendemailtocustomer(html, event);
    }
    // PR comment: I suggest the following:
        async sendemailtocustomer(html, event): /* Promise<boolean> */ void {
    // PR comment: I suggest the following:
        return /* await */ emailSender(event.email, html);
    }
}
module.exports = EmailGenerator;
/**
* (Inside EmailGenerator.test.ts)
*/
import EmailGenerator from './EmailGenerator.ts'

// PR comment: I suggest testing against both a positive and negative (false) return from the method email ()
it('email', async () /* => */ {
    new EmailGenerator().email({
        id: 'password_reset',
        email: 'fake@test.com'
    }, 23 /* magic number */ );
});