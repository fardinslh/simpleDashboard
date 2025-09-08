import CAmbientCircles from "@/components/CAmbientCircles";
import CLoadingSpinner from "@/components/CLoadingSpinner";

function DashboardLoading(): React.ReactNode {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <CAmbientCircles />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CLoadingSpinner className="size-8 max-sm:size-5" />
      </div>
    </div>
  );
}

export default DashboardLoading;
