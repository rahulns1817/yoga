interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-text-muted fill-none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={11} cy={11} r={7} />
        <line x1={20} y1={20} x2={16.65} y2={16.65} />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-pill bg-surface border border-border pl-11 pr-4 text-base placeholder:text-text-muted focus:outline-none focus:border-primary transition"
      />
    </label>
  )
}
