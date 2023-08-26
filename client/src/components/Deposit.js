import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
    AiOutlineShoppingCart,
  } from "react-icons/ai";

  import Nav from "react-bootstrap/Nav";
  import { Link } from "react-router-dom";


function DepositModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    <Nav.Link as={Link} onClick={handleShow}>
        <AiOutlineShoppingCart style={{ marginBottom: "2px" }} /> Deposit
    </Nav.Link>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>As we are in our testing phase, you get 10 Tokens every day to test out the system.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Deposit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DepositModal;
