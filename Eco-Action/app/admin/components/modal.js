import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, onClose, mediaUrl, isVideo }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <button onClick={onClose}>Close</button>
      {isVideo ? (
        <video controls src={mediaUrl} className="w-full h-full"></video>
      ) : (
        <img src={mediaUrl} alt="Preview" className="object-cover w-full h-full" />
      )}
    </ReactModal>
  );
};

export default Modal;
