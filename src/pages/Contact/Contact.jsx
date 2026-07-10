import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import portfolioData from '../../data/portfolio_data.json';
import './Contact.css';

const BOOT_LINES = [
  '> SYSTEM BOOT...',
  '> LOADING COMMUNICATION MODULE...',
  '> ESTABLISHING SECURE CONNECTION...',
  '> ENCRYPTION: AES-256 ENABLED',
  '> STATUS: READY',
  '> AWAITING INPUT...',
];

const Contact = () => {
  const { links } = portfolioData;
  const [bootLines, setBootLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeField, setActiveField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const terminalRef = useRef(null);
  const formRef = useRef(null);

  // Boot sequence animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setBootLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setBootDone(true);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [bootLines]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fallbackMailto = () => {
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.open(
      `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setError(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS is configured, use it; otherwise fall back to mailto
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: `Message from ${formData.name}`,
        }, publicKey);
        setSubmitted(true);
      } catch (err) {
        console.error('EmailJS failed, falling back to mailto:', err);
        fallbackMailto();
        setSubmitted(true);
      }
    } else {
      // No EmailJS config — use mailto
      fallbackMailto();
      setSubmitted(true);
    }

    setSending(false);
  };

  return (
    <section className="contact-page">
      <div className="contact-container">

        <div className="contact-header">
          <h1 className="contact-header__title">TRANSMIT</h1>
          <p className="contact-header__subtitle">
            Open a communication channel. Send a message or connect through the links below.
          </p>
        </div>

        <div className="contact-layout">

          {/* Terminal Side */}
          <div className="contact-terminal">
            <div className="terminal__titlebar">
              <div className="terminal__dots">
                <span className="dot dot--red"></span>
                <span className="dot dot--yellow"></span>
                <span className="dot dot--green"></span>
              </div>
              <span className="terminal__title">ujjal@portfolio:~$</span>
            </div>

            <div className="terminal__body" ref={terminalRef}>
              {/* Boot sequence */}
              {bootLines.map((line, i) => (
                <p key={i} className="terminal__line">{line}</p>
              ))}

              {/* Form appears after boot */}
              {bootDone && !submitted && (
                <form className="terminal__form" onSubmit={handleSubmit}>
                  <div className="terminal__field">
                    <label className="terminal__label">
                      <span className="terminal__prompt">{'>'}</span> ENTER_NAME:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      className={`terminal__input ${activeField === 'name' ? 'active' : ''}`}
                      placeholder="Your name..."
                      required
                    />
                  </div>

                  <div className="terminal__field">
                    <label className="terminal__label">
                      <span className="terminal__prompt">{'>'}</span> ENTER_EMAIL:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      className={`terminal__input ${activeField === 'email' ? 'active' : ''}`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="terminal__field">
                    <label className="terminal__label">
                      <span className="terminal__prompt">{'>'}</span> ENTER_MESSAGE:
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      className={`terminal__input terminal__textarea ${activeField === 'message' ? 'active' : ''}`}
                      placeholder="Type your message..."
                      rows={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="terminal__submit"
                    disabled={sending}
                  >
                    {sending ? '> TRANSMITTING...' : '> SEND_MESSAGE.EXE'}
                  </button>
                </form>
              )}

              {submitted && (
                <div className="terminal__success">
                  <p className="terminal__line">&gt; MESSAGE TRANSMITTED SUCCESSFULLY!</p>
                  <p className="terminal__line">&gt; THANK YOU, {formData.name.toUpperCase()}.</p>
                  <p className="terminal__line">&gt; I WILL RESPOND SHORTLY.</p>
                  <p className="terminal__line blink">&gt; _</p>
                </div>
              )}
            </div>
          </div>

          {/* Links Side */}
          <div className="contact-links">
            <h3 className="contact-links__title">QUICK LINKS</h3>

            <a href={links.github} target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <img src="/github.webp" alt="GitHub" className="contact-link-card__icon" />
              <div>
                <span className="contact-link-card__name">GitHub</span>
                <span className="contact-link-card__url">@sleepyUjjal</span>
              </div>
            </a>

            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <img src="/linkedin.webp" alt="LinkedIn" className="contact-link-card__icon" />
              <div>
                <span className="contact-link-card__name">LinkedIn</span>
                <span className="contact-link-card__url">@ujjaldeep</span>
              </div>
            </a>

            <a href={`mailto:${links.email}`} className="contact-link-card">
              <img src="/mail.webp" alt="Email" className="contact-link-card__icon" />
              <div>
                <span className="contact-link-card__name">Email</span>
                <span className="contact-link-card__url">{links.email}</span>
              </div>
            </a>

            <a href="/resume.pdf" download className="contact-link-card contact-link-card--resume">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.4rem' }}>📄</span>
                <span className="contact-link-card__name" style={{ margin: 0 }}>DOWNLOAD RESUME</span>
              </div>
            </a>

            <div className="contact-status">
              <span>Currently open for opportunities</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
