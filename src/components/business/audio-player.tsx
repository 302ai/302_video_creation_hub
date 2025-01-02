import { LoaderRenderer } from "../common/loader-renderer";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createScopedLogger } from "@/utils";
import { FaPlay, FaPause } from "react-icons/fa6";

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}
export interface AudioPlayerRef {
  stopAudio: () => void;
}

const logger = createScopedLogger("AudioPlayer");

export default forwardRef(function AudioPlayer(
  { audioUrl, className }: AudioPlayerProps,
  ref: React.Ref<AudioPlayerRef>
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    stopAudio: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        setIsPlaying(false);
      }
    },
  }));

  const handleVoicePlay = useCallback(() => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        setIsPlaying(false);
      } else {
        audioRef.current.play();

        setIsPlaying(true);
      }
    } catch (error) {
      setIsPlaying(false);

      logger.error("Error playing audio:", error);
    }

    logger.info("handleVoicePlay", isPlaying);
  }, [isPlaying]);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleVoicePlay();
        }}
        className={cn(
          "flex size-[35px] cursor-pointer items-center justify-center rounded-[10px] border border-[rgba(229,229,229,1)] bg-transparent",
          className
        )}
      >
        <LoaderRenderer
          status={isPlaying ? "pause" : "default"}
          statuses={{
            default: {
              icon: <FaPlay />,
            },
            pause: {
              icon: <FaPause />,
            },
          }}
        />
      </Button>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => {
          setIsPlaying(false);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
        }}
      />
    </>
  );
});
