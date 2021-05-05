import { useVideo } from "../context/VideoContext";
import CallOptions from "./CallOptions";

const Video = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    me,
  } = useVideo();
  return (
    <div className="video-player">
      <div className="my-video">
        <h2>My Video</h2>
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
            <h2>Peer Video</h2>
            <video
              playsInline
              ref={userVideo}
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
