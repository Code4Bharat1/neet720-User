import Neet from './neet';
import Benefit from './benefit';
import CoreFeatureCard from './CoreFeaturesCard';
export default function Home() {
  const coreFeatures = [
    { title: 'Full Test Series', description: 'Simulate actual NEET with full-length mock tests that mirror difficulty, pattern and timing.' },
    { title: 'Subject-wise Analysis', description: 'Drill down into Physics, Chemistry and Biology performance with topic-level accuracy stats.' },
    { title: 'College Prediction', description: 'Estimate your chances in top medical colleges based on your mock performance and target score.' },
    { title: 'Create Your Own Test', description: 'Build custom tests from PYQs, chapter-wise questions or difficulty levels in a few clicks.' },
    { title: 'Fast Quiz Mode', description: 'Quick, time-bound quizzes to revise concepts and formulas when you have just 10–15 minutes.' },
    { title: 'Result & Review Section', description: 'Review every attempt with detailed solutions, time spent and alternative approaches.' }
  ];

  const testimonials = [
    {
      name: 'Aarav Sharma',
      meta: 'AIR 142 · NEET 2024',
      badge: 'Verified',
      text: 'The AI doubt solver is a game changer. I could solve doubts at 2 AM without waiting for my faculty and the explanations are better than most textbooks.',
      rating: 5
    },
    {
      name: 'Priya Gupta',
      meta: 'AIR 304 · NEET 2024',
      badge: 'Verified',
      text: 'Mock tests felt like real NEET. The analytics helped me focus on my weak areas in Organic Chemistry and I improved my score by 60+ marks.',
      rating: 5
    },
    {
      name: 'Rohan Mehta',
      meta: 'Class 12 · Delhi',
      badge: 'Student',
      text: 'Loved the structured study plans. Balancing school and NEET prep became so much easier when the platform tells you what to study each day.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How is NEET 720 different from other mock test platforms?',
      answer: 'NEET 720 combines a large NEET-focused question bank with AI doubt solving, detailed analytics and college prediction in a single platform designed specifically for medical aspirants.'
    },
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer: 'Yes. You can change your plan anytime from your account dashboard. Upgrades are applied instantly and any difference is adjusted on a pro-rata basis where applicable.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'We offer limited free access to select PYQs and tests so you can experience the platform. Paid plans may include a 7-day trial or refund window depending on promotions.'
    },
    {
      question: 'Can institutes or coaching centers use NEET 720?',
      answer: 'Yes. The Institute / Mentor plan supports multiple student accounts, batch analytics and white-labelling so you can run your own branded test platform.'
    },
    {
      question: 'What devices can I use NEET 720 on?',
      answer: 'You can use NEET 720 on any modern web browser on laptop, tablet or mobile for practice tests, analytics and doubt solving.'
    }
  ];

  return (
    <div style={{
      minHeight: '644px',
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      fontSize: '15px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Neet />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          background: 'radial-gradient(circle at top left, hsl(var(--secondary)) 0%, hsl(var(--background)) 52%, hsl(var(--secondary)) 100%)'
        }}>
          <div style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              paddingTop: '56px',
              paddingBottom: '64px'
            }}>
              {/* Hero Left */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'hsl(var(--accent-foreground))',
                  background: 'hsl(var(--accent))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  marginBottom: '16px'
                }}>
                  <iconify-icon icon="lucide:sparkles" style={{ fontSize: '14px' }}></iconify-icon>
                  <span>Now with AI doubt solver</span>
                </div>
                
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  marginBottom: '14px',
                  lineHeight: 1.2
                }}>
                  Achieve your dream NEET score with smart preparation
                </h1>
                
                <p style={{
                  fontSize: '15px',
                  color: 'hsl(var(--muted-foreground))',
                  marginBottom: '18px',
                  maxWidth: '520px'
                }}>
                  Plan, practice and analyse – all in one place. Join 10,000+ students using NEET 720 to crack medical entrance exams.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '10px 18px',
                  marginBottom: '22px'
                }}>
                  {['Smart study planner', 'Full mock test series', '24×7 AI doubt solver', 'Performance tracking'].map((item) => (
                    <div key={item} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: 'hsl(var(--foreground))'
                    }}>
                      <iconify-icon icon="lucide:check" style={{ fontSize: '24px', color: 'hsl(var(--accent))' }}></iconify-icon>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <button style={{
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
                  }} data-testid="button-start-free">
                    Start Free Trial
                  </button>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: 'transparent',
                    color: 'hsl(var(--primary))',
                    border: '1px solid hsl(var(--border))'
                  }} data-testid="button-view-demo">
                    View Demo
                  </button>
                </div>

                <div style={{
                  fontSize: '13px',
                  color: 'hsl(var(--muted-foreground))'
                }}>
                  No credit card required · Free 7-day trial
                </div>
              </div>

              {/* Hero Right - Illustration */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '420px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'hsl(var(--card))',
                  padding: '14px',
                  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  border: '1px solid hsl(var(--border))'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Dashboard Preview</span>
                    <span style={{
                      fontSize: '11px',
                      color: 'hsl(var(--success-foreground))',
                      background: 'hsl(var(--success))',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-md)'
                    }}>Live</span>
                  </div>
                  <div style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'hsl(var(--background))'
                  }}>
                    <img
                      src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f4f6f8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EDashboard%3C/text%3E%3C/svg%3E"
                      alt="Dashboard preview"
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '8px'
                  }}>
                    {[
                      { label: 'Accuracy', value: '94%' },
                      { label: 'Questions', value: '2,480' },
                      { label: 'Rank', value: '#142' }
                    ].map((stat) => (
                      <div key={stat.label} style={{
                        background: 'hsl(var(--secondary))',
                        borderRadius: 'var(--radius-md)',
                        padding: '6px 8px'
                      }}>
                        <div style={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))' }}>
                          {stat.label}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section style={{
          background: 'hsl(var(--background))',
          borderBottom: '1px solid hsl(var(--border))'
        }}>
          <div style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '18px',
              paddingBottom: '18px'
            }}>
              {[
                { label: 'Active Students', value: '10,000+' },
                { label: 'Practice Questions', value: '50,000+' },
                { label: 'Mock Tests', value: '200+' },
                { label: 'Success Rate', value: '98%' }
              ].map((item) => (
                <div key={item.label} style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'hsl(var(--secondary))'
                }}>
                  <div style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'hsl(var(--muted-foreground))',
                    marginBottom: '4px'
                  }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <Benefit />

        {/* Core Features & PYQ Section */}
        <section style={{ paddingTop: '44px', paddingBottom: '44px' }}>
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
                  <iconify-icon icon="lucide:layers" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>Core Features & Previous Year Questions</span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Master NEET pattern with exam-like practice
                </h2>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '480px'
              }}>
                From full-length mocks to quick quizzes, NEET 720 gives you multiple ways to revise and test before the real exam.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '18px'
            }}>
              {coreFeatures.map((feature, idx) => (
                <CoreFeatureCard key={idx} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section style={{
          paddingTop: '44px',
          paddingBottom: '44px',
          background: 'radial-gradient(circle at top, hsl(var(--secondary)) 0%, hsl(var(--background)) 48%)'
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
                  <iconify-icon icon="lucide:indian-rupee" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>Simple, Transparent Pricing</span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Choose a plan that matches your preparation stage
                </h2>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '480px'
              }}>
                Start with Starter, upgrade to Pro when the exam gets closer, or onboard your entire institute with our mentor plan.
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '26px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'hsl(var(--secondary))',
                borderRadius: '999px',
                padding: '4px',
                fontSize: '13px'
              }}>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Monthly
                </div>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  color: 'hsl(var(--muted-foreground))',
                  cursor: 'pointer'
                }}>
                  Yearly
                  <span style={{
                    fontSize: '11px',
                    color: 'hsl(var(--success-foreground))',
                    background: 'hsl(var(--success))',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-md)',
                    marginLeft: '8px'
                  }}>Save up to 25%</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '18px',
              alignItems: 'stretch'
            }}>
              {/* Starter Plan */}
              <div style={{
                background: 'hsl(var(--card))',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
                border: '1px solid hsl(var(--border))'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Starter</div>
                <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                  For early-stage learners building strong fundamentals.
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
                  ₹XXX<span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginLeft: '4px' }}>/ month</span>
                </div>
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px'
                }}>
                  {[
                    'Limited access to NEET PYQs',
                    'Basic chapter-wise and topic-wise tests',
                    'Standard performance analytics',
                    'Email support within 24–48 hours'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <iconify-icon icon="lucide:check" style={{ fontSize: '16px', color: 'hsl(var(--accent-foreground))' }}></iconify-icon>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: 'hsl(var(--primary))',
                  border: '1px solid hsl(var(--border))',
                  width: '100%'
                }}>
                  Get Starter Plan
                </button>
              </div>

              {/* Pro Plan (Highlighted) */}
              <div style={{
                background: 'hsl(var(--card))',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 20px 44px rgba(15, 23, 42, 0.2)',
                border: '1px solid hsl(var(--accent))',
                transform: 'translateY(-4px)'
              }}>
                <div style={{
                  alignSelf: 'flex-start',
                  fontSize: '11px',
                  color: 'hsl(var(--accent-foreground))',
                  background: 'hsl(var(--accent))',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}>Most Popular</div>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Pro</div>
                <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                  Complete NEET prep suite with AI support, tests and predictors.
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
                  ₹YYY<span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginLeft: '4px' }}>/ month or ₹ZZZ / year</span>
                </div>
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px'
                }}>
                  {[
                    'Full access to all NEET PYQs and question bank',
                    'Unlimited full tests, custom tests and fast quizzes',
                    'Advanced analytics with rank predictor',
                    'AI Doubt Solver with detailed explanations',
                    'College predictor and counselling support tools',
                    'Priority support & leaderboard access'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <iconify-icon icon="lucide:check" style={{ fontSize: '16px', color: 'hsl(var(--accent-foreground))' }}></iconify-icon>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button style={{
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
                  border: '1px solid hsl(var(--primary))',
                  width: '100%'
                }}>
                  Start Pro Plan
                </button>
                <div style={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))', marginTop: '4px' }}>
                  Best for class 11–12 aspirants in active preparation.
                </div>
              </div>

              {/* Institute Plan */}
              <div style={{
                background: 'hsl(var(--card))',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
                border: '1px solid hsl(var(--border))'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Institute / Mentor</div>
                <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                  For coaching centers, schools and private mentors managing batches.
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
                  Custom<span style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginLeft: '4px' }}>pricing</span>
                </div>
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px'
                }}>
                  {[
                    'Multiple student accounts with role-based access',
                    'Institute dashboard and batch-level analytics',
                    'Live performance tracking and reports',
                    'White-labelling options for your brand',
                    'Dedicated account manager'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <iconify-icon icon="lucide:check" style={{ fontSize: '16px', color: 'hsl(var(--accent-foreground))' }}></iconify-icon>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: 'hsl(var(--primary))',
                  border: '1px solid hsl(var(--border))',
                  width: '100%'
                }}>
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Reassurance Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '12px',
              marginTop: '26px'
            }}>
              {[
                { icon: 'lucide:shield-check', text: '100% Secure Payment' },
                { icon: 'lucide:refresh-ccw', text: '7-day Money Back' },
                { icon: 'lucide:check-circle', text: 'Cancel Anytime' },
                { icon: 'lucide:headset', text: '24/7 Support' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'hsl(var(--secondary))',
                  borderRadius: 'var(--radius-lg)',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'hsl(var(--muted-foreground))'
                }}>
                  <iconify-icon icon={item.icon} style={{ fontSize: '16px' }}></iconify-icon>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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
                  <iconify-icon icon="lucide:quote" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>Student Success Stories</span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Hear from NEET toppers
                </h2>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '480px'
              }}>
                Real students, real results. See how NEET 720 helped them achieve their medical college dreams.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '18px'
            }}>
              {testimonials.map((testimonial, idx) => (
                <div key={idx} style={{
                  background: 'hsl(var(--card))',
                  borderRadius: 'var(--radius-xl)',
                  padding: '16px',
                  boxShadow: '0 14px 34px rgba(15, 23, 42, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderTop: '3px solid hsl(var(--primary))'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '999px',
                        background: 'hsl(var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{testimonial.name}</div>
                        <div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>
                          {testimonial.meta}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'hsl(var(--success-foreground))',
                      background: 'hsl(var(--success))',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-md)'
                    }}>{testimonial.badge}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'hsl(var(--foreground))' }}>
                    {testimonial.text}
                  </div>
                  <div style={{ fontSize: '12px', color: 'hsl(var(--accent-foreground))' }}>
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ paddingTop: '44px', paddingBottom: '44px' }}>
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
                  <iconify-icon icon="lucide:help-circle" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>FAQs</span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Answers to common questions
                </h2>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '480px'
              }}>
                Can't find what you're looking for? Reach out via email or schedule a quick call with our team.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{
                  background: 'hsl(var(--card))',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{faq.question}</div>
                    <iconify-icon icon="lucide:plus" style={{ fontSize: '18px', color: 'hsl(var(--muted-foreground))' }}></iconify-icon>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'hsl(var(--muted-foreground))',
                    marginTop: '6px'
                  }}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
          color: 'hsl(var(--primary-foreground))'
        }}>
          <div style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '28px',
              paddingBottom: '28px'
            }}>
              <div>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  Ready to transform your NEET preparation?
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  Join thousands of focused aspirants using NEET 720 to plan, practice and perform better in the exam.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: 'hsl(var(--primary-foreground))',
                  color: 'hsl(var(--primary))',
                  border: '1px solid hsl(var(--primary-foreground))'
                }}>
                  Get Started Now
                </button>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: 'hsl(var(--primary-foreground))',
                  border: '1px solid rgba(255, 255, 255, 0.4)'
                }}>
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'hsl(var(--sidebar))',
        color: 'hsl(var(--sidebar-foreground))'
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 3fr',
            gap: '24px',
            paddingTop: '24px',
            paddingBottom: '24px',
            fontSize: '13px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'hsl(var(--primary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary-foreground))',
                  fontSize: '14px',
                  fontWeight: 600
                }}>N</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>NEET 720</div>
                  <div style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>
                    Your all-in-one AI-powered NEET preparation partner.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'hsl(var(--muted-foreground))' }}>
                {['Home', 'Features', 'Pricing', 'Schedule Demo', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Cancellation Policy'].map((link) => (
                  <a key={link} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{link}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                Contact & Support
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'hsl(var(--muted-foreground))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <iconify-icon icon="lucide:phone" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>+91-98765-43210</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <iconify-icon icon="lucide:mail" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>support@neet720.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <iconify-icon icon="lucide:map-pin" style={{ fontSize: '16px' }}></iconify-icon>
                  <span>India · Online platform</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {['lucide:facebook', 'lucide:instagram', 'lucide:twitter', 'lucide:youtube'].map((icon) => (
                    <div key={icon} style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <iconify-icon icon={icon} style={{ fontSize: '16px' }}></iconify-icon>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', marginTop: '6px' }}>
                  Support available all 7 days · 10 AM – 7 PM IST
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Iconify Script */}
      <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
    </div>
  );
}