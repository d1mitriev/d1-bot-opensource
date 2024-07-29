const { MongoClient } = require('mongodb');

module.exports = class MongoProvider {
	constructor() {
		this.mongoClient = new MongoClient(process.env.DATABASE_MONGODB);
		// Connecting to the MongoDB database
		this.mongoClient.connect()
			.then(() => console.log('Connected to the MongoDB database'))
			.catch((err) => console.error('Error connecting to the MongoDB database:', err));
	}

	getMongo() {
		return this.mongoClient
	}
}
//USE DATEBASE
// const MongoProvider = require('./mongoProvider')
// const mongoProvider = new MongoProvider();