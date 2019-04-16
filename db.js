/**
* 数据库封装部分
*/

// 使用sqlite3做数据库存储
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bdnote.db');

module.exports = {
	/**
	* 由id获取乐谱
	*/
	getNoteById: (id) => {
		return new Promise((resolve, reject) => {
			db.get('SELECT id, title, composer, uploader, intro, bdnote FROM sheet WHERE id = ?', [id], (err, row) => {
				if (err) {
					reject('Err');
				} else {
					resolve(row);
				}
			});
		});
	},
	
	/**
	* 根据页数和每页多少获取乐谱
	*/
	getNoteListsByPage: (page, per) => {
		let offset = per * (page - 1);
		return new Promise((resolve, reject) => {
			db.all('SELECT id, title, composer FROM sheet LIMIT ? OFFSET ?', [per, offset], (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		})
	},
	test: () => {
		return '1';
	}
}