import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

const VARIFY_EMAIL_SUBJECT = 'Confirm Your Email Address for Codeems';
const FORGOT_PASSWORD_SUBJECT = 'Reset Your Codeems Password';

const EMAIL_TEMPLATE = (token: string, emailType: string, userName: string) => {
    const containerStyles = `
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `;

    const cardStyles = `
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        text-align: center;
    `;

    const commonStyles = `
        font-family: 'Arial', sans-serif;
        color: #333;
        line-height: 1.6;
    `;

    if (emailType === 'VERIFY_EMAIL') {
        return `
            <div style="${containerStyles}">
                <div style="${cardStyles}">
                    <div style="${commonStyles}">
                        <h2>Dear ${userName},</h2>
                        <p>Thank you for signing up with Codeems! To get started and make the most of our services, we need to confirm your email address.</p>
                        <p>Please click on the link below to verify your email:</p>
                        <a href="${process.env.DOMAIN}/verify-email?token=${token}" style="text-decoration: none; color: #007BFF;">
                            Verify Email
                        </a>
                        <p>Once you've confirmed your email, you'll gain full access to our features and resources.</p>
                        <p>If you have any questions or need further assistance, don't hesitate to contact our support team at [Your Support Email].</p>
                        <p>Thank you,<br/>The Codeems Team</p>
                    </div>
                </div>
            </div>
        `;
    } else if (emailType === 'FORGOT_PASSWORD') {
        return `
            <div style="${containerStyles}">
                <div style="${cardStyles}">
                    <div style="${commonStyles}">
                        <h2>Hello ${userName},</h2>
                        <p>It looks like you've requested to reset your password for your Codeems account. No worries! To set up a new password, simply click on the link below:</p>
                        <a href="${process.env.DOMAIN}/forgot-password?token=${token}" style="text-decoration: none; color: #007BFF;">
                            Reset Password
                        </a>
                        <p>If you didn't request this password reset, please disregard this email. Your account is secure, and no changes have been made.</p>
                        <p>Should you need any further assistance or have questions, feel free to reach out to us at [Your Support Email]. We're here to help!</p>
                        <p>Best regards,<br/>The Codeems Team</p>
                    </div>
                </div>
            </div>
        `;
    }
};

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        // Update user with token
        if (emailType === 'VERIFY_EMAIL') {
            await User.findByIdAndUpdate(
                { _id: userID },
                {
                    verifyEmailToken: hashedToken,
                    verifyEmailTokenExpires: Date.now() + 3600000, // 1 hour
                }
            );
        } else if (emailType === 'FORGOT_PASSWORD') {
            await User.findByIdAndUpdate(
                { _id: userID },
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpires: Date.now() + 3600000, // 1 hour
                }
            );
        }

        // Get user name
        const user = await User.findById({ _id: userID });
        console.log(user);

        // Send email
        var transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'b53052792362c8',
                pass: '26dc58b4be538a',
            },
        });

        const mailOptions = {
            from: 'dhrutikpatel2017@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY_EMAIL'
                    ? VARIFY_EMAIL_SUBJECT
                    : FORGOT_PASSWORD_SUBJECT,
            html: EMAIL_TEMPLATE(
                hashedToken,
                emailType,
                user.username.toString().toUpperCase()
            ),
        };

        const mainResponse = await transport.sendMail(mailOptions);
        return mainResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
