import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { Spinner } from "./Spinner";

gsap.registerPlugin(ScrollTrigger);

const totalVideos = 4;

const VideoPlayer = () => {
  const [mainLoaded, setMainLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  const nextVideoIndex = (currentIndex % totalVideos) + 1;
  const getVideoSrc = (i: number) => `/videos/hero-${i}.mp4`;

  const handleMiniClick = () => {
    setHasClicked(true);
    setCurrentIndex(nextVideoIndex);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          nextVideoRef.current?.play().catch((e) => console.error(e));
        },
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, [currentIndex]);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {!mainLoaded && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-gray-950">
          <Spinner />
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 overflow-hidden rounded-lg bg-gray-950 h-dvh w-screen"
      >
        {/* Mini Clip (centered) */}
        {mainLoaded && (
          <div className="z-50 flex items-center justify-center absolute inset-0 pointer-events-none">
            <div
              className="pointer-events-auto size-64 cursor-pointer overflow-hidden rounded-lg origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(nextVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center object-cover object-center scale-150"
                preload="metadata"
              />
            </div>
          </div>
        )}

        {/* GSAP-targeted transition video */}
        {mainLoaded && (
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            preload="metadata"
          />
        )}

        {/* Main fullscreen video */}
        <video
          src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          preload="auto"
          onLoadedData={() => setMainLoaded(true)}
        />

        {/* Overlay UI */}
        <h1 className="special-font uppercase font-black absolute bottom-5 right-5 z-40 text-blue-75 text-[1.5rem] sm:text-[15rem] md:text-[5rem] lg:text-[8rem] text-blue-100">
          stre<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-10 px-5 sm:px-10">
            <h1 className="special-font uppercase font-black text-blue-100 text-[1.5rem] sm:text-[15rem] md:text-[5rem] lg:text-[8rem]">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-80 font-robert-regular text-blue-100 text-3xl sm:text-2xl md:text-3xl">
              Discover cinematic moments <br /> Stream stories that move you
            </p>
          </div>
        </div>
      </div>

      <h1 className="special-font special-font uppercase font-black absolute bottom-5 right-5 z-40 text-blue-75 text-[1.5rem] sm:text-[15rem] md:text-[5rem] lg:text-[8rem] text-blue-100">
        stre<b>a</b>ming
      </h1>
    </div>
  );
};

export default VideoPlayer;
