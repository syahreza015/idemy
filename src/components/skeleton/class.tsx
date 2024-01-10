const ClassSkeletonComponent = () => {
  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-2 p-2 bg-white border rounded-lg border-stone-300">
      <div className="rounded-md bg-stone-400 animate-pulse aspect-square"></div>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="w-1/2 h-4 rounded-full bg-stone-400 animate-pulse"></div>
        <div className="h-12 rounded-md bg-stone-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ClassSkeletonComponent;
