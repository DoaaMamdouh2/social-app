import { GridLoader } from "react-spinners";

function Loading() {
  return (
  <div className="flex justify-center items-center min-h-screen z-50 inset-0 bg-page-bg fixed">
<GridLoader  color="#C9A0A0"/>
  </div>
)
}

export default Loading