import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import { GlobalStyles } from "../styles/GlobalStyles";
import SeatGrid from "../components/SeatGrid";
import MovieDetails from "../components/MovieDetails";

const Container = styled.main`
  padding: 20px;
  max-width: 900px;
  margin: auto;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonTextColor};
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default function Home({ data }) {
  const [theme, setTheme] = useState(lightTheme);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));

  const handlePurchase = () => {
    alert("Compra realizada com sucesso!");
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <header>
          <button onClick={toggleTheme}>
            Alternar para {theme === lightTheme ? "Dark" : "Light"} Mode
          </button>
        </header>
        <section>
          <MovieDetails details={data} />
        </section>
        <section>
          <SeatGrid seats={data.assentos} onSelection={setSelectedSeats} />
        </section>
        <footer>
          <Button onClick={handlePurchase}>
            Comprar R$ {(selectedSeats.length * data.preco).toFixed(2)}
          </Button>
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const data = await import("../public/data.json");
  return { props: { data: data.default } };
}
