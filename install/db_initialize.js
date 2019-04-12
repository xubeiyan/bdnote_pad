// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/bdnote.db');


db.serialize(() => {
	db.run('DROP TABLE IF EXISTS sheet');
	db.run('DROP TABLE IF EXISTS uploader');
	db.run('CREATE TABLE sheet (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
		'title VARCHAR, ' +
		'composer VARCHAR, ' + 
		'uploader VARCHAR, ' + 
		'intro TEXT, ' + 
		'bdnote TEXT)');
	db.run('CREATE TABLE uploader (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
		'secretkey CHAR, ' + 
		'comment TEXT, ' + 
		'expiretime datetime)');
	db.run('INSERT INTO sheet (title, composer, uploader, intro, bdnote) VALUES ' +
		'("Twinkle, Twinkle, Little Star", "Mozart", "noname", "a popular English lullaby", "1155665")');
});

db.close();