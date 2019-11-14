get
http://localhost:3000/getRoomAvailability?from="2019-10-29"&till="2019-10-30"&room_id=2

post
http://localhost:3000/bookRooms
body: 
{
	"from": "2019-11-30",
	"till":"2019-11-29",
	"room_id": 2,
	"user_id": 1
}

