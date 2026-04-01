import { useState } from 'react';

function ImageCarousel({ images = [], alt = '' }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  const prev = (e) => {
    e.stopPropagation();
    setCurrent(i => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent(i => (i + 1) % images.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((src, i) => (
        <img key={i} src={src} alt={`${alt} ${i + 1}`}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: i === current ? 1 : 0,
            transition: 'opacity 0.5s ease',
            filter: 'brightness(0.8) saturate(0.85)'
          }} />
      ))}

      {images.length > 1 && (
        <>
          <button onClick={prev} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.6)', border: '1px solid #2a2a2a',
            color: '#fff', borderRadius: 8, width: 32, height: 32,
            cursor: 'pointer', fontSize: 14, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>‹</button>
          <button onClick={next} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.6)', border: '1px solid #2a2a2a',
            color: '#fff', borderRadius: 8, width: 32, height: 32,
            cursor: 'pointer', fontSize: 14, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>›</button>

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, zIndex: 10
          }}>
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }} style={{
                width: i === current ? 20 : 6, height: 6,
                borderRadius: 3, border: 'none',
                background: i === current ? '#c0392b' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', transition: 'all 0.3s ease', padding: 0
              }} />
            ))}
          </div>

          {/* Counter */}
          <div style={{
            position: 'absolute', top: 12, right: 52,
            background: 'rgba(0,0,0,0.6)', borderRadius: 6,
            padding: '3px 8px', fontSize: 11, color: '#9ca3af',
            backdropFilter: 'blur(4px)', zIndex: 10
          }}>
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;