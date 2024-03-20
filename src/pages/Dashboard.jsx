import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { removeTicket } from "../features/ticketReducer";
import EditModal from "../components/EditModal";

export default function Dashboard() {
  const tickets = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  console.log(success);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-4xl mb-5">
            <h1>Booked Tickets</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 ">
            {(() => {
              if (success) {
                return (
                  <div className="alert alert-success text-left">
                    Passenger data updated successfully
                  </div>
                );
              }
            })()}

            {(() => {
              if (tickets.length == 0) {
                return (
                  <div className="alert alert-danger text-left">
                    No Data Found
                  </div>
                );
              } else {
                return (
                  <>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Full Name</th>
                          <th>Email Name</th>
                          <th>Seat No.</th>
                          <th>Booking Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          let data = [];
                          tickets.map((ticket, index) => {
                            data.push(
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ticket.name}</td>
                                <td>{ticket.email}</td>
                                <td>{ticket.seat_number}</td>
                                <td>
                                  {new Date(ticket.created_at).toLocaleString()}
                                </td>
                                <td>
                                  <EditModal
                                    ticketid={ticket.id}
                                    tickets={tickets}
                                    success={success}
                                    setSuccess={setSuccess}
                                  />
                                  &nbsp;
                                  <button
                                    onClick={() =>
                                      dispatch(removeTicket(ticket.id))
                                    }
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          });

                          return data;
                        })()}
                      </tbody>
                    </Table>
                  </>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
