"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

type FormStatus = "idle" | "sent" | "error";

function readField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function buildMailto(
  name: string,
  email: string,
  subject: string,
  message: string,
): string {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const honeypot = readField(form, "company");
    if (honeypot.length > 0) {
      setMailtoHref(null);
      setStatus("sent");
      return;
    }

    const name = readField(form, "name");
    const email = readField(form, "email");
    const subject = readField(form, "subject");
    const message = readField(form, "message");

    if (!name || !email || !subject || !message) {
      setMailtoHref(null);
      setStatus("error");
      return;
    }

    const href = buildMailto(name, email, subject, message);
    setMailtoHref(href);
    setStatus("sent");
    window.location.assign(href);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
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
          Thanks. If your email client did not open,{" "}
          {mailtoHref ? (
            <a id="contact-mailto" href={mailtoHref}>
              send to {CONTACT_EMAIL}
            </a>
          ) : (
            <>write us at {CONTACT_EMAIL}</>
          )}
          .
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
