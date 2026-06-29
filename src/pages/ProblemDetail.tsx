import { useParams } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function ProblemDetail() {
  const { problemId } = useParams()
  return (
    <PageFrame showBack title="Problem">
      <p className="text-text-muted">Problem id: {problemId}</p>
    </PageFrame>
  )
}
