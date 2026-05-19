type MetricItemProps = {
  label: string;
  value: string;
};

export const MetricItem = ({ label, value }: MetricItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-on-surface text-2xl font-bold sm:text-3xl">{value}</p>
      <p className="text-on-surface-variant text-xs sm:text-sm">{label}</p>
    </div>
  );
};
