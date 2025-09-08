function CAmbientCircles(): React.ReactNode {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 size-[480px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 size-[520px] rounded-full bg-indigo-500/20 blur-[110px]" />
      <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />
    </div>
  );
}

export default CAmbientCircles;
