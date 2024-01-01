const CardSkeleton = () => {
  return (
    <div className="prompt_card animate-pulse">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3">
          <div className="bg-gray-300 rounded-full h-8 w-8"></div>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-bold font-gray-900 bg-gray-300 h-4 w-20"></h3>
            <p className="font-inter text-sm text-gray-500 bg-gray-300 h-3 w-16 mt-2"></p>
          </div>
        </div>

        <div className="copy_btn bg-gray-300 h-6 w-6"></div>
      </div>
      <p className="text-sm text-gray-700 my-4 font-satoshi text-wrap break-words bg-gray-300 h-4"></p>
      <p className="font-inter text-sm blue_gradient bg-gray-300 h-3 w-12"></p>
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <p className="font-inter text-sm green_gradient cursor-pointer bg-gray-300 h-3 w-8"></p>
        <p className="font-inter text-sm orange_gradient cursor-pointer bg-gray-300 h-3 w-10"></p>
      </div>
    </div>
  );
};

export default CardSkeleton;
