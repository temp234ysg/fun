import { useState } from "react";
import PaymentPage from "./PaymentPage";
import VideoPlayer from "./VideoPlayer";

export default function App() {
  const [paid, setPaid] = useState(false);
  const userName = "John Doe"; // You can replace this with any dynamic value

  return (
    <div className="app-container" style={{width: '100vw', height:'100vh', margin: 'auto'}}>
      {!paid ? (
        <PaymentPage userName={userName} onPay={() => setPaid(true)} />
      ) : (
        <VideoPlayer videoUrl="https://www.instagram.com/p/VIDEO_ID_POST_PAYMENT" />
      )}
    </div>
  );
}
