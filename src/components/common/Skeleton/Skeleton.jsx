import PropTypes from 'prop-types'
import './Skeleton.css'

export function Skeleton({ width, height, borderRadius, className = '' }) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton className="skeleton-card__img" />
      <div className="skeleton-card__body">
        <Skeleton className="skeleton-card__tag" />
        <Skeleton className="skeleton-card__title" />
        <Skeleton className="skeleton-card__title skeleton-card__title--short" />
        <Skeleton className="skeleton-card__line" />
        <Skeleton className="skeleton-card__line" />
        <Skeleton className="skeleton-card__line skeleton-card__line--short" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="cards-grid" role="status" aria-label="Cargando contenido…">
      <span className="sr-only">Cargando…</span>
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
}
