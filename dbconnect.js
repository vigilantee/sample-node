var mysql = require('mysql');

const config = {
    host: "remotemysql.com",
    user: "XdrGCByfv3",
    password: "Jcr0FmBfAE",
    database: "XdrGCByfv3"
};

/**
 * `CREATE TABLE users (
                        user_id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255),
                        booking_id INT
                    )`
    `CREATE TABLE rooms (
                        room_id INT AUTO_INCREMENT PRIMARY KEY,
                        room_name VARCHAR(255)
                    )`
    `CREATE TABLE bookings (
    booking_id int AUTO_INCREMENT PRIMARY KEY,
    room_id int,
    user_id int,
    booking_from date not null,
    booking_till date not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);`
 */

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

const db = new Database(config);

module.exports = { db };