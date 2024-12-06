const express = require("express");
const app = express();

const HOST = "http://localhost";
const PORT = 8000;


const cors = require('cors');

app.use(cors())






// importo le routes
const PostsRoutes = require("./routes/posts.js");

const FilterRoute = require("./routes/filter.js");

// parser per elaborare il body della richiesta. Di default non fa niente. Va messo prima dell'uso delle rotte
app.use(express.json());


// cartella public
app.use(express.static("public"));


// importo le middlewares
const error404HandlerMiddleware = require("./middlewares/error404HandlerMiddleware.js");
const loggerMiddleware = require("./middlewares/loggerMiddleware.js");
const error500TriggerMiddleware = require("./middlewares/error500TriggerMiddleware.js");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware.js");


// server start
app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
})



// middleware logger. va messa prima delle rotte perchè ci logga i dettagli della rotta
app.use("/posts", loggerMiddleware);



// il trigger dell'errore 500 va prima delle rotte. Va commentato dopo che l'abbiamo testato
// app.use("/posts", error500TriggerMiddleware);



// uso le routes
app.use("/posts", PostsRoutes);


// filter route
app.use("/filter", FilterRoute)









// error 404 handler middleware. Va inserita dopo le rotte perché deve controllarle
app.use(error404HandlerMiddleware);


// middleware gestione errore 500. va messa alla fine
app.use(errorHandlerMiddleware);

