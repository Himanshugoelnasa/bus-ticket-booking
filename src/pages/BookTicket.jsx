import React, { useEffect, useState } from "react";
import carDriver from "../assets/driver.png";
import stairs from "../assets/stairs.png";
import RedSeat from "../assets/car-seat-red.png";
import GreenSeat from "../assets/car-seat-green.png";
import BlackSeat from "../assets/car-seat-black.png";
import ModalPopup from "../components/ModalPopup";

import { useSelector } from "react-redux";

export default function BookTicket() {
  const [tickets, setTickets] = useState([]);
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(() => {
    if (selected.length == 0) {
      return false;
    } else {
      return true;
    }
  });

  const [users, setUsers] = useState([{ name: "", email: "", seat_number: 0 }]);

  const booked_tickets = useSelector((state) => state.tickets);

  useEffect(() => {
    let booked = [];
    booked_tickets.filter((ticket) => {
      booked.push(ticket.seat_number);
    });
    setTickets(booked);
  }, [booked_tickets]);

  const handleOnChange = (event, item) => {
    if (event.target.checked) {
      setSelected([...selected, item]);
      let data = [...users, { name: "", email: "", seat_number: 0 }];
      setUsers(data);
    } else {
      setSelected((prev) => prev.filter((currItem) => currItem !== item));
      setUsers(users.splice(0, 1));
    }

    //console.log(selected);
    //console.log(selected.length);
  };

  const generate_seats = (start, end) => {
    let data = [];
    for (let i = start; i <= end; i++) {
      if (tickets.includes(i)) {
        data.push(
          <li className="list-item seat-item">
            <input
              key={i}
              id={i}
              type="checkbox"
              className="seat"
              title="Alredy Booked"
            />
            <label style={{ backgroundImage: `url(${RedSeat})` }} htmlFor={i}>
              <p>{i}</p>
            </label>
          </li>
        );
      } else {
        data.push(
          <li className="list-item seat-item">
            <input
              key={i}
              id={i}
              type="checkbox"
              value=""
              className="seat"
              required
              onChange={(event) => handleOnChange(event, i)}
            />
            <label htmlFor={i}>
              <p>{i}</p>
            </label>
          </li>
        );
      }
    }
    return data;
  };

  return (
    <>
      <div class="container mt-3">
        <div class="row mt-3">
          <h1 className="text-2xl">Book your Tickets</h1>
          <div className="col-12 ">
            {(() => {
              if (success) {
                return (
                  <div className="alert alert-success text-left">
                    Tickets are booked successfully
                  </div>
                );
              }
            })()}
          </div>
          <div class="hint-section mx-auto my-auto row flex w-full max-w-2xl mt-5">
            <img
              alt="selected seats"
              width="70px"
              height="40px"
              src={GreenSeat}
            />{" "}
            = &nbsp;Selected
            <img
              alt="already booked"
              width="70px"
              height="40px"
              src={RedSeat}
            />{" "}
            = &nbsp;Already Booked
            <img alt="available" width="70px" height="40px" src={BlackSeat} /> =
            &nbsp;Available
          </div>
          <form className="space-y-6 w-full" action="#">
            <div className="flex gap-5">
              <div className="w-full mx-auto my-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <h5 className="text-xl font-medium text-left mb-4">
                  Lower Deck
                </h5>

                <div className="bus-section flex items-start w-full">
                  <div className="driver-seat">
                    <img src={carDriver} />
                  </div>
                  <div className="seat-section items-start w-full">
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(1, 5);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(6, 10);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row mt-10 flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(11, 15);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(16, 20);
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto my-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <h5 className="text-xl font-medium text-left mb-4">
                  Uppar Deck
                </h5>

                <div className="bus-section uppar-deck flex items-start w-full">
                  <div className="stairs">
                    <img src={stairs} />
                  </div>
                  <div className="seat-section items-start w-full">
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(21, 25);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(26, 30);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row mt-10 flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(31, 35);
                        })()}
                      </ul>
                    </div>
                    <div className="seat-row flex items-center w-full">
                      <ul className="">
                        {(() => {
                          return generate_seats(36, 40);
                        })()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mx-auto my-auto flex max-w-3xl p-4 mt-5 ">
              <p className="w-full mx-auto my-auto">
                ({tickets.length} / 40 Seats Booked)
              </p>

              <ModalPopup
                selected={selected}
                setSelected={setSelected}
                users={users}
                setSuccess={setSuccess}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
