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

export const createUserSearchedTable = async (db: SQLite.SQLiteDatabase) =>{
    try {
        const resultCreateTable = await db.execAsync([{sql: `CREATE TABLE IF NOT EXISTS user_searched (
            userId TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            avatar TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ownerId TEXT NOT NULL
        )`, args: [] }], false)
        return resultCreateTable
    } catch (error) {
        throw new Error("Error when creating user_searched table")
    }
}

export const insertUserSearched = async (db: SQLite.SQLiteDatabase, _id: string, name: string, avatar: string, ownerId: String) =>{
    try {
        const exists = await db.execAsync([{sql: `SELECT * FROM user_searched WHERE userId = ? and ownerId = ?`, args: [_id, ownerId]}], false)
        const obj = exists[0]
                
        if("rows" in obj && obj.rows.length > 0){
            await db.execAsync([{sql: `DELETE FROM user_searched WHERE userId = ? and ownerId = ?`, args: [_id, ownerId]}], false)
        }
       
        const resultInsert = await db.execAsync([{sql: `INSERT INTO user_searched (userId, name, avatar, ownerId) VALUES (?, ?, ?, ?)`, args: [_id, name, avatar, ownerId]}], false)
        return resultInsert
    } catch (error) {
        throw new Error("Error when inserting user_searched")
    }
}

export const selectTop5NewestUserSearched = async (db: SQLite.SQLiteDatabase, ownerId: String) =>{
    try {
        const resultSelect = await db.execAsync([{sql: `SELECT * FROM user_searched WHERE userId = ? ORDER BY createdAt DESC LIMIT 5`, args: [ownerId]}], false)
        return resultSelect
    } catch (error) {
        throw new Error("Error when selecting user_searched")
    }
}
