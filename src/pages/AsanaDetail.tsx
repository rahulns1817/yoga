import { useParams } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function AsanaDetail() {
  const { problemId, asanaId } = useParams()
  return (
    <PageFrame showBack title="Asana">
      <p className="text-text-muted">{problemId} / {asanaId}</p>
    </PageFrame>
  )
}
