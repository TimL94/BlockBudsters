// DebugConsole.jsx
import React, { useEffect, useState } from 'react';

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Save the original methods so you can still use them
    const originalLog = console.log;
    const originalError = console.error;

    // Override console.log
    console.log = function (...args) {
      setLogs(prevLogs => [...prevLogs, 'LOG: ' + args.join(' ')]);
      originalLog.apply(console, args);
    };

    // Override console.error
    console.error = function (...args) {
      setLogs(prevLogs => [...prevLogs, 'ERROR: ' + args.join(' ')]);
      originalError.apply(console, args);
    };

    // Cleanup when component unmounts: restore original methods
    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  return (
    <div style={{
      maxHeight: '500px',
      overflowY: 'scroll',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '12px',
      padding: '5px',
      minHeight: '300px',
    }}>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default DebugConsole;
