import { useState, useRef, useEffect } from 'react';

const GROQ_API_KEY = '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'; // 👈 paste your Groq key here

function CarAI({ car, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey! I'm VelocityX AI 🤖 Ask me anything about the ${car.title} — specs, performance, value for money, rivals, anything.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 300,
          messages: [
            {
              role: 'system',
              content: `You are VelocityX AI, an expert car advisor inside a premium car marketplace.
The user is viewing this listing:
- Title: ${car.title}
- Brand: ${car.brand}
- Model: ${car.model}
- Year: ${car.year}
- Price: $${car.price?.toLocaleString()}
- Mileage: ${car.mileage?.toLocaleString()} km
- Fuel: ${car.fuelType}
- Transmission: ${car.transmission}
- Description: ${car.description}
- Status: ${car.status}

Answer questions about this car's specs, performance, value, rivals, reliability and buying advice. Be concise, enthusiastic and knowledgeable. Keep answers under 120 words unless asked for more detail.`
            },
            ...allMessages.map(m => ({ role: m.role, content: m.content }))
          ]
        })
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Groq error:', err);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${err.error?.message || 'Something went wrong.'}`
        }]);
        return;
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, try again!';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggested = [
    'Is this good value?',
    'How fast is it?',
    'What are the rivals?',
    'Running costs?'
  ];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0f0f0f', border: '1px solid #1e1e1e',
        borderRadius: 20, width: '100%', maxWidth: 540,
        height: 560, display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.9)'
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #1e1e1e',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(192,57,43,0.15)',
              border: '1px solid rgba(192,57,43,0.3)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18
            }}>🤖</div>
            <div>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 700, margin: 0 }}>
                VelocityX AI
              </p>
              <p style={{ color: '#10b981', fontSize: 11, margin: 0 }}>
                ● Online — Ask me about this car
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            color: '#6b6b6b', fontSize: 22, cursor: 'pointer'
          }}>×</button>
        </div>

        {/* Car pill */}
        <div style={{ padding: '10px 20px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#141414', border: '1px solid #2a2a2a',
            borderRadius: 20, padding: '6px 14px'
          }}>
            <img src={car.image} alt=""
              style={{ width: 32, height: 22, objectFit: 'cover', borderRadius: 4 }} />
            <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600 }}>
              {car.title}
            </span>
            <span style={{ color: '#c0392b', fontSize: 12, fontWeight: 700 }}>
              ${car.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 12
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '82%', padding: '10px 14px', borderRadius: 14,
                fontSize: 13, lineHeight: 1.65,
                background: msg.role === 'user' ? '#c0392b' : '#141414',
                color: '#fff',
                border: msg.role === 'user' ? 'none' : '1px solid #1e1e1e',
                borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
                borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 14,
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 5, padding: '6px 14px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#c0392b',
                  animation: 'pulse 1.2s ease infinite',
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested */}
        {messages.length === 1 && (
          <div style={{
            padding: '0 20px 12px',
            display: 'flex', gap: 8, flexWrap: 'wrap'
          }}>
            {suggested.map(q => (
              <button key={q} onClick={() => setInput(q)} style={{
                background: '#141414', border: '1px solid #2a2a2a',
                color: '#9ca3af', borderRadius: 20, padding: '5px 12px',
                fontSize: 11, cursor: 'pointer', fontWeight: 500
              }}>{q}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #1e1e1e',
          display: 'flex', gap: 8
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything about this car..."
            style={{
              flex: 1, background: '#141414', border: '1px solid #2a2a2a',
              borderRadius: 12, padding: '10px 14px', color: '#fff',
              fontSize: 13, outline: 'none'
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              background: input.trim() && !loading ? '#c0392b' : '#1e1e1e',
              border: 'none', borderRadius: 12, padding: '10px 16px',
              color: '#fff',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              fontSize: 16, transition: 'background 0.2s'
            }}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default CarAI;