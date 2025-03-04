// client/src/components/Editor.js
import React, { useState, useEffect, useRef } from 'react';
import socket from '../services/socketService';
import { applyOperation, calculateChangeIndex } from '../services/otService';

function Editor({ documentId }) {
  const [text, setText] = useState('');
  const textRef = useRef(null);

  useEffect(() => {
    socket.emit('joinDocument', documentId);

    socket.on('documentContent', (content) => {
      setText(content);
    });

    socket.on('textChange', (data) => {
      setText((prevText) => {
        return applyOperation(prevText, data.operation);
      });
    });

    return () => {
      socket.off('documentContent');
      socket.off('textChange');
    };
  }, [documentId]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const operation = {
      type: newText.length > text.length ? 'insert' : 'delete',
      index: calculateChangeIndex(text, newText),
      text: newText.length > text.length ? newText.slice(calculateChangeIndex(text, newText), calculateChangeIndex(text, newText)+ (newText.length - text.length) ) : text.slice(calculateChangeIndex(newText, text), calculateChangeIndex(newText, text) + (text.length-newText.length)),
      length: text.length - newText.length
    };
    socket.emit('textChange', { documentId, operation });
    setText(newText);
  };

  return <textarea ref={textRef} value={text} onChange={handleTextChange} style={{width:"80%", height:"500px"}}/>;
}
