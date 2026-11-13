import { useState } from 'react'
import { profile } from '../data.js'

const initial = { name: '', email: '', body: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: 'sending', message: '' })
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrors(data.errors || {})
        setStatus({
          type: 'error',
          message: data.error || 'Something went wrong.',
        })
        return
      }

      setForm(initial)
      setStatus({ type: 'success', message: data.message })
    } catch {
      setStatus({ type: 'error', message: 'Could not reach the server.' })
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title reveal">Contact Me</h2>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Let's talk</h3>
            <p>
              Have a question or want to work together? Send me a message — it
              goes straight to my inbox.
            </p>
            <ul className="contact-list">
              <li>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <strong>Facebook:</strong>{' '}
                <a href={profile.facebook} target="_blank" rel="noreferrer">
                  {profile.facebookName}
                </a>
              </li>
              <li>
                <strong>Number:</strong>{' '}
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </li>
            </ul>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            {status.type === 'success' && (
              <div className="alert alert-success">{status.message}</div>
            )}
            {status.type === 'error' && (
              <div className="alert alert-error">{status.message}</div>
            )}

            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}

            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              name="body"
              rows="5"
              value={form.body}
              onChange={handleChange}
              placeholder="Write your message..."
            />
            {errors.body && <span className="field-error">{errors.body}</span>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status.type === 'sending'}
            >
              {status.type === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
