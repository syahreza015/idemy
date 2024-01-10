const OneClassSkeleton = () => {
  return (
      <div className="flex flex-col md:flex-row justify-start flex-grow gap-4">
        <div className="w-full md:w-1/2 rounded-md h-min aspect-video bg-stone-400 animate-pulse"></div>
        <div className="flex w-full md:w-1/2 flex-col items-stretch justify-start gap-2">
          <span className="h-5 rounded-full bg-stone-400 animate-pulse w-1/2"></span>
          <span className="h-6 rounded-full bg-stone-400 animate-pulse w-24"></span>
          <span className="h-12 rounded-md bg-stone-400 animate-pulse"></span>
          <div className="flex flex-wrap items-stretch justify-start gap-2 ">
            <span className="h-6 rounded-full bg-stone-400 animate-pulse w-24"></span>
            <span className="h-6 rounded-full bg-stone-400 animate-pulse w-24"></span>
          </div>
        </div>
      </div>
  );
};

export default OneClassSkeleton;
