import { Resend } from 'resend';
import { ENV_VARS } from './envVars.js';

if (!ENV_VARS.RESEND_API) {
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(ENV_VARS.RESEND_API);

export const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data
    } catch (error) {
        console.log(error)
    }
}