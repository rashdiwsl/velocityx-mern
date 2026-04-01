import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGarage } from '../api';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('velocityUser'));
  const [watchCount, setWatchCount] = useState(0);

  useEffect(() => {
    if (user) {
      getGarage().then(({ data }) => setWatchCount(data?.cars?.length || 0)).catch(() => {});
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('velocityUser');
    navigate('/login');
  };

  return (
    <nav style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1e1e1e' }}
      className="px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black tracking-tighter select-none">
        <span className="text-white">Velocity</span>
        <span style={{ color: '#c0392b' }}>X</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" style={{ color: '#6b6b6b', fontSize: 14, fontWeight: 500 }}
          onMouseEnter={e => e.target.style.color='#fff'}
          onMouseLeave={e => e.target.style.color='#6b6b6b'}>Browse</Link>

        {user ? (
          <>
            {/* Watchlist with badge */}
            <Link to="/garage" style={{ position: 'relative', color: '#6b6b6b', fontSize: 14, fontWeight: 500 }}
              onMouseEnter={e => e.target.style.color='#fff'}
              onMouseLeave={e => e.target.style.color='#6b6b6b'}>
              Watchlist
              {watchCount > 0 && (
                <span style={{
                  position: 'absolute', top: -8, right: -12,
                  background: '#c0392b', color: '#fff',
                  borderRadius: '50%', width: 18, height: 18,
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{watchCount}</span>
              )}
            </Link>

            <Link to="/dashboard" style={{ color: '#6b6b6b', fontSize: 14, fontWeight: 500 }}
              onMouseEnter={e => e.target.style.color='#fff'}
              onMouseLeave={e => e.target.style.color='#6b6b6b'}>Dashboard</Link>

            <span style={{ color: '#3a3a3a', fontSize: 13 }}>{user.name.split(' ')[0]}</span>
            <button onClick={logout} style={{
              background: '#0a0a0a', border: '1px solid #1e1e1e',
              color: '#6b6b6b', borderRadius: 8, padding: '8px 16px',
              fontSize: 13, cursor: 'pointer', fontWeight: 500
            }}
              onMouseEnter={e => { e.target.style.borderColor='#c0392b'; e.target.style.color='#e74c3c'; }}
              onMouseLeave={e => { e.target.style.borderColor='#1e1e1e'; e.target.style.color='#6b6b6b'; }}
            >Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#6b6b6b', fontSize: 14, fontWeight: 500 }}>Login</Link>
            <Link to="/register" style={{
              background: '#c0392b', color: '#fff', borderRadius: 8,
              padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none'
            }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;