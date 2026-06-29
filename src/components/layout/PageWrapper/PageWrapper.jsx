import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import './PageWrapper.css'

export default function PageWrapper({ children, title, description }) {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const pageTitle = title ? `${title} | VitaPrevent` : 'VitaPrevent — Servicios públicos de salud'
    document.title = pageTitle

    if (isFirstRender.current) {
      // Carga inicial: NO mover foco — Tab debe ir SkipLink → Navbar → contenido
      isFirstRender.current = false
      return
    }
    // Navegación SPA: mueve foco al main para que el lector anuncie el cambio de página
    mainRef.current?.focus()
  }, [pathname, title])

  return (
    <main
      id="main-content"
      ref={mainRef}
      tabIndex={-1}
      className="page-wrapper"
      aria-label={title || 'Contenido principal'}
    >
      {description && (
        <meta name="description" content={description} />
      )}
      {children}
    </main>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
}
