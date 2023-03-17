import express from 'express';
import { create }    from 'express-handlebars';
import { generateCard } from './assets/js/functions.js';

const app           = express();
//MIDLEWARES
const hbs = create({ partialsDir: ["views/partials"] });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

//SERVIDOR
app.listen(3000, () => console.log('http://localhost:3000'));

let cards = '';
let num_cards = 5;

// ---------------------------------------------------------
// --------------------RUTAS DE LA VISTA--------------------
// ---------------------------------------------------------
app.get("/", (req, res) => {
  res.render("home")
})

app.get("/cards", (req, res) => {

  if (cards == '') {
    console.log('Genera los nuevos cartones');
    cards = generateCard(num_cards)    
  }  
  console.log('Cards',cards);
  res.render("cards", {
    cards
  })

})


// ---------------------------------------------------------
// ------------------------ ENDPOINTS ----------------------
// ---------------------------------------------------------

// Ruta POST para crear un nuevo cartón
app.post('/new_card', (req, res) => {
  if (cards.length > 0) {
    let card = generateCard();

    cards.push(card[0]);
    res.status(201).json({ cards });  
  } else {
    res.status(500).json({code:500,message:'No se han generado cartones principales'})
  }
  
});
