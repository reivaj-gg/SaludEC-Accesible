import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@config/firebase'
import StatisticCard from '@components/common/StatisticCard/StatisticCard'
import Spinner from '@components/ui/Spinner/Spinner'
import { ejecutarSeed } from '@services/seed.service'
import './Dashboard.css'

const ACCIONES = [
  { to: '/admin/articulos', icon: '📝', label: 'Gestionar artículos', desc: 'Crear, editar y publicar contenido editorial de cada módulo.' },
  { to: '/admin/noticias', icon: '📰', label: 'Gestionar noticias', desc: 'Publicar y administrar las noticias de salud de la plataforma.' },
  { to: '/admin/mensajes', icon: '✉️', label: 'Ver mensajes', desc: 'Lee y responde los mensajes recibidos desde el formulario de contacto.' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [seedState, setSeedState] = useState('idle') // idle | running | done | error
  const [seedLog, setSeedLog] = useState([])
  const logRef = useRef(null)

  const handleSeed = async () => {
    if (seedState === 'running') return
    setSeedState('running')
    setSeedLog([])
    try {
      await ejecutarSeed((msg) => {
        setSeedLog((prev) => [...prev, msg])
        setTimeout(() => logRef.current?.scrollTo(0, logRef.current.scrollHeight), 50)
      })
      setSeedState('done')
    } catch (e) {
      setSeedLog((prev) => [...prev, `Error: ${e.message}`])
      setSeedState('error')
    }
  }

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [artRef, notRef, msgRef] = [
          collection(db, 'articulos'),
          collection(db, 'noticias'),
          collection(db, 'mensajes'),
        ]
        const [art, not, msg] = await Promise.all([
          getCountFromServer(artRef),
          getCountFromServer(notRef),
          getCountFromServer(msgRef),
        ])
        setStats({
          articulos: art.data().count,
          noticias: not.data().count,
          mensajes: msg.data().count,
        })
      } catch {
        setStats({ articulos: 0, noticias: 0, mensajes: 0 })
      }
    }
    fetchCounts()
  }, [])

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="admin-header__title">Dashboard</h1>
        <p className="admin-header__subtitle">Resumen del estado de la plataforma VitaPrevent</p>
      </header>

      <section aria-labelledby="stats-dash-title">
        <h2 id="stats-dash-title" className="dashboard-section-title">Estadísticas</h2>
        {stats ? (
          <div className="dashboard-stats">
            <StatisticCard value={stats.articulos} label="Artículos totales" variant="blue" />
            <StatisticCard value={stats.noticias} label="Noticias totales" variant="teal" />
            <StatisticCard value={stats.mensajes} label="Mensajes recibidos" variant="purple" />
          </div>
        ) : (
          <div style={{ padding: 'var(--space-8)' }}>
            <Spinner size="md" label="Cargando estadísticas…" />
          </div>
        )}
      </section>

      <section aria-labelledby="acciones-title">
        <h2 id="acciones-title" className="dashboard-section-title">Acciones rápidas</h2>
        <div className="dashboard-acciones">
          {ACCIONES.map((a) => (
            <Link key={a.to} to={a.to} className="dashboard-accion">
              <span className="dashboard-accion__icon" aria-hidden="true">{a.icon}</span>
              <div>
                <strong className="dashboard-accion__label">{a.label}</strong>
                <p className="dashboard-accion__desc">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="seed-title" className="seed-section">
        <h2 id="seed-title" className="dashboard-section-title">Contenido de ejemplo</h2>
        <div className="seed-card">
          <div className="seed-card__header">
            <span className="seed-card__icon" aria-hidden="true">🌱</span>
            <div>
              <strong className="seed-card__label">Cargar contenido inicial</strong>
              <p className="seed-card__desc">
                Inserta artículos, noticias y recursos de biblioteca con contenido real sobre servicios públicos de salud del Ecuador (MSP, IESS, ECU 911). Los documentos ya existentes se omiten automáticamente.
              </p>
            </div>
          </div>

          <button
            className={`seed-btn seed-btn--${seedState}`}
            onClick={handleSeed}
            disabled={seedState === 'running'}
            aria-busy={seedState === 'running'}
          >
            {seedState === 'running' && <Spinner size="sm" label="" />}
            {seedState === 'idle' && 'Cargar contenido de ejemplo'}
            {seedState === 'running' && 'Cargando…'}
            {seedState === 'done' && 'Contenido cargado correctamente'}
            {seedState === 'error' && 'Error — reintentar'}
          </button>

          {seedLog.length > 0 && (
            <div
              ref={logRef}
              className="seed-log"
              role="log"
              aria-label="Registro de carga de contenido"
              aria-live="polite"
              tabIndex={0}
            >
              {seedLog.map((line, i) => (
                <p key={i} className="seed-log__line">{line}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
