import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await loginUser(form);
      localStorage.setItem('velocityUser', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: '#0a0a0a',
    border: '1px solid #2a2a2a',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #c0392b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c0392b 0%, transparent 40%)',
        opacity: 0.04
      }} />

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-10">
          <p className="text-3xl font-black tracking-tighter mb-1">
            Velocity<span style={{ color: '#c0392b' }}>X</span>
          </p>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Welcome back<span style={{ color: '#c0392b' }}>.</span>
          </h1>
          <p className="text-sm" style={{ color: '#6b6b6b' }}>
            Sign in to access your garage
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.25)', color: '#e74c3c' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full text-sm text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none transition-colors"
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full text-sm text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none transition-colors"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-xl transition-all text-sm"
              style={{ background: loading ? '#7f1d1d' : '#c0392b', color: '#fff', opacity: loading ? 0.7 : 1 }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#e74c3c'; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#c0392b'; }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1e1e1e' }}>
            <p className="text-center text-sm" style={{ color: '#6b6b6b' }}>
              No account?{' '}
              <Link to="/register" className="font-medium transition-colors"
                style={{ color: '#c0392b' }}
                onMouseEnter={e => e.target.style.color = '#e74c3c'}
                onMouseLeave={e => e.target.style.color = '#c0392b'}
              >
                Create one
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;