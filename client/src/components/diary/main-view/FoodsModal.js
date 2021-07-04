import React from 'react';

import Modal from '../../generalComponents/Modal'
import Foods from '../../foods'

import './main-view.css'
import './foodsModal.css'


const FoodsModal = ({ header, actions, onDismiss, open, mealId }) => {
    return <Modal header={header} actions={actions} onDismiss={onDismiss} open={open} id="foods-modal">
        <div className="content">
            <Foods mealId={mealId} />
        </div>
    </Modal>
}

export default FoodsModal;