import React, { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI' }}>
      <header>
        <h1>AceIt</h1>
        <p>Your Monthly Productivity Tracker</p>
        <nav style={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/services">Planner</Link>
          <Link href="/tracker">Tracker</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="welcome-section" style={{ padding: '2rem' }}>
        <h2>Welcome to AceIt</h2>
        <p>
          Stay on track and crush your monthly goals with ease! <br />
          Organize your tasks by category, check progress daily, and celebrate consistency.<br />
          Ready to get started?
        </p>
      </section>

   
      <section className="ai-chatbox" style={{ padding: '2rem', backgroundColor: '#ffe6eb', borderRadius: '15px', margin: '2rem' }}>
        <h2 style={{ color: '#ff6f87' }}>Talk to AceIt AI</h2>
        <textarea
          rows={4}
          style={{ width: '100%', padding: '10px', borderRadius: '10px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AceIt AI anything..."
        />
        <button
          onClick={handleSubmit}
          style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '10px', backgroundColor: '#ff96ad', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          {loading ? 'Thinking...' : 'Submit'}
        </button>
        <div style={{ marginTop: '1rem', background: '#fff', padding: '1rem', borderRadius: '10px', whiteSpace: 'pre-wrap' }}>
          {response}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 AceIt &nbsp;|&nbsp; Stay productive!</p>
      </footer>
    </div>
  );
};

export default Home;
