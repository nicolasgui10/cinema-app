import styled from "styled-components";

const Details = styled.div`
  margin: 20px 0;

  h1 {
    font-size: 1.5rem;
  }

  p {
    margin: 5px 0;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

export default function MovieDetails({ details }) {
  return (
    <Details>
      <h1>{details.titulo}</h1>
      <p>Horário: {details.horario}</p>
      <p>{details.sinopse}</p>
      <p>Data de Lançamento: {details.dataLancamento}</p>
      <p>Direção: {details.direcao}</p>
    </Details>
  );
}
