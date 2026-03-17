export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0E14',
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '15px',
        color: '#64748B',
        lineHeight: 2,
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <p>you&apos;re looking for something that isn&apos;t here.</p>
      <p>or maybe it is, and you just can&apos;t see it yet.</p>
    </div>
  )
}
