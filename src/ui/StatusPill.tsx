type StatusPillProps = {
  status: 'active' | 'on-hold' | 'shutdown';
};

export function StatusPill({ status }: StatusPillProps) {
  const label = status === 'active' ? 'Active' : status === 'on-hold' ? 'On Hold' : 'Shutdown';

  return <span className={`status-pill status-pill--${status}`}>{label}</span>;
}
