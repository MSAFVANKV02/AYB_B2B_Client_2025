// import { isValidUrl } from "@/hooks/useImgValidate";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useState } from "react";

// type Props = {
//   src: string;
//   error?: string;
//   alt?: string;
//   className?: string;
//   onClick?: () => void;
//   width?: number;
//   height?: number;
//   loading?: boolean;
//   fallbackSrc?: string; // Optional fallback image
// };

// const Image = ({ src, alt, className, fallbackSrc, error, onClick }: Props) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [hasError, setHasError] = useState(false);

//   return (
//     <div className={`relative overflow-hidden ${className}`}>
//       {!hasError ? (
// <img
// src={isValidUrl(imgSrc)?imgSrc:"/"}
//   alt={alt}
//   draggable={false}
//   className="w-full h-full object-cover"
//   onClick={onClick}
//   onError={() => {
//     if (fallbackSrc) {
//       setImgSrc(fallbackSrc);
//     } else {
//       setHasError(true);
//     }
//   }}
// />
//       ) : (
//         <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-sm">
//           {error || <Icon icon={'ph:image-broken-fill'} fontSize={20} />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Image;
import { isValidUrl } from "@/hooks/useImgValidate";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  src: string;
  style?: React.CSSProperties;
  error?: string;
  alt?: string;
  className?: string;
  classNameImg?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  loading?: boolean;
  fallbackSrc?: string; // Optional fallback image
  children?: React.ReactNode;
  priority?: boolean;
  link?: string;
  disableLink?: boolean;
  draggable?: boolean;
};

const Image = ({
  src,
  alt,
  className,

  fallbackSrc,
  error,
  onClick,
  style,
  classNameImg,
  children,
  link,
  disableLink = false,
  draggable = false,
  loading,
}: Props) => {
  // const [imgSrc, setImgSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc || "/");
  const [hasError, setHasError] = useState(false);

  const redirect = useMemo(() => {
    return link ? link : window.location.href;
  }, []);
  // alert(JSON.stringify(redirect))

  if (loading) {
    return (
      <div
        className={cn(
          "h-full w-full flex justify-center items-center rounded-md overflow-hidden",
          className
        )}
      >
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        disableLink ? (
          <img
            src={isValidUrl(imgSrc) ? imgSrc : "/"}
            alt={alt}
            draggable={draggable}
            className={cn(`w-full h-full object-contain`, classNameImg)}
            onClick={onClick}
            style={style}
            onError={() => {
              if (fallbackSrc) {
                setImgSrc(fallbackSrc);
              } else {
                setHasError(true);
              }
            }}
          />
        ) : (
          <Link to={redirect || "/"}>
            <img
              src={isValidUrl(imgSrc) ? imgSrc : "/"}
              alt={alt}
              draggable={false}
              className={cn(`w-full h-full object-contain`, classNameImg)}
              onClick={onClick}
              style={style}
              onError={() => {
                if (fallbackSrc) {
                  setImgSrc(fallbackSrc);
                } else {
                  setHasError(true);
                }
              }}
            />
          </Link>
        )
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-sm">
          {error ||
            (disableLink ? (
              <Icon
                icon={"ph:image-broken-fill"}
                fontSize={20}
                onClick={onClick}
              />
            ) : (
              <Link to={redirect || "/"}>
                <Icon
                  icon={"ph:image-broken-fill"}
                  fontSize={20}
                  onClick={onClick}
                />
              </Link>
            ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default Image;
