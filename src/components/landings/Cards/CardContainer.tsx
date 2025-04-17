import { cn } from '@/lib/utils';

import { Link } from 'react-router-dom';

interface CardContainerProps {
  className?: string;
  title: string;
  image: string;
  description: string;
  isTrue: boolean;
  index: number;
  slug:string;
}

export function CardContainer({ className, title, image, description, isTrue,index, slug }: CardContainerProps) {
    const isLastCard = index === 4;
  return (
    <CardContent className={className}>
      <div  className={`relative h-[250px] flex select-none items-start justify-start gap-3 w-full space-y-4 ${isLastCard ? "flex-row-reverse items-start  justify-around" : ""}`}>
        {/* Image */}
        <span className='absolute bottom-0 right-0 font-bold text-8xl text-textMain opacity-5'>
            0{index+1}
        </span>
   
        <div className={`h-full  ${isTrue ? "sm:translate-y-5" :"sm:-translate-y-14"} `}>
          <img
            src={image}
            alt={title}
            className={` object-contain mx-auto ${isLastCard ? "mr-24 translate-y-[50%]" : ""}`}
            draggable={false}
          />
        </div>

        {/* Title & Description */}
        <div className={`space-y-5 ml-3 ${isLastCard ? "text-left float-left w-1/2" : " w-[70%]"}`}>
             <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className=" text-gray-600 text-sm">{description}</p>
          
        </div>

        {/* Arrow */}
        <button className="w-7 h-7 shadow-lg px-8  bg-bg2 text-white rounded-full flex items-center justify-center group">
          <Link to={slug} className='group-hover:-rotate-45 duration-500 transition-all'>&#8594;</Link>
        </button>
        </div>
       
      </div>
    </CardContent>
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full p-4 rounded-xl shadow-lg bg-[#FDF7FF] backdrop-blur-md filter",
        className
      )}
    />
  );
}
// #FAEEFF