import React from "react";

interface LoadingSkeletonProps {
  rows: number;
  show: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows, show }) => {
  return show ? (
    <div role="status" className="w-[100%] animate-pulse">
      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"
          style={{ marginBottom: index === rows - 1 ? "0" : "10px" }}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  ) : null;
};

export default LoadingSkeleton;
