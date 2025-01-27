"use server";
import React from 'react';
import { Resend } from "resend";
import ContactFormEmail from "../components/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const sendEmail = async (formData:{message:string, email:string, name:string}) => {
  const senderEmail = formData.email;
  const message = formData.message;
  const name = formData.name;

  let data;
  try {
    data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["saivivek116@gmail.com"],
      subject: "Message from contact form",
      // replyTo: senderEmail,
      react: ContactFormEmail({ message, senderEmail, name }) as React.ReactElement,
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};