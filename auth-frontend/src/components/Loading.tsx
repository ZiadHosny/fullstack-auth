import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { selectLoading } from "@/api/loading/loadingSlice";

const Loading = () => {
  const loading = useSelector(selectLoading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
        <Loader2 className="animate-spin text-blue-500" />
        <span className="text-blue-500 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
