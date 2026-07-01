import { useId } from 'react'
import { Link } from 'react-router-dom'
import './ContextualHelp.css'

export default function ContextualHelp({ links }) {
  const titleId = useId()

  return (
    <aside className="contextual-help" aria-labelledby={titleId}>
      <h2 id={titleId} className="contextual-help__title">¿Necesitas más información?</h2>
      <ul className="contextual-help__list" role="list">
        {links.map(({ href, label, desc, tel, external }) => (
          <li key={href} className="contextual-help__item">
            {tel ? (
              <a href={href} className="contextual-help__link contextual-help__link--tel">
                <span aria-hidden="true">📞</span>
                <span>
                  <strong>{label}</strong>
                  {desc && <span className="contextual-help__desc"> — {desc}</span>}
                </span>
              </a>
            ) : external ? (
              <a href={href} className="contextual-help__link" target="_blank" rel="noreferrer" aria-label={`${label} (se abre en nueva pestaña)`}>
                <span aria-hidden="true">↗</span>
                <span>
                  <strong>{label}</strong>
                  {desc && <span className="contextual-help__desc"> — {desc}</span>}
                </span>
              </a>
            ) : (
              <Link to={href} className="contextual-help__link">
                <span aria-hidden="true">→</span>
                <span>
                  <strong>{label}</strong>
                  {desc && <span className="contextual-help__desc"> — {desc}</span>}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}
