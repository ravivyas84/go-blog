type StatusPillProps = {
  status: 'active' | 'on-hold';
};

export function StatusPill({ status }: StatusPillProps) {
  const label = status === 'active' ? 'Active' : 'On Hold';

  return <span className={`status-pill status-pill--${status}`}>{label}</span>;
}
