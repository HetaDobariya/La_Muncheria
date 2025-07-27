import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-blue-600">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
      <div className="text-2xl">Loading...</div>
    </div>
  );
};

export default Loading;
