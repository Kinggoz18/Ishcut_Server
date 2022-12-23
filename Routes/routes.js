import {AddBooking, AddSchedule, AdminLogin,
AuthenticateUser,
GetAllSchedules,
SearchSchedule,
RemoveSchedule,
GetAllBookings,
RemoveBooking} from '../Controllers/controller.js'

import cors from 'cors';

const routes = (app) =>{
    app.use(cors());
    
    //Used to get Admin key from db
    app.route('/Admin')
    .post(cors(), AdminLogin);
    app.route('/AdminVerify')
    .post(cors(), AuthenticateUser);
    //Route to get all bookings
    app.route('/Admin/GetAllBookings')
    .post(cors(), GetAllBookings);

    //Route to create a booking
    app.route('/CreateBooking')
    .post(cors(), AddBooking);
    //Route to delete a booking
    app.route('/RemoveBooking')
    .delete(cors(), RemoveBooking);
    //Route to add a new Schedule or update an existing one
    app.route('/Schedule')
    .post(cors(), SearchSchedule, AddSchedule)
    .get(cors(), GetAllSchedules);

    app.route('/RemoveSchedule')
    .delete(cors(), RemoveSchedule);
}

export default routes;