import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@config/firebase'
import Badge from '@components/ui/Badge/Badge'
import Button from '@components/ui/Button/Button'
import Spinner from '@components/ui/Spinner/Spinner'
import './Mensajes.css'

export default function Mensajes() {
  const [mensajes, setMensajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [seleccionado, setSeleccionado] = useState(null)

  const cargar = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'mensajes'), orderBy('fecha', 'desc')))
      setMensajes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const marcarLeido = async (id) => {
    await updateDoc(doc(db, 'mensajes', id), { leido: true })
    setMensajes((prev) => prev.map((m) => m.id === id ? { ...m, leido: true } : m))
  }

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este mensaje?')) return
    await deleteDoc(doc(db, 'mensajes', id))
    setMensajes((prev) => prev.filter((m) => m.id !== id))
    if (seleccionado?.id === id) setSeleccionado(null)
  }

  const abrirMensaje = (m) => {
    setSeleccionado(m)
    if (!m.leido) marcarLeido(m.id)
  }

  const fechaStr = (ts) => ts?.toDate
    ? ts.toDate().toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div className="admin-mensajes-layout">
      {/* Lista */}
      <section className="mensajes-list" aria-label="Lista de mensajes de contacto">
        <header className="mensajes-list__header">
          <h1 className="admin-header__title">Mensajes</h1>
          <Button variant="ghost" size="sm" onClick={cargar} aria-label="Recargar mensajes">↻ Recargar</Button>
        </header>

        {loading ? (
          <div style={{ padding: 'var(--space-10)', textAlign: 'center' }}><Spinner size="md" /></div>
        ) : mensajes.length === 0 ? (
          <p className="mensajes-empty">No hay mensajes de contacto.</p>
        ) : (
          <ul role="list" className="mensajes-ul">
            {mensajes.map((m) => (
              <li key={m.id}>
                <button
                  className={`mensaje-item ${seleccionado?.id === m.id ? 'mensaje-item--active' : ''} ${!m.leido ? 'mensaje-item--unread' : ''}`}
                  onClick={() => abrirMensaje(m)}
                  aria-current={seleccionado?.id === m.id ? 'true' : undefined}
                >
                  <div className="mensaje-item__top">
                    <span className="mensaje-item__nombre">{m.nombre}</span>
                    {!m.leido && <Badge variant="primary" size="sm">Nuevo</Badge>}
                  </div>
                  <div className="mensaje-item__asunto">{m.asunto}</div>
                  <div className="mensaje-item__fecha">{fechaStr(m.creadoEn)}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Detalle */}
      <section className="mensajes-detalle" aria-label="Detalle del mensaje seleccionado" aria-live="polite">
        {seleccionado ? (
          <>
            <header className="mensajes-detalle__header">
              <div>
                <h2 className="mensajes-detalle__asunto">{seleccionado.asunto}</h2>
                <p className="mensajes-detalle__meta">{seleccionado.nombre} &bull; {seleccionado.email} &bull; {fechaStr(seleccionado.creadoEn)}</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => eliminar(seleccionado.id)}>Eliminar</Button>
            </header>
            <div className="mensajes-detalle__body">
              {seleccionado.mensaje}
            </div>
            <div className="mensajes-detalle__actions">
              <a href={`mailto:${seleccionado.email}?subject=Re: ${encodeURIComponent(seleccionado.asunto)}`} className="btn-responder">
                Responder por correo
              </a>
            </div>
          </>
        ) : (
          <div className="mensajes-detalle__placeholder">
            <span aria-hidden="true">✉️</span>
            <p>Selecciona un mensaje para leerlo</p>
          </div>
        )}
      </section>
    </div>
  )
}
