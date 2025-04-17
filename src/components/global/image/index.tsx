import { isValidUrl } from "@/hooks/useImgValidate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type Props = {
  src: string;
  error?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  loading?: boolean;
  fallbackSrc?: string; // Optional fallback image
};

const Image = ({ src, alt, className, fallbackSrc, error, onClick }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <img
        src={isValidUrl(imgSrc)?imgSrc:"/"}
          alt={alt}
          draggable={false}
          className="w-full h-full object-cover"
          onClick={onClick}
          onError={() => {
            if (fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-sm">
          {error || <Icon icon={'ph:image-broken-fill'} fontSize={20} />}
        </div>
      )}
    </div>
  );
};

export default Image;
