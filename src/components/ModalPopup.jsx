import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../features/ticketReducer";

export default function ModalPopup({
  selected,
  users,
  setSuccess,
  setSelected,
}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tickets = useSelector((state) => state.tickets);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(users);
    users.map((user) => {
      if (user.name && user.email) {
        dispatch(addTicket(user));
      }
    });
    setShow(false);
    setSuccess(true);
    setSelected([]);
  };

  const handleChange = (index, event) => {
    let data = [...users];
    console.log(index, event.target.name, event.target.value);
    data[index][event.target.name] = event.target.value;
    data[index]["seat_number"] = selected[index];
    console.log(data);
  };

  const generate_seats_details = (selected) => {
    let data = [];
    for (let i = 0; i < selected.length; i++) {
      data.push(
        <>
          <div key={i} class="form-group">
            <label>Seat Number - {selected[i]}</label>
            <input type="hidden" value={selected[i]} name="seat_number" />
            <input
              type="text"
              name="name"
              value={i.name}
              className="form-control"
              placeholder="Name"
              onChange={(event) => handleChange(i, event)}
              required
            />
            <input
              type="email"
              value={i.email}
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={(event) => handleChange(i, event)}
              required
            />
            <hr />
          </div>
        </>
      );
    }
    return data;
  };

  return (
    <>
      <Button
        className="w-full text-dark"
        variant="primary"
        disabled={(() => {
          if (selected.length > 0) {
            return false;
          } else {
            return true;
          }
        })()}
        onClick={handleShow}
      >
        Continue To Booking
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Passengers Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container">
            <div class="row">
              <div class="col-12 ">
                <form
                  onSubmit={handleSubmit}
                  class="passanger-form"
                  method="POST"
                >
                  {(() => {
                    return generate_seats_details(selected);
                  })()}
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
                      Proceed To Confirm
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
