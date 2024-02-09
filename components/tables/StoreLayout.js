const StoreLayout = () => {
  return (
    <>
      <div className="absolute top-0 w-2/3 h-2 bg-gray-200 border left-1/2 -translate-x-1/2 rounded-full">
        <div className="w-2 h-full bg-gray-600 absolute left-1/3 -translate-x-1/3" />
        <div className="w-2 h-full bg-gray-600 absolute right-1/3 translate-x-1/3" />
      </div>
      <div className="absolute bottom-48 w-2/3 left-1/2 -translate-x-1/2 h-52">
        <div className="absolute w-36 text-xl font-bold h-full bg-gray-200 border left-0 flex justify-center items-center">
          w.c.
        </div>
      </div>
      <div className="text-xl font-bold absolute bottom-0 rounded-t-full w-2/3 h-16 bg-gray-200 border left-1/2 -translate-x-1/2 flex items-center justify-center">
        bar
      </div>
    </>
  );
};

export default StoreLayout;
