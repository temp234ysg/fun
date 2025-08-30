import { useState, useEffect, useRef } from "react";
import './PaymentPage.css';

// Import the sad sound from the src/assets folder
import sadSoundFile from './assets/sad-sound.mp3';
import upiImg from './assets/UPI-White.svg';

// Define the payment methods
const paymentMethods = [
  { id: "upi", label: "UPI", isButton: true },
  { id: "paylater", label: "Pay Later" },
  { id: "card", label: "Card" },
];

export default function PaymentPage({ userName, onPay }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // State for showing the modal
  const [proceedPayment, setProceedPayment] = useState(false); // State to control the actual payment process
  const price = "₹1,499"; // Updated to INR for tutorial access

  // Reference to the sad sound file
  const sadSound = useRef(null);

  useEffect(() => {
    sadSound.current = new Audio(sadSoundFile); // Initialize the audio file
  }, []);

  // Handle the sound when payment method is changed
  useEffect(() => {
    if (selectedMethod === "paylater") {
      sadSound.current.play();
    } else if (sadSound.current) {
      sadSound.current.pause();
      sadSound.current.currentTime = 0; // Reset the sound to the beginning
    }
  }, [selectedMethod]); // Effect triggers whenever selectedMethod changes

  const handlePay = () => {
    if (selectedMethod === "paylater") {
      // Just play the sad sound, no payment proceed for Pay Later
      return;
    } else {
      // Show the message before proceeding to actual payment
      setShowMessage(true);
    }
  };

  const handleContinue = () => {
    // Proceed to payment when the "Continue" button is clicked
    setShowMessage(false);
    setProceedPayment(true); // Proceed with the payment action
    onPay(); // Call the parent onPay function to handle the actual payment
  };

  return (
    <div className="payment-page-container">
      <div className="payment-page-content">
        {/* Left side */}
        <div className="payment-left">
          <h2>Hi, {userName}!</h2> {/* Using dynamic user name */}
          <h1>Unlock Full Access to the Tutorial for <b>{price}</b></h1>

          <p style={{ fontSize: 16, color: "#555" }}>
            Pay ₹1,499 to gain full access to the exclusive tutorial video.
          </p>

          {/* UPI button with image */}
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              fontSize: 18,
              padding: "10px 0",
              width: "100%",
              margin: "20px 0",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handlePay}
          >
            {/* UPI Image */}
            <img
              src={upiImg} // Path to your SVG file in the assets folder
              alt="UPI"
              style={{ width: "70px", height: "40px" }}
            />
          </button>

          {/* Payment options */}
          <div
            style={{
              border: "1px solid gray",
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
            }}
          >
            {paymentMethods.slice(1).map(({ id, label }) => (
              <label
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 5px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value={id}
                  checked={selectedMethod === id}
                  onChange={() => setSelectedMethod(id)}
                  style={{ marginRight: 10 }}
                />
                <strong>{label}</strong>
              </label>
            ))}
          </div>

          {/* Personal info */}
{/*           <div style={{ marginBottom: 20 }}>
            <strong>Personal information</strong>
            <p style={{ marginTop: 5, color: "#555" }}>
              {userName}, {userName.toLowerCase().replace(" ", ".")}@example.com
            </p>
          </div> */}

          {/* Pay button */}
          <button
            disabled={!selectedMethod || selectedMethod === "paylater"}
            style={{
              backgroundColor: selectedMethod ? "#0070f3" : "#ccc",
              color: "white",
              width: "100%",
              padding: "14px 0",
              fontSize: 18,
              border: "none",
              borderRadius: 6,
              cursor: selectedMethod ? "pointer" : "not-allowed",
            }}
            onClick={handlePay}
          >
            Pay {price}
          </button>
        </div>

        {/* Right side - tutorial summary */}
        <div className="payment-right">
          <h3>Summary</h3>
          <div style={{ marginTop: 15 }}>
            <div>
              <b>Full Tutorial Access</b>
              <span style={{ float: "right" }}>₹1,499</span>
              <div style={{ fontSize: 12, color: "#555" }}>Exclusive tutorial video</div>
            </div>
          </div>

          <hr style={{ margin: "20px 0", borderColor: "#eee" }} />
          <div style={{ fontWeight: "bold", fontSize: 16 }}>
            Total amount
            <span style={{ float: "right" }}>₹1,499</span>
          </div>
        </div>
      </div>

      {/* Modal for the message */}
      {showMessage && (
        <div className="popup-modal">
          <div className="popup-content">
            <p style={{ fontSize: "20px", textAlign: "center", color: "#ff0000", fontWeight: "bold" }}>
              Do you really think I will charge for this? 😈  Yes, I'll!
            </p>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
                margin: "20px auto",
              }}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
