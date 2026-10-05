"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

type FormStatus = "idle" | "sent" | "error";

function readField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const honeypot = readField(form, "company");
    if (honeypot.length > 0) {
      setStatus("sent");
      return;
    }

    const name = readField(form, "name");
    const email = readField(form, "email");
    const subject = readField(form, "subject");
    const message = readField(form, "message");

    if (!name || !email || !subject || !message) {
      setStatus("error");
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <p className="muted form-note">
        Form destination: {CONTACT_EMAIL} (mailto fallback for Preview)
      </p>
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>
      <label htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </label>
      <label htmlFor="contact-subject">
        Subject
        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder="How can we help?"
          required
        />
      </label>
      <label htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          name="message"
          placeholder="Brief context, timeline, and goals"
          required
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      {status === "sent" ? (
        <p className="form-status" role="status">
          Your email client should open a message to {CONTACT_EMAIL}. If it
          does not, write us directly at that address.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-status" role="alert">
          Please fill in name, email, subject, and message.
        </p>
      ) : null}
    </form>
  );
}
