import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  setter: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const CustomModal = (props: ModalProps) => {
  const { isOpen, setter, children } = props;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setter(false)}
      shouldFocusAfterRender={false}
      style={{
        overlay: {
          position: 'fixed',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 99,
        },
        content: {
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',
          height: '200px',
          borderRadius: '15px',
          backgroundColor: '#f6cb01',
          boxShadow: '0 0 0 6px black, 0 0 0 12px #f6cb01',
          boxSizing: 'border-box',
          fontSize: '1.5em',
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;