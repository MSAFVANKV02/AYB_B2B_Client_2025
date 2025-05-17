import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkelton = () => {
  return (
    <div>
      <div className="flex md:h-[70dvh] md:flex-row flex-col gap-5 lg:px-0 px-5">
        {/* --------------- */}
        <div className="h-full md:w-1/2 w-full flex flex-col gap-4 items-center">
          <Skeleton className="w-full md:h-[600px] h-[400px] rounded-xl" />
          <div className="flex flex-grow flex-wrap gap-4">
            <Skeleton className="h-14 w-14" />
            <Skeleton className="h-14 w-14" />
            <Skeleton className="h-14 w-14" />
            <Skeleton className="h-14 w-14" />
          </div>
        </div>
        {/* --------------- */}
        <div className=" h-full flex-1 space-y-4">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 sm:gap-2 gap-5">
                <Skeleton className="h-4 sm:w-[200px]" />
                <Skeleton className="h-4 sm:w-[200px]" />
                <Skeleton className="h-4 sm:w-[200px]" />
                <Skeleton className="h-4 sm:w-[200px]" />
              </div>

              <Skeleton className="h-4 md:w-[250px] sm:w-[200px] " />
              <Skeleton className="h-4 sm:w-[200px]" />
              {/* gallery image */}
              {/* gallery image */}
              <div className="flex gap-3 flex-wrap md:mt-10">
                {[1, 2, 3, 4].map((_, index) => (
                  <Skeleton
                    key={`gallery-skel-${index}`}
                    className="h-14 w-14"
                  />
                ))}
              </div>

              {/* sizes */}
              <div className="flex gap-3 flex-wrap">
                {[1, 2, 3, 4].map((_, index) => (
                  <Skeleton key={`size-skel-${index}`} className="h-10 w-10" />
                ))}
              </div>
            </div>

            {/* buttons */}
            <div className="mt-auto flex justify-end gap-4">
              <Skeleton className="h-10 sm:w-[200px]" />
              <Skeleton className="h-10 sm:w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkelton;
