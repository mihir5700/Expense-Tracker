require('dotenv').config(); // To setup backend environment variables like PORT and CONNECTION_STR
const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STR)
        .then((res) => {
            console.log("Connection successfully made to DB");
            app.listen(process.env.PORT, () => {
                console.log("Listening on port number ",process.env.PORT);
            });
        })
        .catch((err) => { console.log(err) });

//app.use(express.static('public')); // Middleware to make some static files publicly available like styles, images, icons, etc.
//app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Middleware to parse any payload body
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Home Page
app.get('/', (req, res) => {
    res.json({"message":"Welcome to this App!"});
});

// About Page
app.get('/about', (req, res) => {
    res.json({"message":"Welcome to About page!"});
});

app.use('/expenses', expenseRoutes); // Expense Routes
app.use('/budget', budgetRoutes); // Budget Routes
app.use('/category', categoryRoutes); // Category Routes

app.use((req, res) => {
    res.status(404).render('errorpage', { title: '404 Not Found' });
});