import { useState, useRef, useEffect } from 'react';

function CarAI({ car, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey! I'm VelocityX AI 🤖 Ask me anything about the ${car.title} — specs, performance, value, how it compares to rivals, anything.`
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
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are VelocityX AI, an expert car advisor embedded in a premium car marketplace. 
The user is viewing this car listing:
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

Answer questions about this car, its specs, performance, value for money, how it compares to rivals, reliability, running costs, and buying advice. Be concise, knowledgeable, and enthusiastic. Use car enthusiast language. Keep responses under 150 words unless the user asks for detail.`,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I had trouble responding. Try again!';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0f0f0f', border: '1px solid #1e1e1e',
        borderRadius: 20, width: '100%', maxWidth: 560,
        height: 560, display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,0.8)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #1e1e1e',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16
            }}>🤖</div>
            <div>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 700, margin: 0 }}>VelocityX AI</p>
              <p style={{ color: '#10b981', fontSize: 11, margin: 0 }}>● Online — Ask me about this car</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#6b6b6b',
            fontSize: 20, cursor: 'pointer', padding: 4
          }}>×</button>
        </div>

        {/* Car context pill */}
        <div style={{ padding: '10px 20px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#141414', border: '1px solid #2a2a2a',
            borderRadius: 20, padding: '6px 12px'
          }}>
            <img src={car.image} alt="" style={{ width: 28, height: 20, objectFit: 'cover', borderRadius: 4 }} />
            <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600 }}>{car.title}</span>
            <span style={{ color: '#c0392b', fontSize: 12, fontWeight: 700 }}>${car.price?.toLocaleString()}</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '80%', padding: '10px 14px', borderRadius: 12,
                fontSize: 13, lineHeight: 1.6,
                background: msg.role === 'user' ? '#c0392b' : '#141414',
                color: msg.role === 'user' ? '#fff' : '#e5e5e5',
                border: msg.role === 'user' ? 'none' : '1px solid #1e1e1e',
                borderBottomRightRadius: msg.role === 'user' ? 4 : 12,
                borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 12,
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 4, padding: '8px 14px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#c0392b',
                  animation: 'pulse 1.2s ease infinite',
                  animationDelay: `${i * 0.2}s`
                }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <div style={{ padding: '0 20px 10px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              'Is this good value?',
              'How fast is it?',
              'What are the rivals?',
              'Running costs?'
            ].map(q => (
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
          <button onClick={send} disabled={loading || !input.trim()} style={{
            background: input.trim() ? '#c0392b' : '#1e1e1e',
            border: 'none', borderRadius: 12, padding: '10px 16px',
            color: '#fff', cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontSize: 16, transition: 'background 0.2s'
          }}>➤</button>
        </div>
      </div>
    </div>
  );
}

export default CarAI;