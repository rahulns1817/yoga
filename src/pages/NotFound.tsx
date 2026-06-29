import { Link } from 'react-router-dom'
import PageFrame from '../components/PageFrame'

export default function NotFound() {
  return (
    <PageFrame showBack title="Not found">
      <p className="text-text-muted mb-6">Couldn't find that one.</p>
      <Link
        to="/home"
        className="inline-block rounded-btn bg-primary text-white px-5 py-3 font-medium hover:bg-primary-hover transition"
      >
        Back to home
      </Link>
    </PageFrame>
  )
}
