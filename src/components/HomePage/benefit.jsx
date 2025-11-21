export default function Benefit() {
  const features = [
    {
      icon: 'lucide:calendar-clock',
      title: 'Smart Exam Plan',
      description: 'Organised preparation that adapts to your syllabus completion and target score.',
      items: [
        'Auto-generate weekly & monthly study schedules',
        'Balance Physics, Chemistry and Biology workload',
        'Prioritise weak topics using performance data'
      ]
    },
    {
      icon: 'lucide:messages-square',
      title: '24×7 AI Chatbot',
      description: 'Instant doubt solving with step-by-step reasoning for every NEET concept.',
      items: [
        'Upload questions or type doubts in natural language',
        'Get explanation, shortcut and final answer together',
        'Available anytime – no waiting for faculty response'
      ]
    },
    {
      icon: 'lucide:activity',
      title: 'Deep Performance Analytics',
      description: 'See your real progress with data on every topic, test and attempt.',
      items: [
        'Accuracy, speed and consistency reports',
        'Strong/weak topic segmentation for each subject',
        'Rank predictor and college chances overview'
      ]
    }
  ];

  return (
    <section style={{
      paddingTop: '44px',
      paddingBottom: '44px',
      background: 'hsl(var(--secondary))'
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
          marginBottom: '26px'
        }}>
          <div>
            <div style={{
              fontSize: '12px',
              color: 'hsl(var(--accent-foreground))',
              background: 'hsl(var(--accent))',
              padding: '3px 10px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px'
            }}>
              <iconify-icon icon="lucide:sparkles" style={{ fontSize: '16px' }}></iconify-icon>
              <span>Powerful Features</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
              Everything you need to aim for 720
            </h2>
          </div>
          <p style={{
            fontSize: '14px',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '480px'
          }}>
            Plan your exam strategy, clear doubts instantly, and track every mark with intelligent insights designed for NEET aspirants.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '18px'
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'hsl(var(--card))',
                borderRadius: 'var(--radius-xl)',
                padding: '18px',
                boxShadow: '0 14px 34px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                borderTop: '3px solid hsl(var(--accent))'
              }}
              data-testid={`card-feature-${idx}`}
            >
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-lg)',
                background: 'hsl(var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <iconify-icon icon={feature.icon} style={{ fontSize: '18px', color: 'hsl(var(--primary))' }}></iconify-icon>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>{feature.title}</div>
              <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                {feature.description}
              </div>
              <ul style={{
                listStyle: 'none',
                paddingLeft: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {feature.items.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'hsl(var(--foreground))'
                  }}>
                    <iconify-icon icon="lucide:dot" style={{ fontSize: '16px', color: 'hsl(var(--accent-foreground))' }}></iconify-icon>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                style={{
                  fontSize: '13px',
                  color: 'hsl(var(--primary))',
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginTop: '4px'
                }}
                data-testid={`link-feature-${idx}`}
              >
                Learn more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}