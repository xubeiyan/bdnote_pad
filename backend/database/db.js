import Database from "better-sqlite3";
const filepath = './database/bdnote_pad.db';

const scriptName = 'db.js';

const createDbConnection = () => {
  const option = {
    fileMustExist: true,
    verbose: console.log,
  }
  const db = new Database(filepath, option);

  console.log(`[${scriptName}] connection with sqlite has been established`);

  return db;
}

export default createDbConnection();