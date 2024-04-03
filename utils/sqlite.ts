import { SQLITE_DB_NAME } from "@env";
import * as SQLite from 'expo-sqlite';

export const getDBConnection = ()=>{
    return SQLite.openDatabase(SQLITE_DB_NAME)
}
export const dropDatabase = async (db: SQLite.SQLiteDatabase) => {
    try {
        db.transaction((tx) => {
            tx.executeSql('DROP DATABASE IF EXISTS ' + SQLITE_DB_NAME);

        });
        return true;
    } catch (error) {
        throw new Error("Error when dropping database")
    }

}

export const createUserInfoTable = async (db: SQLite.SQLiteDatabase) =>{
    try {
        const resultCreateTable = await db.execAsync([{sql: `CREATE TABLE IF NOT EXISTS user_info (
            contact TEXT PRIMARY KEY NOT NULL, 
            password TEXT NOT NULL,
            accessToken TEXT NOT NULL,
            refreshToken TEXT NOT NULL
        )`, args: [] }], false)
        return resultCreateTable
    } catch (error) {
        throw new Error("Error when creating user_info table")
    }
}
export const deleteTableByName = async (db: SQLite.SQLiteDatabase, tableName: string) =>{
    try {
        const resultDeleteTable = await db.execAsync([{sql: `DELETE FROM ${tableName}`, args: []}], false)
        return resultDeleteTable
    } catch (error) {
        throw new Error("Error when deleting table")
    }
}
export const insertUserInfo = async (db: SQLite.SQLiteDatabase, contact: string, password: string, accessToken: string, refreshToken: string) =>{
    try {
        const resultInsert = await db.execAsync([{sql: `INSERT INTO user_info (contact, password, accessToken, refreshToken) VALUES (?, ?, ?, ?)`, args: [contact, password, accessToken, refreshToken]}], false)
        return resultInsert
    } catch (error) {
        throw new Error("Error when inserting user_info")
    }
}

