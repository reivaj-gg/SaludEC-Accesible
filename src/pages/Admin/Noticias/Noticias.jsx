import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@config/firebase'
import Button from '@components/ui/Button/Button'
import Badge from '@components/ui/Badge/Badge'
import Spinner from '@components/ui/Spinner/Spinner'
import Modal from '@components/common/Modal/Modal'
import FormField from '@components/common/FormField/FormField'
import './Noticias.css'

const CATEGORIAS = ['Nutrición', 'Actividad Física', 'Salud Mental', 'Prevención', 'Investigación', 'Política sanitaria']
const FORM_INICIAL = { titulo: '', resumen: '', categoria: '', publicado: true }

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(FORM_INICIAL)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const cargar = async () => {
    setLoading(true)
    const snap = await getDocs(query(collection(db, 'noticias'), orderBy('creadoEn', 'desc')))
    setNoticias(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const abrirNuevo = () => {
    setEditando(null)
    setForm(FORM_INICIAL)
    setErrors({})
    setModal(true)
  }

  const abrirEditar = (n) => {
    setEditando(n)
    setForm({ titulo: n.titulo || '', resumen: n.resumen || '', categoria: n.categoria || '', publicado: n.publicado ?? true })
    setErrors({})
    setModal(true)
  }

  const validate = () => {
    const e = {}
    if (!form.titulo.trim()) e.titulo = 'El título es obligatorio.'
    if (!form.resumen.trim()) e.resumen = 'El resumen es obligatorio.'
    return e
  }

  const guardar = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    try {
      if (editando) {
        await updateDoc(doc(db, 'noticias', editando.id), { ...form, actualizadoEn: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'noticias'), { ...form, creadoEn: serverTimestamp() })
      }
      setModal(false)
      await cargar()
    } finally {
      setSaving(false)
    }
  }

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta noticia?')) return
    await deleteDoc(doc(db, 'noticias', id))
    setNoticias((p) => p.filter((n) => n.id !== id))
  }

  const togglePublicado = async (n) => {
    await updateDoc(doc(db, 'noticias', n.id), { publicado: !n.publicado })
    setNoticias((p) => p.map((x) => x.id === n.id ? { ...x, publicado: !x.publicado } : x))
  }

  const fechaStr = (ts) => ts?.toDate
    ? ts.toDate().toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div className="admin-section-page">
      <header className="admin-section-page__header">
        <div>
          <h1 className="admin-header__title">Noticias</h1>
          <p className="admin-header__subtitle">Gestiona las noticias publicadas en la plataforma</p>
        </div>
        <Button variant="primary" onClick={abrirNuevo}>+ Nueva noticia</Button>
      </header>

      {loading ? (
        <div style={{ padding: 'var(--space-16)', display: 'flex', justifyContent: 'center' }}><Spinner size="lg" /></div>
      ) : (
        <div className="articulos-table-wrap">
          <table className="admin-table">
            <caption className="sr-only">Listado de noticias</caption>
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Categoría</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {noticias.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 'var(--space-10)' }}>No hay noticias publicadas.</td></tr>
              ) : noticias.map((n) => (
                <tr key={n.id}>
                  <td className="articulos-td-titulo">{n.titulo}</td>
                  <td>{n.categoria || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{fechaStr(n.creadoEn)}</td>
                  <td>
                    <button onClick={() => togglePublicado(n)} className="estado-toggle" aria-label={`${n.publicado ? 'Ocultar' : 'Publicar'} "${n.titulo}"`}>
                      <Badge variant={n.publicado ? 'success' : 'warning'}>{n.publicado ? 'Publicada' : 'Borrador'}</Badge>
                    </button>
                  </td>
                  <td className="articulos-td-actions">
                    <Button variant="ghost" size="sm" onClick={() => abrirEditar(n)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => eliminar(n.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editando ? 'Editar noticia' : 'Nueva noticia'}>
        <div className="articulo-form">
          <FormField id="not-titulo" label="Título" required value={form.titulo} error={errors.titulo}
            onChange={(e) => setForm((p) => ({ ...p, titulo: e.target.value }))}
          />
          <div className="form-field">
            <label htmlFor="not-categoria" className="form-field__label">Categoría</label>
            <select id="not-categoria" value={form.categoria} onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))} className="form-field__control">
              <option value="">Sin categoría</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <FormField id="not-resumen" label="Resumen" as="textarea" required rows={4} value={form.resumen} error={errors.resumen}
            hint="Aparece en la tarjeta de la noticia (máx. 200 caracteres recomendados)"
            onChange={(e) => setForm((p) => ({ ...p, resumen: e.target.value }))}
          />
          <label className="form-field__label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.publicado} onChange={(e) => setForm((p) => ({ ...p, publicado: e.target.checked }))} />
            Publicar inmediatamente
          </label>
          <div className="articulo-form__actions">
            <Button variant="outline" onClick={() => setModal(false)}>Cancelar</Button>
            <Button variant="primary" loading={saving} onClick={guardar}>
              {editando ? 'Guardar cambios' : 'Crear noticia'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
