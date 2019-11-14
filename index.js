const express = require('express');
const app = express();
const port = 3000;
const { db } = require('./dbconnect');
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/getRooms', async (req, res) => {
    const query = `SELECT * from rooms`;
    let result = await db.query(query);
    console.log("it is...", req.query)
    res.send(({ "message": "Table fetched", "success": true, data: result }));
});

app.get('/getRoomAvailability', async (req, res) => {
    const { room_id, from, till } = req.query;
    const available = await checkAvailability(parseInt(room_id), from, till);
    if (available) {
        return res.send(({ "message": `Room ${room_id} is available on selected dates`, "success": true }));
    }
    return res.status(406).send(({ "message": `Room ${room_id} is not available on selected dates`, "success": false, "error": true }));
});

const checkAvailability = async (room_id, from, till) => {
    from = from.replace(/(^")|("$)/g, '');
    till = till.replace(/(^")|("$)/g, '');
    const q1 = `select * from bookings where
                room_id=${room_id} and
                (
                    "${from}" between booking_from and booking_till
                        or
                    "${till}" between booking_from and booking_till
                );
                `;
    let result = await db.query(q1);
    if (result.length === 0) {
        return true;
    }
    return false;
}

app.post('/bookRooms', async (req, res) => {
    const { from, till, room_id, user_id } = req.body;
    if (!checkAvailability(room_id, from, till)) {
        return res.status(409).send(({ "message": `Room ${room_id} is not available on selected dates`, "success": false, error: true }));
    }
    const q2 = `insert into bookings(room_id, user_id, booking_from, booking_till) values(${room_id}, ${user_id}, "${from}", "${till}" );`;
    result = await db.query(q2);
    return res.send(({ "message": `Room ${room_id} is booked successfully on selected dates`, "success": true }));
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));
