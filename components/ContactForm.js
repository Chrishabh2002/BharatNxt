"use client";

import { useState } from "react";
import { Icon } from "./Icons";

export default function ContactForm({ settings, contact, serviceMenu = [] }) {
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const headOffice = contact.headOffice || {};

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });
    const form = e.currentTarget;
    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      service: form.service.value,
      message: form.message.value.trim(),
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setStatus({ state: "ok", msg: "Thank you! Hamari team 24 hours me aapse contact karegi." });
      form.reset();
    } catch {
      setStatus({ state: "err", msg: "Kuch galat ho gaya. Thodi der baad try karein." });
    }
  }

  const loading = status.state === "loading";

  return (
    <section className="section section--tint" id="contact">
      <div className="container contact__grid">
        <div>
          <span className="eyebrow">Get Expert Advice</span>
          <h2 className="h-title">
            Start Your <span className="accent">Application</span>
          </h2>
          <p className="lead" style={{ marginBottom: 26 }}>
            It&apos;s our pleasure to have a chance to cooperate. Tell us about your startup and
            we&apos;ll map the right path.
          </p>

          <div className="ci">
            <div className="ci__ic"><Icon name="phone" size={22} /></div>
            <div><b>Have Any Questions?</b><span>{settings.phone}</span></div>
          </div>
          <div className="ci">
            <div className="ci__ic"><Icon name="mail" size={22} /></div>
            <div><b>Mail Us</b><span>{settings.email}</span></div>
          </div>
          {headOffice.addr && (
            <div className="ci">
              <div className="ci__ic"><Icon name="pin" size={22} /></div>
              <div>
                <b>{headOffice.title}{headOffice.label ? ` — ${headOffice.label}` : ""}</b>
                <span>{headOffice.addr}</span>
              </div>
            </div>
          )}

          <div className="offices">
            {(contact.branches || []).map((o, i) => (
              <div className="office" key={i}>
                <b>{o.city} — Branch Office</b>
                <p>{o.addr}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Start Your Application</h3>
          <p className="fc-sub">Fill the form — data securely saved &amp; our team will reach out.</p>
          <div className="field">
            <label htmlFor="name">Full Name *</label>
            <input id="name" name="name" type="text" required placeholder="Aapka naam" />
          </div>
          <div className="row-2">
            <div className="field">
              <label htmlFor="phone">Phone *</label>
              <input id="phone" name="phone" type="tel" required pattern="[0-9+\- ]{8,15}" placeholder="+91 98765 43210" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="aap@example.com" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="service">Interested Service</label>
            {/* Grouped by category so a 40-item list stays scannable, and so the
                lead that lands in the sheet names the exact service asked for. */}
            <select id="service" name="service" defaultValue="">
              <option value="">Select a service</option>
              {serviceMenu.map((g) => (
                <optgroup label={g.group} key={g.group}>
                  {g.items.map((it) => (
                    <option key={it.slug} value={it.title}>{it.title}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Aap kya jaanna chahte hain?" />
          </div>
          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? "Bhej rahe hain..." : "Submit Now"}
          </button>
          {status.state === "ok" && <p className="note ok">{status.msg}</p>}
          {status.state === "err" && <p className="note err">{status.msg}</p>}
        </form>
      </div>
    </section>
  );
}
