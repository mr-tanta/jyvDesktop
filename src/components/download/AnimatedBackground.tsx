const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      
      {/* Audio waveform ambient pattern */}
      <div className="absolute inset-y-1/2 inset-x-0 h-40 opacity-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2" fill="none" />
          <path d="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2" fill="none" />
          <path d="M0,60 Q150,10 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="1" fill="none" />
          <path d="M0,60 Q150,110 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground; 