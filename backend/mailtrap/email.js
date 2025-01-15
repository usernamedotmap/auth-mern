import { MailtrapClient } from "mailtrap";
import { client, sender } from "./mailtrap.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./mailtrapTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Email",
    });

    console.log("Success send verification email", response);
  } catch (error) {
    console.log("Error in mailtrap", error);
    throw new Error(`Error in sending verification email: ${error}`);
  }
};

export const welcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "a03097c8-08d0-447c-9844-dd85f63d3ed8",
      template_variables: {
        company_info_name: "Balik kana please",
        name: name,
      },
    });

    console.log("This is response", response);
  } catch (error) {
    console.log("Error in mailtrap", error);
    throw new Error("Error in mailtrap", error);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Reset Password",
    });


  } catch (error) {
    console.log("Error in mailtrap", error);
    throw new Error("Error in mailtrap", error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in mailtrap", error);
    throw new Error("Error in mailtrap", error);
  }
};
