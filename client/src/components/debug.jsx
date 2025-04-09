// DebugConsole.jsx
import React, { useEffect, useState } from 'react';

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Save the original console.log so you can still use it
    const originalLog = console.log;
    
    // Override console.log
    console.log = function (...args) {
      // Append the log to the state
      setLogs((prevLogs) => [...prevLogs, args.join(' ')]);
      // Also call the original log to not lose console output entirely
      originalLog.apply(console, args);
    };

    // Clean up when component unmounts: restore original console.log
    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      maxHeight: '200px', overflowY: 'scroll',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white',
      fontSize: '12px', zIndex: 9999, padding: '5px'
    }}>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default DebugConsole;
