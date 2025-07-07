import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { videoURLs } from "../lib/config";

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = () => {
  const [mainLoaded, setMainLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const hoverAreaRef = useRef<HTMLDivElement | null>(null);

  const totalVideos = videoURLs.length;
  const nextVideoIndex = (currentIndex % totalVideos) + 1;

  const getVideoSrc = (i: number) => videoURLs[i - 1];

  // Handle hover area mouse events
  const handleMouseEnter = () => {
    if (!isTransitioning && mainLoaded) {
      setShowMiniPlayer(true);
    }
  };

  const handleMouseLeave = () => {
    setShowMiniPlayer(false);
    // Pause the mini video when hidden
    if (miniVideoRef.current) {
      miniVideoRef.current.pause();
    }
  };

  // Handle mini video play when it becomes visible
  useEffect(() => {
    if (showMiniPlayer && miniVideoRef.current) {
      const playPromise = miniVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.error("Mini video play error:", e));
      }
    }
  }, [showMiniPlayer]);

  const handleMiniClick = () => {
    if (isTransitioning) return;
    
    setHasClicked(true);
    setIsTransitioning(true);
    setShowMiniPlayer(false);
  };

  // Handle video transition animation
  useGSAP(() => {
    if (hasClicked && isTransitioning) {
      // Start the transition
      gsap.set("#next-video", { visibility: "visible" });
      
      // Animate the next video to full screen
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          nextVideoRef.current?.play().catch((e) => console.error("Next video play error:", e));
        },
        onComplete: () => {
          // Update current index after animation completes
          setCurrentIndex(nextVideoIndex);
          setHasClicked(false);
          setIsTransitioning(false);
          
          // Reset the next video element
          gsap.set("#next-video", { 
            visibility: "hidden",
            scale: 0.5,
            width: "256px",
            height: "256px"
          });
        }
      });

      // Animate the current video out (fade out the main video)
      gsap.to("#main-video", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          // Restore opacity after transition
          gsap.set("#main-video", { opacity: 1 });
        }
      });
    }
  }, [hasClicked]);

  // Initialize video frame animation
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
      <div
        id="video-frame"
        className="relative z-10 overflow-hidden rounded-lg bg-gray-950 h-dvh w-screen"
      >
        {/* Hover Area - Center of screen */}
        <div
          ref={hoverAreaRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div
            className="pointer-events-auto w-96 h-96 flex items-center justify-center bg-transparent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ 
              border: process.env.NODE_ENV === 'development' ? '2px dashed rgba(255,255,255,0.3)' : 'none'
            }}
          >
            {/* Mini Video Player - appears on hover */}
            <div
              className={`size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-out hover:scale-105 ${
                showMiniPlayer ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              onClick={handleMiniClick}
            >
              <video
                ref={miniVideoRef}
                src={getVideoSrc(nextVideoIndex)}
                loop
                muted
                className="size-64 object-cover object-center"
                preload="metadata"
              />
              {/* Play indicator overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GSAP-targeted transition video */}
        <video
          ref={nextVideoRef}
          src={getVideoSrc(nextVideoIndex)}
          loop
          muted
          id="next-video"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible z-20 size-64 object-cover object-center"
          preload="metadata"
        />

        {/* Main fullscreen video */}
        <video
          ref={mainVideoRef}
          src={getVideoSrc(currentIndex)}
          autoPlay
          loop
          muted
          id="main-video"
          className="absolute inset-0 h-full w-full object-cover scale-[1.2]"
          preload="auto"
          onLoadedData={() => {
            if (!mainLoaded) setMainLoaded(true);
          }}
          onError={(e) => {
            console.error("Video error", e);
            setMainLoaded(true);
          }}
        />

        {/* Overlay UI */}
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none">
          <div className="mt-10 px-5 sm:px-10">
            <h1 className="special-font text-blue-75 uppercase font-black text-blue-100 text-[1.5rem] sm:text-[15rem] md:text-[5rem] lg:text-[8rem]">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-80 font-robert-regular text-blue-100 text-3xl sm:text-2xl md:text-3xl">
              Discover cinematic moments <br /> Stream stories that move you
            </p>
          </div>
        </div>
      </div>

      <h1 className="special-font uppercase font-black absolute bottom-5 right-10 z-40 text-blue-75 text-[1.5rem] sm:text-[15rem] md:text-[5rem] lg:text-[8rem] text-blue-100 mr-5">
        stre<b>a</b>ming
      </h1>
    </div>
  );
};

export default VideoPlayer;