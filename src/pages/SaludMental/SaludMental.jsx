import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'

export default function SaludMental() {
  return (
    <PageWrapper title="SaludMental">
      <div className="container" style={{ paddingBlock: 'var(--space-8) var(--space-20)' }}>
        <Breadcrumb />
        <h1>SaludMental</h1>
        <p>Contenido en desarrollo.</p>
      </div>
    </PageWrapper>
  )
}
