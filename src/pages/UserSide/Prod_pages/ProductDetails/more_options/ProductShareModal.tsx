import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosMore, IoIosShareAlt } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useWindowWidth } from "@react-hook/window-size";
import { makeToastError } from "@/utils/toaster";

type Props = {
  shareUrl: any;
  titleToShare: string;
  product: any;
  handleCopyUrl: () => void;
  open?: boolean;
  setOpen?: (val: boolean) => void;
};

export default function ProductShareModal({
  shareUrl,
  titleToShare,
  product,
  handleCopyUrl,
}: Props) {
  const onlyWidth = useWindowWidth();
  const shareRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const mobile = onlyWidth < 800;

  const handleMoreOptions = () => {
    if (navigator.share) {
      navigator
        .share({
          title: titleToShare,
          url: shareUrl.toString(),
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      makeToastError("Sharing is not supported on this device.");
    }
  };

  const toggleShareOptions = () => {
    if (window.innerWidth > 640) {
      setOpen((prev) => !prev);
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [] // You might need to add dependencies here if shareRef or setShowShareOptions change
  );

  useEffect(() => {
    // Attach event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener when component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!mobile ? (
        <>
          <IoIosShareAlt
            fill="#121111"
            color="#101010"
            className=""
            onClick={toggleShareOptions}
          />
          {open && (
            <div
              className="absolute z-50 sm:top-12 top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col flex-wrap gap-2"
              ref={shareRef}
            >
              {/* <CopyToClipboard text={shareUrl}>
                <Button className="w-full" variant="outline">
                  Copy URL
                </Button>
              </CopyToClipboard> */}
              <Button
                onClick={handleCopyUrl}
                className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                variant="outline"
              >
                <span className="sm:block hidden">Copy URL</span>
                <Copy size={24} className="sm:ml-auto m-auto" />
              </Button>
              <EmailShareButton
                url={shareUrl.toString()}
                subject={titleToShare}
                body={`Check out this amazing product: ${product?.productName}\n\n${shareUrl}`}
              >
                <span
                  onClick={toggleShareOptions}
                  className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                >
                  <span className="sm:block hidden">Share via Email</span>{" "}
                  <EmailIcon size={24} className="sm:ml-1 rounded-full" />
                </span>
              </EmailShareButton>
              <FacebookShareButton url={shareUrl.toString()}>
                <span
                  onClick={toggleShareOptions}
                  className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                >
                  <span className="sm:block hidden">Share on Facebook</span>{" "}
                  <FacebookIcon size={24} className="sm:ml-1 rounded-full" />
                </span>
              </FacebookShareButton>
              <WhatsappShareButton
                url={shareUrl.toString()}
                title={titleToShare}
              >
                <span
                  onClick={toggleShareOptions}
                  className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                >
                  <span className="sm:block hidden">Share on WhatsApp</span>{" "}
                  <WhatsappIcon size={24} className="sm:ml-1 rounded-full" />
                </span>
              </WhatsappShareButton>
              {/* Instagram does not support direct sharing links, so it's not included */}
            </div>
          )}
        </>
      ) : (
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetTrigger>
            <IoIosShareAlt fill="#121111" color="#101010" className="" />
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[210px] z-[10005]">
            <SheetHeader>
              <SheetTitle className="text-xs">
                {product?.productName}
              </SheetTitle>
              <SheetDescription>
                <div className=" z-50 sm:top-12 top-8 right-0 b flex flex-wrap gap-2">
                  {/* <CopyToClipboard text={shareUrl}>
                <Button className="w-full" variant="outline">
                  Copy URL
                </Button>
              </CopyToClipboard> */}
                  <div
                    onClick={handleCopyUrl}
                    className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                  >
                    <span className="sm:block hidden">Copy URL</span>
                    <Copy size={24} className="sm:ml-auto m-auto" />
                  </div>
                  <EmailShareButton
                    url={shareUrl.toString()}
                    subject={titleToShare}
                    body={`Check out this amazing product: ${product?.productName}\n\n${shareUrl}`}
                  >
                    <div className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black">
                      <span className="sm:block hidden">Share via Email</span>{" "}
                      <EmailIcon size={24} className="sm:ml-1 rounded-full" />
                    </div>
                  </EmailShareButton>
                  <FacebookShareButton url={shareUrl.toString()}>
                    <div className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black">
                      <span className="sm:block hidden">Share on Facebook</span>{" "}
                      <FacebookIcon
                        size={24}
                        className="sm:ml-1 rounded-full"
                      />
                    </div>
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={shareUrl.toString()}
                    title={titleToShare}
                  >
                    {/* <Button
                       className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black"
                      variant="outline"
                    > */}
                    <div className=" flex justify-between md:text-sm text-xs border rounded-md p-3 hover:bg-gray-50 sm:w-[200px] w-full text-black">
                      <span className="sm:block hidden">Share on WhatsApp</span>{" "}
                      <WhatsappIcon
                        size={24}
                        className="sm:ml-1 rounded-full"
                      />
                    </div>

                    {/* </Button> */}
                  </WhatsappShareButton>
                  <Button variant="outline" onClick={handleMoreOptions}>
                    {/* <Icon icon="hugeicons:more-01" className="text-black text-[1rem]" fontSize={20}/> */}
                    <IoIosMore size={20} />
                  </Button>
                  {/* Instagram does not support direct sharing links, so it's not included */}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
