import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) { 
    try {
        const { email, name } = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Insta App" <${process.env.EMAIL_USER}>`, // sender address
            to: email,
            subject: "You have been invited to connect on Insta",
            text: `Hi, you have been invited by ${name} to connect on Insta.`,
            html: `<p>Hi, you have been invited by <strong>${name}</strong> to connect on Insta.</p>`,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: `Failed to send email, ${error}` }, { status: 500 });
    }
}