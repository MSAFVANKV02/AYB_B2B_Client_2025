import { makeToast } from "@/utils/toaster";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useRef, useState } from "react";
type Props = {
  toggleShareOptions: () => void;
  data: string;
  setShowShareOptions: (val: boolean) => void;
  showShareOptions: boolean;
};

export default function ShareSocial({
  toggleShareOptions,
  data,
  setShowShareOptions,
  showShareOptions,
}: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const handleCopyUrl = () => {
    const fullUrl = `${window.location.origin}/product/${data}`;
    // http://localhost:5173/product/${data}
    navigator.clipboard.writeText(`${fullUrl}`).then(
      () => {
        makeToast("URL copied to clipboard!");
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
          toggleShareOptions();
        }, 3000);
        // setShowShareOptions(false);
      }
      //   (err: Error) => console.error("Failed to copy URL: ")
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);
  return (
    <div
      className="md:p-4 p-2 bg-white md:w-[150px] z-50 rounded-md w-fit border relative"
      ref={shareRef}
    >
      <div className="w-full bg-slate-100 ">
        <CloseOutlinedIcon
          className=" ml-auto absolute -top-3 -right-3 cursor-pointer  border rounded-full bg-white shadow-md"
          onClick={toggleShareOptions}
        />
      </div>

      <div className="flex gap-3 md:flex-row items-center flex-col ">
        <div className="">
          <EmailShareButton url={data} className="share-btn">
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <div className="">
          <FacebookShareButton url={data} className="share-btn">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className="">
          <WhatsappShareButton url={data} className="share-btn">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handleCopyUrl} disabled={isCopied} className="w-full">
          {isCopied ? "Copied!" : " Copy URL"}
        </button>
      </div>
    </div>
  );
}
