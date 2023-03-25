import knex, { Knex } from "knex";

export function dbOpen(): Knex {
	const db = knex({
		client: 'pg',
		connection: {
			host : '127.0.0.1',
			port : 5436,
			user : 'main',
			password : 'hHMP8cd^N3SnzGRR',
			database : 'main'
		}
	})

	return db;
}


export const db = dbOpen();