import { CgSpinner } from "react-icons/cg";

function CLoadingSpinner({
  className = "",
  color = "white",
}: {
  className?: string;
  color?: string;
}): React.ReactNode {
  return (
    <div className="animate-spin">
      <CgSpinner className={className} color={color} />
    </div>
  );
}

export default CLoadingSpinner;
