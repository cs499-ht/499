import { useVideo } from "../context/VideoContext";
import CallOptions from "./CallOptions";

const Video = () => {
  const {
    name,
    callAccepted,
    myVideo,
    callerVideo,
    callEnded,
    stream,
    callerName,
  } = useVideo();
  return (
    <div className="video-player">
      <div className="my-video">
        <h2>{name || "name"}</h2>
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "500px" }}
          />
        )}
      </div>
      <div className="peer-video">
        {callAccepted && !callEnded ? (
          <>
            <h2>{callerName}</h2>
            <video
              playsInline
              ref={callerVideo}
              autoPlay
              style={{ width: "500px" }}
            />{" "}
          </>
        ) : null}
      </div>
      <CallOptions />
    </div>
  );
};

export default Video;
