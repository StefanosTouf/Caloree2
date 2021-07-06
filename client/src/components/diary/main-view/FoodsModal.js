import React from 'react';

import Modal from '../../generalComponents/Modal';
import Foods from '../../foods';

import './main-view.css';
import './foodsModal.css';

const FoodsModal = ({ header, actions, onDismiss, open, meal }) => {
  return (
    <Modal
      header={header}
      actions={actions}
      onDismiss={onDismiss}
      open={open}
      id="foods-modal"
    >
      <div className="content">
        <Foods meal={meal} />
      </div>
    </Modal>
  );
};

export default FoodsModal;
