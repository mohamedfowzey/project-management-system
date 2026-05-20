 const TableSkeleton = () => {
  return (
    <div className="p-5 animate-pulse">
      {/* Search Skeleton */}
      <div className="h-10 w-full rounded-lg bg-gray-300 dark:bg-slate-500 mb-6"></div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-6 rounded bg-gray-300 dark:bg-slate-500"
          ></div>
        ))}
      </div>

      {/* Table Rows */}
      {[1, 2, 3, 4, 5].map((row) => (
        <div key={row} className="grid grid-cols-6 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6].map((col) => (
            <div
              key={col}
              className="h-5 rounded bg-gray-200 dark:bg-slate-500"
            ></div>
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-end gap-12 items-center mt-8">
        <div className="h-6 w-52 rounded bg-gray-300 dark:bg-slate-500"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded bg-gray-300 dark:bg-slate-500"></div>
          <div className="h-8 w-8 rounded bg-gray-300 dark:bg-slate-500"></div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
