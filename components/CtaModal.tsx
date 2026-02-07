import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CtaModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position:"fixed",
      inset:0,
      background:"rgba(0,0,0,0.85)",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      zIndex:9999
    }}>
      <div style={{
        width:"90%",
        maxWidth:"700px",
        height:"80vh",
        background:"white",
        position:"relative"
      }}>
        <button 
          onClick={onClose}
          style={{
            position:"absolute",
            right:"12px",
            top:"8px",
            fontSize:"20px",
            border:"none",
            background:"none",
            cursor:"pointer"
          }}>
          ✕
        </button>

        <iframe
          src="https://api.leadconnectorhq.com/widget/form/DMKJtaqaFuUJrrDpU4N6"
          style={{width:"100%",height:"100%",border:"none"}}
        />
      </div>
    </div>
  );
};

export default CtaModal;
