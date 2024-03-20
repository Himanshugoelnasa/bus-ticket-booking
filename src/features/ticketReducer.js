import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tickets: [
    {
      id: nanoid(),
      name: "Himanshu Goel",
      email: "hiyaan.goel@gmail.com",
      seat_number: 20,
      created_at: Date.now(),
    },
    {
      id: nanoid(),
      name: "Divya Mittal",
      email: "mittal.divya@gmail.com",
      seat_number: 5,
      created_at: Date.now(),
    },
  ],
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const ticket = {
        id: nanoid(),
        name: action.payload.name,
        email: action.payload.email,
        seat_number: action.payload.seat_number,
        created_at: Date.now(),
      };

      state.tickets.push(ticket);
      //console.log(initialState);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },

    updateTicket: (state, action) => {
      //console.log(action.payload);
      // const ticket = {
      //   id: action.payload.id,
      //   name: action.payload.name,
      //   email: action.payload.email,
      //   seat_number: action.payload.seat_number,
      //   created_at: Date.now(),
      // };

      // state.tickets = state.tickets.filter(
      //   (ticket) => ticket.id !== action.payload.id
      // );

      // state.tickets.push(ticket);

      return {
        ...state, //Returns the current state
        tickets: state.tickets.map(
          (ticket) =>
            ticket.id === action.payload.id // Loop through the array to find the post you want to modify
              ? {
                  ...ticket,
                  name: action.payload.name,
                  email: action.payload.email,
                }
              : ticket // Copy the post state and then modify it. Else return the same object.
        ),
      };
    },
  },
});

export const { addTicket, removeTicket, updateTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
