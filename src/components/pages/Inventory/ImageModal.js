import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function ImageModal(props) {


  console.log("Open immage "+ props.imageUri)
  console.log("Modal open: " + props.isModalOpen)

  return (
    <>
      {props.isModalOpen && (
        <Modal
          size="sm"
          show={props.isModalOpen}
          onHide={() => props.setIsModalOpen(false)}
          centered
        >
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              <img
                className="img-fluid"
                src={props.imageUri}
                alt="Icon"
                onClick={() => props.setIsModalOpen(false)}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
      {props.isModalOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default ImageModal;