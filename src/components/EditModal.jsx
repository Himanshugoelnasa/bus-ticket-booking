import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateTicket } from "../features/ticketReducer";

export default function EditModal({ tickets, ticketid, setSuccess }) {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState([]);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (ticketid) => {
    setShow(true);

    const ticketdata = tickets.filter((ticket) => {
      if (ticket.id === ticketid) {
        return ticket;
      }
    });
    setTicket(ticketdata[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTicket(ticket));

    setShow(false);
    setSuccess(true);
  };

  return (
    <>
      <Button
        className=" text-dark"
        variant="primary"
        onClick={() => handleShow(ticketid)}
      >
        Edit Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Passenger Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <form
                  onSubmit={handleSubmit}
                  className="passanger-form"
                  method="POST"
                >
                  <div className="form-group">
                    <label>Seat Number - {ticket.seat_number}</label>
                    <input type="hidden" value="" name="seat_number" />
                    <input
                      type="text"
                      name="name"
                      value={ticket.name}
                      className="form-control"
                      placeholder="Name"
                      onChange={(event) =>
                        setTicket({ ...ticket, name: event.target.value })
                      }
                    />
                    <input
                      type="email"
                      value={ticket.email}
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(event) =>
                        setTicket({ ...ticket, email: event.target.value })
                      }
                    />
                  </div>
                  <Modal.Footer>
                    <Button
                      className=" text-dark"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      className=" text-dark"
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
