import React, { useContext } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { triggerContxet } from '../context/triggerContext';
import { Button, Modal } from 'react-bootstrap';

function ModalLoadind() {
  const { trigModal, setTrigModal } = useContext(triggerContxet)
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


  const handleClose = () => setTrigModal(false);
  const handleShow = () => setTrigModal(true);

  return (
    <>
      <Modal
        show={trigModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className='my-4 d-flex flex-column align-items-center'>
            <ClipLoader color="#ffffff" loading={true} css={override} size={150} />
            <h4 className='mt-4'>Process is working...</h4>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalLoadind
