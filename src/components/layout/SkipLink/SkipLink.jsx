import './SkipLink.css'

export default function SkipLink({ extraLinks = [] }) {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      {extraLinks.map(({ href, label }) => (
        <a key={href} href={href} className="skip-link">
          {label}
        </a>
      ))}
    </div>
  )
}
