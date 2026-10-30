"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import "./contact.css";

const details = [
  {
    icon: "/icons/phone.svg",
    title: "Phone Number",
    value: "+260 971 234 567",
    isEmail: false,
  },
  {
    icon: "/icons/email.svg",
    title: "Our Email",
    value: "zamline.nexa@gmail.com",
    isEmail: true,
  },
  {
    icon: "/icons/location.svg",
    title: "Location",
    value: "Lusaka, Zambia",
    isEmail: false,
  },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) return undefined;

    const previouslyFocused = submitButtonRef.current;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowModal(false);
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const focusable = dialog.querySelectorAll(FOCUSABLE_SELECTOR);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [showModal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSending) return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    if (String(data.get("companyWebsite") || "").trim()) return;

    setIsSending(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: String(data.get("email") || "").trim(),
          subject: String(data.get("subject") || "").trim(),
          message: String(data.get("message") || "").trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.error || "Your message could not be sent. Please try again.",
        );
      }

      form.reset();
      setShowModal(true);
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to send your message. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section className="contact-section" id="contact" inert={showModal}>
        <div className="site-container contact-inner">
          <h2 className="contact-mobile-heading">Contact</h2>

          <div className="contact-layout">
            <div className="contact-details">
              <h2>Contact Us</h2>

              <div className="contact-list">
                {details.map((detail) => (
                  <div className="contact-detail" key={detail.title}>
                    <Image src={detail.icon} alt="" width={44} height={44} />

                    <div>
                      <h3>{detail.title}</h3>

                      {detail.isEmail ? (
                        <p>
                          <a
                            href={`mailto:${detail.value}`}
                            className="contact-email-link"
                          >
                            {detail.value}
                          </a>
                        </p>
                      ) : (
                        <p>{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a message</h2>

              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                maxLength={254}
                required
                disabled={isSending}
              />

              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Your reason for contact"
                minLength={2}
                maxLength={150}
                required
                disabled={isSending}
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us more..."
                rows={5}
                minLength={5}
                maxLength={4000}
                required
                disabled={isSending}
              />

              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-company-website">Company website</label>
                <input
                  id="contact-company-website"
                  name="companyWebsite"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                ref={submitButtonRef}
                className="contact-submit"
                type="submit"
                disabled={isSending || !ready}
              >
                {isSending ? "Sending..." : "Submit"}
              </button>

              {errorMessage && (
                <p className="contact-status contact-status-error" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="contact-closing-band" aria-hidden="true" />
      </section>

      {showModal &&
        createPortal(
          <div className="contact-modal-overlay" onClick={closeModal}>
            <div
              ref={dialogRef}
              className="contact-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              aria-describedby="contact-modal-description"
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="contact-modal-icon" aria-hidden="true">
                &#10003;
              </div>

              <h3 id="contact-modal-title">Message Sent Successfully!</h3>

              <p id="contact-modal-description">
                Thank you for contacting Nexa. Your message has been sent
                successfully. Our team will get back to you soon.
              </p>

              <button
                ref={closeButtonRef}
                type="button"
                className="contact-modal-close"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
