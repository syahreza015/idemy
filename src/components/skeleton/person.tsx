const PersonSkeleton = () => {
  return (
    <div className="flex justify-start items-stretch py-2 px-4 border border-stone-300 rounded-lg gap-4">
      <div className="flex justify-start items-stretch gap-4 flex-grow">
        <div className="h-10 aspect-square rounded-full bg-stone-400 animate-pulse"></div>
        <div className="flex flex-col justify-start items-stretch gap-1 flex-grow">
          <div className="h-4 rounded-md bg-stone-400 animate-pulse"></div>
          <div className="h-2 rounded-full bg-stone-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonSkeleton;
