# Cinema App

Este projeto consiste em uma aplicação para exibir informações de filmes e gerenciar a seleção de assentos em uma sala de cinema. O projeto utiliza **Next.js 14 ou superior**, **Flexbox**, **HTML5**, e inclui temas **Light e Dark**, além de ser responsivo para Mobile e Desktop.

## **Passo a Passo para o Desenvolvimento**


### **1. Estruturar o Projeto**
Organize o projeto na seguinte estrutura de pastas:

```
/pages
  _app.js
  index.js
/components
  MovieDetails.js
  SeatGrid.js
/public
  data.json
/styles
  themes.js
  GlobalStyles.js
```

---

### **2. Criar os Componentes**
1. **`MovieDetails.js`**:
   Este componente exibe as informações do filme, como título, sinopse, horário, data de lançamento e direção.

   ```javascript
   import styled from "styled-components";

   const Details = styled.div`
     margin: 20px 0;

     h1 {
       font-size: 1.5rem;
     }

     p {
       margin: 5px 0;
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
   ```

2. **`SeatGrid.js`**:
   Este componente renderiza os assentos disponíveis, gerencia a seleção e garante que o usuário só possa selecionar assentos disponíveis.

   ```javascript
   import styled from "styled-components";
   import { useState } from "react";

   const Grid = styled.div`
     display: grid;
     grid-template-columns: repeat(10, 1fr);
     gap: 10px;
     margin: 20px 0;
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
   ```

---

### **3. Criar o Tema e Estilos Globais**
1. **`themes.js`**:
   ```javascript
   export const lightTheme = {
     background: "#f5f5f5",
     color: "#000",
     buttonBackground: "#e53935",
     seatAvailable: "#fff",
     seatSelected: "#e53935",
     seatUnavailable: "#999",
   };

   export const darkTheme = {
     background: "#121212",
     color: "#fff",
     buttonBackground: "#e53935",
     seatAvailable: "#444",
     seatSelected: "#e53935",
     seatUnavailable: "#555",
   };
   ```

2. **`GlobalStyles.js`**:
   ```javascript
   import { createGlobalStyle } from "styled-components";

   export const GlobalStyles = createGlobalStyle`
     body {
       margin: 0;
       padding: 0;
       background-color: ${({ theme }) => theme.background};
       color: ${({ theme }) => theme.color};
       font-family: 'Arial', sans-serif;
     }
   `;
   ```

---

### **4. Configurar o Arquivo `_app.js`**
Configure o suporte a temas e estilos globais no arquivo `_app.js`:

```javascript
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "../styles/themes";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () =>
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
```

---

### **5. Adicionar Dados no `data.json`**
Adicione as informações do filme e assentos no arquivo `public/data.json`:

```json
{
  "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
  "sinopse": "Um jovem hobbit, Frodo Baggins, é encarregado de uma tarefa imensa...",
  "dataLancamento": "19 de dezembro de 2001 (Brasil)",
  "direcao": "Peter Jackson",
  "horario": "15:30",
  "preco": 40.0,
  "assentos": [
    { "numero": 1, "disponivel": true },
    { "numero": 2, "disponivel": false },
    ...
    { "numero": 60, "disponivel": true }
  ]
}
```

---

### **6. Configurar a Página Principal**
Implemente o arquivo `index.js` para exibir os componentes e funcionalidades.

---

### **Autores**
- Kemuel Aquila de Matos
- Lorenzo
- Nicolas Guilherme da Silva

