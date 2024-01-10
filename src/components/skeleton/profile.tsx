const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-stretch justify-start gap-4 p-2 md:flex-row">
      <div className="w-full rounded-lg md:w-1/2 h-min aspect-video bg-stone-300"></div>
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex items-stretch justify-start">
          <span className="w-1/2 h-5 rounded-full bg-stone-400 animate-pulse"></span>
          <div className="flex items-stretch justify-end gap-2 ml-auto">
            {Array.from(
              {
                length: 2,
              },
              (_, index) => index + 1
            ).map((item) => (
              <div key={item} className="w-12 h-4 rounded-full bg-stone-400 animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="flex items-stretch justify-start gap-2">
          {Array.from(
            {
              length: 3,
            },
            (_, index) => index + 1
          ).map((item) => (
            <div key={item} className="h-4 rounded-full w-14 bg-stone-400 animate-pulse"></div>
          ))}
        </div>
        <span className="h-6 rounded-md bg-stone-400 animate-pulse"></span>
        <span className="h-6 rounded-md bg-stone-400 animate-pulse"></span>
        <span className="h-6 rounded-md bg-stone-400 animate-pulse"></span>
        <div className="flex items-stretch justify-between mt-auto">
          <div className="w-40 h-4 ml-auto rounded-full bg-stone-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
