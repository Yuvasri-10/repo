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
      <header style={{ backgroundColor: '#ffe6eb', padding: '1rem', borderBottom: '1px solid #ff96ad' }}>
        <h1>AceIt</h1>
        <p>Your Monthly Productivity Tracker</p>
        <nav style={{ display: 'flex', gap: '15px' }}>
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

     
      <section className="ai-chat-section" style={{ padding: '2rem', backgroundColor: '#fff0f5' }}>
        <h2>🤖 Ask AceIt AI</h2>
        <textarea
          rows={4}
          style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something like: Give me a productivity tip"
        />
        <button
          onClick={handleSubmit}
          style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '10px', backgroundColor: '#ff96ad', border: 'none', color: '#fff' }}
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
        <div style={{ marginTop: '20px', background: '#ffe6eb', padding: '20px', borderRadius: '10px', whiteSpace: 'pre-wrap' }}>
          {response}
        </div>
      </section>

      <footer style={{ backgroundColor: '#ffe6eb', padding: '1rem', textAlign: 'center' }}>
        <p>&copy; 2025 AceIt &nbsp;|&nbsp; Stay productive!</p>
      </footer>
    </div>
  );
};

export default Home;
