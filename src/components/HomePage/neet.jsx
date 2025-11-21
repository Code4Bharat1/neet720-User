'use client';
import { useState } from 'react';

export default function Neet() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(0, 0, 0, 0)',
      borderBottom: '1px solid hsl(var(--border))',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-lg)',
              background: 'hsl(var(--primary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(var(--primary-foreground))',
              fontSize: '16px',
              fontWeight: 600
            }}>N</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>NEET 720</div>
              <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                Study Platform
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
            {['Home', 'Features', 'Pricing', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.toLowerCase());
                }}
                style={{
                  textDecoration: 'none',
                  color: activeNav === item.toLowerCase() 
                    ? 'hsl(var(--foreground))' 
                    : 'hsl(var(--muted-foreground))',
                  fontWeight: 500,
                  position: 'relative',
                  paddingBottom: '4px'
                }}
                data-testid={`link-nav-${item.toLowerCase()}`}
              >
                {item}
                {activeNav === item.toLowerCase() && (
                  <span style={{
                    content: '',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '2px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                    display: 'block'
                  }} />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 18px',
                borderRadius: 'var(--radius-lg)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                background: 'transparent',
                color: 'hsl(var(--foreground))',
                border: 'none'
              }}
              data-testid="button-login"
            >
              Login
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 18px',
                borderRadius: 'var(--radius-lg)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                color: 'hsl(var(--primary-foreground))',
                border: '1px solid hsl(var(--primary))'
              }}
              data-testid="button-signup"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}