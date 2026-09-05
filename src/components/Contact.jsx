import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function validate(data) {
  if (!data.name.trim()) return "Please enter your name.";
  if (!data.email.trim()) return "Please enter your email.";
  if (!EMAIL_PATTERN.test(data.email)) return "Please enter a valid email address.";
  if (!data.message.trim()) return "Please enter a message.";
  return null;
}

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ message: "", type: null });
  const [sending, setSending] = useState(false);
  const statusTimeout = useRef(null);

  const showStatus = (message, type) => {
    setStatus({ message, type });
    clearTimeout(statusTimeout.current);
    statusTimeout.current = setTimeout(() => {
      setStatus({ message: "", type: null });
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      message: formData.get("message") ?? "",
    };

    const error = validate(data);
    if (error) {
      showStatus(error, "error");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || SERVICE_ID.includes("xxxxxxx")) {
      showStatus("Email sending isn't configured yet — add your EmailJS keys to .env", "error");
      return;
    }

    setSending(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        showStatus("Thanks! Your message has been sent.", "success");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        showStatus("Something went wrong sending your message. Please try again.", "error");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">
        Contact <span>Information</span>
      </h2>

      <div className="contact-grid">

        <div className="contact-info">
          <div className="contact-detail">
            <span className="contact-icon">📧</span>
            <p>jonathan.avibd24@gmail.com</p>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">📱</span>
            <p>+880 1768454858</p>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">📍</span>
            <p>Khulna, Bangladesh</p>
          </div>

          <div className="contact-map">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1837.7198972586118!2d89.51010000735491!3d22.897143889842535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9b00351fd4a3%3A0xb91ffe2261c0fc48!2z4Kar4KeB4Kay4Kas4Ka-4Kec4Ka_4KaX4KeH4KafIOCmruCni-CnnA!5e0!3m2!1sen!2sbd!4v1787913860703!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="contact-form-box">
          <h3>Send a Message</h3>

          <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="tel" name="phone" placeholder="Your Phone" />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>
          </form>

          <p className="form-status" data-type={status.type ?? undefined}>
            {status.message}
          </p>
        </div>

      </div>
    </section>
  );
}
