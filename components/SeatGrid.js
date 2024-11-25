import styled from "styled-components";
import { useState } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin: 20px 0;

  @media (min-width: 768px) {
    gap: 15px;
  }
`;

const Seat = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ available, selected, theme }) =>
    selected
      ? theme.seatSelected
      : available
      ? theme.seatAvailable
      : theme.seatUnavailable};
  border-radius: 5px;
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};

  &:hover {
    opacity: ${({ available }) => (available ? 0.8 : 1)};
  }

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export default function SeatGrid({ seats, onSelection }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (seat) => {
    if (!seat.disponivel) return;

    const updatedSeats = selectedSeats.includes(seat.numero)
      ? selectedSeats.filter((num) => num !== seat.numero)
      : [...selectedSeats, seat.numero];

    setSelectedSeats(updatedSeats);
    onSelection(updatedSeats);
  };

  return (
    <Grid>
      {seats.map((seat) => (
        <Seat
          key={seat.numero}
          available={seat.disponivel}
          selected={selectedSeats.includes(seat.numero)}
          onClick={() => handleSelect(seat)}
        />
      ))}
    </Grid>
  );
}
