// import { cn } from "@/lib/utils";
// import { Link } from "react-router-dom";
// import { MdPlayArrow, MdPause, MdVolumeOff, MdVolumeUp } from "react-icons/md";
// import { useEffect, useRef, useState } from "react";

// interface IBanner {
//   _id?: string | number;
//   name?: string;
//   link?: string | undefined;
//   isLink?: boolean;
//   image?: string;
//   video?: string;
//   className?: string;
//   imgClass?: string;
//   onClick?: () => void;
//   isVideoControll?: boolean;
// }

// function Banner({
//   name,
//   link,
//   image,
//   className,
//   isLink,
//   imgClass,
//   video,
//   onClick,
//   isVideoControll = true,
// }: IBanner) {
//   // const isVideo = image.endsWith(".mp4") || image.includes("video");
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isMuted, setIsMuted] = useState(true); // Default to muted
//   const [isPlayVideo, setIsPlayVideo] = useState(false);
//   const [showMuteIcon, setShowMuteIcon] = useState(false);
//   const [showPlayIcon, setShowPlayIcon] = useState(false);

//   const toggleMute = () => {
//     setIsMuted((prev) => !prev);
//     setShowMuteIcon(true);
//   };

//   const togglePlayVideo = () => {
//     if (videoRef.current) {
//       if (isPlayVideo) {
//         videoRef.current.pause(); // Pause the video
//       } else {
//         videoRef.current.play(); // Play the video
//       }
//     }
//     setIsPlayVideo((prev) => !prev); // Toggle play/pause state
//     setShowPlayIcon(true); // Show play/pause icon
//     setIsMuted((prev) => !prev);
//   };

//   useEffect(() => {
//     if (showPlayIcon) {
//       const timer = setTimeout(() => {
//         setShowPlayIcon(false);
//       }, 1000); // Icon disappears after 1 second
//       return () => clearTimeout(timer);
//     }
//   }, [showPlayIcon]);
//   return (
//     <div className={cn("h-full w-full rounded-md overflow-hidden", className)}>

//       {isLink && link ? (
//         <Link to={link}>
//           {video ? (
//             <div className="relative group">
//               <video
//                 ref={videoRef}
//                 src={video}
//                 controls={isVideoControll}
//                 autoPlay={isPlayVideo}
//                 loop
//                 muted={isMuted}
//                 className={cn("w-full h-full object-fill", imgClass)}
//                 onClick={togglePlayVideo}
//               />

//               {showPlayIcon && (
//                 <div
//                   className={`absolute rounded-full w-10 h-10 flex justify-center items-center cursor-pointer top-1/2 -translate-y-1/2 right-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 opacity-100 ${
//                     showPlayIcon ? "blink-effect" : ""
//                   }`}
//                   onClick={togglePlayVideo}
//                 >
//                   <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
//                     {isPlayVideo ? (
//                       <MdPlayArrow className="text-2xl" />
//                     ) : (
//                       <MdPause className="text-2xl" />
//                     )}
//                   </span>
//                 </div>
//               )}

//               {/* ====== mute button  */}
//               <div
//                 className={`absolute group-hover:flex hidden rounded-full w-10 h-10  justify-center items-center cursor-pointer bottom-0
//                 -translate-y-1/2 right-0  z-30 transition-opacity duration-500 opacity-100 ${
//                   showMuteIcon ? "blink-effect" : ""
//                 }`}
//                 onClick={toggleMute}
//               >
//                 <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
//                   {isMuted ? (
//                     <MdVolumeOff className="text-sm" />
//                   ) : (
//                     <MdVolumeUp className="text-sm" />
//                   )}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <img
//               src={image}
//               alt={name}
//               className={cn("w-full h-full object-cover", imgClass)}
//               onClick={onClick}
//             />
//           )}
//         </Link>

//         // link over here =================================================================
//       ) : video ? (
//         <div className="relative group">
//           <video
//             ref={videoRef}
//             src={video}
//             controls={isVideoControll}
//             autoPlay={isPlayVideo}
//             loop
//             muted={isMuted}
//             className={cn("w-full h-full object-cover", imgClass)}
//             onClick={togglePlayVideo}
//           />

//           {showPlayIcon && (
//             <div
//               className={`absolute rounded-full w-10 h-10 flex justify-center items-center cursor-pointer top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-30 transition-opacity duration-500 opacity-100 ${
//                 showPlayIcon ? "blink-effect" : ""
//               }`}
//               onClick={togglePlayVideo}
//             >
//               <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
//                 {isPlayVideo ? (
//                   <MdPlayArrow className="text-2xl" />
//                 ) : (
//                   <MdPause className="text-2xl" />
//                 )}
//               </span>
//             </div>
//           )}

//           {/* ====== mute button  */}
//           <div
//             className={`absolute group-hover:flex hidden rounded-full w-7 h-7  justify-center items-center cursor-pointer bottom-10
//                -translate-y-1/2 right-10  z-50 transition-opacity duration-500 opacity-100 ${
//                  showMuteIcon ? "blink-effect" : ""
//                }`}
//             onClick={toggleMute}
//           >
//             <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
//               {isMuted ? (
//                 <MdVolumeOff className="text-sm" />
//               ) : (
//                 <MdVolumeUp className="text-sm" />
//               )}
//             </span>
//           </div>
//         </div>
//       ) : (
//         <img
//           src={image}
//           alt={name}
//           className={cn("w-full h-full object-cover", imgClass)}
//           onClick={onClick}
//         />
//       )}

