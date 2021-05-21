
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = 8080;
const store = require('./app/routes/store');



mongoose.connect("mongodb://localhost:27017/mongo-testing", {
	useNewUrlParser: "true",
	useUnifiedTopology: "true"
});
mongoose.connection.on("error", err => {
	console.log("Error ==>", err);
});
mongoose.connection.on("connected", () => {
	console.log("Mongoose is up and running.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Welcome to Home!" }));

app.route("/store")
	.get(store.getproducts)
	.post(store.postproduct);
// app.get("/store",store.getprodcuts);

app.route("/store/:id")
	.get(store.getproduct)
	.delete(store.deleteproduct)
	.put(store.updateproduct);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app;