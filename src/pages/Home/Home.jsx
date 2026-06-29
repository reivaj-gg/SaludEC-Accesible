import { Link } from 'react-router-dom'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import { ROUTES } from '@config/routes'
import './Home.css'

const MODULES = [
  {
    icon: '🥗',
    title: 'Nutrición',
    description: 'Guías alimenticias, recetas saludables y todo sobre hidratación y vitaminas.',
    path: ROUTES.NUTRICION,
    color: 'green',
  },
  {
    icon: '🏃',
    title: 'Actividad Física',
    description: 'Rutinas para todos los niveles, estiramientos y ejercicios de oficina.',
    path: ROUTES.ACTIVIDAD_FISICA,
    color: 'orange',
  },
  {
    icon: '🧠',
    title: 'Salud Mental',
    description: 'Mindfulness, manejo del estrés, sueño y bienestar emocional.',
    path: ROUTES.SALUD_MENTAL,
    color: 'purple',
  },
  {
    icon: '🛡️',
    title: 'Prevención',
    description: 'Información sobre diabetes, hipertensión, vacunación y chequeos médicos.',
    path: ROUTES.PREVENCION,
    color: 'blue',
  },
]

const STATS = [
  { value: '9+', label: 'Módulos de salud' },
  { value: '100%', label: 'Accesible WCAG AA' },
  { value: '∞', label: 'Recursos gratuitos' },
  { value: '24/7', label: 'Disponible siempre' },
]

export default function Home() {
  return (
    <PageWrapper title="Inicio" description="Plataforma digital de salud preventiva. Nutrición, actividad física, salud mental y prevención de enfermedades.">

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__text animate-fade-in-up">
            <span className="hero__tag">Plataforma de salud preventiva</span>
            <h1 id="hero-title" className="hero__title">
              Tu bienestar<br />
              <span className="hero__title-accent">comienza con la</span><br />
              prevención
            </h1>
            <p className="hero__description">
              Accede a información confiable sobre salud física y mental, diseñada para
              todas las personas, sin importar su edad o condición.
            </p>
            <div className="hero__actions">
              <Link to={ROUTES.NUTRICION} className="btn btn--primary btn--lg">
                Explorar contenido
              </Link>
              <Link to={ROUTES.NOSOTROS} className="btn btn--outline btn--lg hero__btn-outline">
                Conocer más
              </Link>
            </div>
          </div>

          <div className="hero__visual animate-fade-in" aria-hidden="true">
            <div className="hero__card-float hero__card-float--1">
              <span>🥗</span>
              <div>
                <strong>Nutrición</strong>
                <p>Guías alimenticias</p>
              </div>
            </div>
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__orb hero__orb--3" />
            <div className="hero__card-float hero__card-float--2">
              <span>💪</span>
              <div>
                <strong>Actividad</strong>
                <p>Rutinas para ti</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-stats section section--sm" aria-label="Estadísticas de la plataforma">
        <div className="container">
          <ul className="home-stats__list" role="list">
            {STATS.map((s) => (
              <li key={s.label} className="home-stats__item">
                <span className="home-stats__value" aria-label={s.value}>{s.value}</span>
                <span className="home-stats__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Módulos ── */}
      <section className="section" aria-labelledby="modules-title">
        <div className="container">
          <header className="section__header">
            <span className="section__tag">Explora</span>
            <h2 id="modules-title" className="section__title">Áreas de salud preventiva</h2>
            <p className="section__subtitle">
              Información organizada por especialidades, accesible para toda la familia.
            </p>
          </header>

          <ul className="modules-grid" role="list">
            {MODULES.map((mod) => (
              <li key={mod.path}>
                <Link to={mod.path} className={`module-card module-card--${mod.color}`}>
                  <span className="module-card__icon" aria-hidden="true">{mod.icon}</span>
                  <h3 className="module-card__title">{mod.title}</h3>
                  <p className="module-card__desc">{mod.description}</p>
                  <span className="module-card__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Biblioteca + Noticias CTA ── */}
      <section className="section section--dark" aria-labelledby="resources-title">
        <div className="container">
          <header className="section__header">
            <span className="section__tag" style={{ color: 'var(--color-blue-300)' }}>Recursos</span>
            <h2 id="resources-title" className="section__title" style={{ color: 'var(--color-white)' }}>
              Accede a nuestra biblioteca digital
            </h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Infografías, videos, podcasts y guías descargables completamente gratuitos.
            </p>
          </header>
          <div className="home-cta-row">
            <Link to={ROUTES.BIBLIOTECA} className="btn btn--primary btn--lg">
              Ver biblioteca digital
            </Link>
            <Link to={ROUTES.NOTICIAS} className="btn btn--outline btn--lg home-cta-row__outline">
              Leer noticias de salud
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contacto CTA ── */}
      <section className="section section--sm" aria-labelledby="contact-cta-title">
        <div className="container home-contact-cta">
          <div>
            <h2 id="contact-cta-title" className="home-contact-cta__title">
              ¿Tienes preguntas sobre tu salud?
            </h2>
            <p className="home-contact-cta__desc">
              Nuestro equipo puede orientarte y recomendarte los recursos más adecuados.
            </p>
          </div>
          <Link to={ROUTES.CONTACTO} className="btn btn--primary btn--lg">
            Contactarnos
          </Link>
        </div>
      </section>

    </PageWrapper>
  )
}
