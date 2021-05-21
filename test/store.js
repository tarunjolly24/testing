process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const store = require('../app/models/store');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

describe('store', () => {
	beforeEach((done) => {
		store.remove({}, (err) => {
			done();
		});
	});
	describe('/GET product', () => {
		it('it should  GET all the products', (done) => {
			chai.request(server)
				.get('/store')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});
	describe('/POST product', () => {
		it('it should not POST a book without pages field - 1 - negative', (done) => {
			let product = {
				title: "kurkure",

			};
			chai.request(server)
				.post('/store')
				.send(product)
				.end((err, res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('quantity');
					done();
				});
		});
		it('it should not POST a product without quantity - 2 - negative', (done) => {
			let product = {
				name: "kurkure",
				quantity: 34,
			};
			chai.request(server)
				.post('/store')
				.send(product)
				.end((err, res) => {
					res.body.should.be.a('object');

					done();
				});
		});
	});


});
