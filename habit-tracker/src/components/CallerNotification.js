import { Button } from "react-bootstrap";
import { useVideo } from "../context/VideoContext";

const CallerNotification = () => {
  const { answerCall, receivingCall, callAccepted, callerName } = useVideo();

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={answerCall}>Answer</Button>
      </div> */}

      {receivingCall && !callAccepted ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{callerName} is calling:</h1>
          <Button onClick={answerCall}>Answer</Button>
        </div>
      ) : null}
    </>
  );
};

export default CallerNotification;
