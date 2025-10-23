import { useRef } from "react";
import { Video } from "../types/category";

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((e) => console.error("Error playing video:", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <video
          ref={videoRef}
          src={video.urls.hd} // Ensure `urls.hd` exists in the `Video` type
          controls
          className="rounded-lg w-full h-full object-cover"
          poster={video.urls.thumbnail} // Updated to use `urls.thumbnail`
          onClick={handleVideoClick}
        />
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
        <p className="text-gray-600">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;