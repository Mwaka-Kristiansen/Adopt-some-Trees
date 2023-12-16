// PaymentModal.tsx
import React from "react";
import Modal from "react-modal";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const customStyles = {
    content: {
      width: "400px",
        height: "400px",
      margin: "auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  // Add your payment details and payment form here

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {/* Your payment details and form go here */}
      <div>
        <h2 className="text-2xl mb-4">Payment Details</h2>
        {/* Add your payment form fields and logic */}
      </div>
    </Modal>
  );
};

export default PaymentModal;
