export default function CoreFeatureCard({ title, description }) {
  return (
    <div
      style={{
        background: 'hsl(var(--card))',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
        borderLeft: '2px solid hsl(var(--primary))'
      }}
      data-testid="card-core-feature"
    >
      <div style={{ fontSize: '14px', fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
        {description}
      </div>
    </div>
  );
}