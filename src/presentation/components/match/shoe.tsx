export const Shoe = () => {
  return (
    <>
      <div className="hidden md:block absolute top-28 right-4">
        <div className="relative h-40 w-24">
          <div className="absolute inset-0 transform translate-x-0 translate-y-0">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-1 translate-y-1 z-10">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-2 translate-y-2 z-20">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-3 translate-y-3 z-30">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
        </div>
      </div>
    </>
  );
};
