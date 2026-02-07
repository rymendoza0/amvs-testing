import React, { useState } from "react";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const input = e.target.message.value;
    if (!input) return;

    setMessages([...messages, "You: " + input, "Concierge: We'll contact you shortly."]);
    e.target.reset();
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#D4AF37",
          borderRadius: "50px",
          padding: "14px 18px",
          border: "none",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        💬 Concierge
      </button>

      {open && (
        <div style={{
          position:"fixed",
          bottom:"80px",
          right:"20px",
          width:"320px",
          height:"420px",
          background:"white",
          borderRadius:"12px",
          overflow:"hidden",
          boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
        }}>
          <div style={{background:"#000",color:"#fff",padding:"12px",fontWeight:"bold"}}>
            AMVS Concierge
          </div>

          <div style={{padding:"12px",height:"280px",overflow:"auto"}}>
            {messages.map((m,i)=>(
              <div key={i} style={{marginBottom:"8px"}}>{m}</div>
            ))}
          </div>

          <form onSubmit={sendMessage} style={{display:"flex",borderTop:"1px solid #eee"}}>
            <input name="message" placeholder="Ask about properties..."
              style={{flex:1,padding:"10px",border:"none"}}/>
            <button style={{background:"black",color:"white",padding:"10px 16px",border:"none"}}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
