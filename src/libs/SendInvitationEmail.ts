import nodemailer from "nodemailer";

export const SendInvitationEmail = async (
  email: string,
  name: string,
  adminName: string,
  groupName: string,
  link: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailSent = await transporter.sendMail({
      from: `Mind Board`,
      to: email,
      subject: `Invitation to group`,
      html: `<!DOCTYPE html>
<html>
  <head>
    <title>MIND BOARD Verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html {
        font-size: 16px;
      }
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
      }
      header {
        background-color: #333;
        height: 6rem;
        width: 100%;
      }
      header img {
        height: 4rem;
        padding: 0.6rem 1.2rem;
        float: left;
      }
      main {
        padding: 2rem;
        font-size: 1.8rem;
        line-height: 1.5;
        color: #333;
        background-color: #fff;
        margin: 2rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        max-width: 80rem;
        margin: 0 auto;
      }
      h1 {
        color: #162453;
      }
      button {
        width: fit-content;
        padding: 0.6rem 1.2rem;
        border-radius: 0.5rem;
        background-color: #162453;
        color: #ffffff;
        border : none,
        font-size : 1.5rem
      }
      @media screen and (max-width: 768px) {
        header img {
          height: 4.8rem;
        }
        main {
          font-size: 1.6rem;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Invitation for ${groupName}</h1>
      <p>Hi ${name}, hope you are doing good. You have been invited to a group by ${adminName}</p>
      <a target="_blank" href="${link}">
        <button>Join now</button>
      </a>

      <p>OR</p>

      <p>Here is the link <a href="${link}">${link}</a></p>
    </main>
  </body>
</html>
`,
    });
    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
