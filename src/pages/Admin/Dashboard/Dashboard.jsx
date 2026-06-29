import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatisticCard from '@components/common/StatisticCard/StatisticCard'
import './Dashboard.css'

const ACCIONES = [
  { to: '/admin/articulos', icon: '📝', label: 'Gestionar artículos', desc: 'Crear, editar y publicar contenido editorial de cada módulo.' },
  { to: '/admin/mensajes', icon: '✉️', label: 'Ver mensajes', desc: 'Lee y responde los mensajes recibidos desde el formulario de contacto.' },
]

export default function AdminDashboard() {
  const [stats] = useState({ articulos: 0, noticias: 0, mensajes: 0 })

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="admin-header__title">Dashboard</h1>
        <p className="admin-header__subtitle">Resumen del estado de la plataforma VitaPrevent</p>
      </header>

      <section aria-labelledby="stats-dash-title">
        <h2 id="stats-dash-title" className="dashboard-section-title">Estadísticas</h2>
        <div className="dashboard-stats">
          <StatisticCard value={stats.articulos} label="Artículos publicados" variant="blue" />
          <StatisticCard value={stats.noticias} label="Noticias publicadas" variant="teal" />
          <StatisticCard value={stats.mensajes} label="Mensajes recibidos" variant="purple" />
        </div>
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
    </div>
  )
}