//       {/* <h3 className="text-sm text-textMain font-semibold text-center">{name}</h3> */}
//     </div>
//   );
// }

// export default Banner;
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MdPlayArrow, MdPause, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

interface IBanner {
  _id?: string | number;
  name?: string;
  link?: string | undefined;
  isLink?: boolean;
  image?: string;
  video?: string;
  className?: string;
  imgClass?: string;
  onClick?: () => void;
  isVideoControll?: boolean;
}

function Banner({
  name,
  link,
  image,
  className,
  isLink,
  imgClass,
  video,
  onClick,
  isVideoControll = true,
}: IBanner) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [showMuteIcon, setShowMuteIcon] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    setShowMuteIcon(true);
  };

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (isPlayVideo) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlayVideo((prev) => !prev);
    // setIsMuted((prev) => !prev);
    setShowPlayIcon(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    // console.log(video);

    if (video) {
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
      });
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime);
      });
    } else {
      // console.log('Video not found');
      setIsPlayVideo(false);
    }
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  useEffect(() => {
    if (showMuteIcon) {
      const timer = setTimeout(() => {
        setShowMuteIcon(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showMuteIcon]);

  useEffect(() => {
    if (showPlayIcon) {
      const timer = setTimeout(() => {
        setShowPlayIcon(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showPlayIcon]);

  return (
    <div className={cn("h-full w-full rounded-md overflow-hidden", className)}>
      {isLink && link ? (
        <Link to={link}>
          {video ? (
            <div className="relative group h-3/4 w-full">
              <video
                ref={videoRef}
                src={video}
                controls={isVideoControll}
                controlsList="nodownload"
                autoPlay={!isVideoControll && isPlayVideo}
                loop
                muted={isMuted}
                className={cn("w-full h-full object-cover", imgClass)}
                onClick={() => !isVideoControll && togglePlayVideo}
              />
              {!isVideoControll && (
                <div className="group-hover:block lg:hidden absolute -bottom-5 left-0 right-0 w-[70%] m-auto ">
                  <div className="flex gap-5 mt-7">
                    {/* Volume Control Slider */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className=" w-1/4 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSliderChange}
                      className=" w-3/4 m-auto h-1 bg-gray-500 rounded-full appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>
              )}

              {showPlayIcon && !isVideoControll && (
                <div
                  className={`absolute rounded-full w-10 h-10 flex justify-center items-center cursor-pointer top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-30 transition-opacity duration-500 opacity-100 ${
                    showPlayIcon ? "blink-effect" : ""
                  }`}
                  onClick={togglePlayVideo}
                >
                  <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
                    {isPlayVideo ? (
                      <MdPause className="text-2xl" />
                    ) : (
                      <MdPlayArrow className="text-2xl" />
                    )}
                  </span>
                </div>
              )}

              {!isVideoControll && (
                <div
                  className={`absolute group-hover:flex hidden rounded-full w-7 h-7 justify-center items-center cursor-pointer lg:bottom-10 bottom-0 -translate-y-1/2 right-10 z-50 transition-opacity duration-500 opacity-100 ${
                    showMuteIcon ? "" : ""
                  }`}
                  onClick={toggleMute}
                >
                  <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
                    {isMuted ? (
                      <MdVolumeOff className="text-sm" />
                    ) : (
                      <MdVolumeUp className="text-sm" />
                    )}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              className={cn("w-full h-full object-cover", imgClass)}
              onClick={onClick}
            />
          )}
        </Link>
      ) : video ? (
        <div className="relative group h-3/4 w-full">
          <video
            ref={videoRef}
            src={video}
            controls={isVideoControll}
            autoPlay={!isVideoControll && isPlayVideo}
            controlsList="nodownload "
            loop
            muted={isMuted}
            className={cn("w-full h-full object-cover", imgClass)}
            onClick={() => !isVideoControll && togglePlayVideo}
          />
          {!isVideoControll && (
            <div className="group-hover:block lg:hidden absolute -bottom-5 left-0 right-0 w-[70%] m-auto ">
              <div className="flex gap-5 mt-7">
                {/* Volume Control Slider */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className=" w-1/4 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSliderChange}
                  className=" w-3/4 m-auto h-1 bg-gray-500 rounded-full appearance-none cursor-pointer slider-thumb"
                />
              </div>
            </div>
          )}

          {showPlayIcon && !isVideoControll && (
            <div
              className={`absolute rounded-full w-10 h-10 flex justify-center items-center cursor-pointer top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-30 transition-opacity duration-500 opacity-100 ${
                showPlayIcon ? "blink-effect" : ""
              }`}
              onClick={togglePlayVideo}
            >
              <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
                {isPlayVideo ? (
                  <MdPause className="text-2xl" />
                ) : (
                  <MdPlayArrow className="text-2xl" />
                )}
              </span>
            </div>
          )}

          {!isVideoControll && (
            <div
              className={`absolute group-hover:flex hidden rounded-full w-7 h-7 justify-center items-center cursor-pointer lg:bottom-10 bottom-0 -translate-y-1/2 right-10 z-50 transition-opacity duration-500 opacity-100 ${
                showMuteIcon ? "" : ""
              }`}
              onClick={toggleMute}
            >
              <span className="text-white bg-black/30 backdrop-blur-sm rounded-full p-2">
                {isMuted ? (
                  <MdVolumeOff className="text-sm" />
                ) : (
                  <MdVolumeUp className="text-sm" />
                )}
              </span>
            </div>
          )}
        </div>
      ) : (
        <img
          src={image}
          alt={name}
          className={cn("w-full h-full object-cover", imgClass)}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default Banner;
