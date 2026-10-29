import React from 'react'

export default function App() {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      margin: 0
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🚀 Deployed via Jenkins CI/CD Pipeline
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
        Frontend React + Vite + Nginx Container
      </p>
      <div style={{
        marginTop: '2rem',
        padding: '1rem 2rem',
        borderRadius: '8px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155'
      }}>
        <code>Status: Running inside Docker</code>
      </div>
    </div>
  )
}