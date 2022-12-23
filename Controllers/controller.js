import mongoose from "mongoose";
import {Booking,
Admin,
Schedule} from '../Models/Schemas'

const AdminCol = mongoose.model('Admin', Admin, 'Admin');
const ScheduleCol = mongoose.model('Schedule', Schedule);
const BookingCol = mongoose.model('Bookings', Booking);

//Function to Authenticate the admin when logining in
export const AdminLogin = (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*"); //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
        let username = req.body.username;
        let password = req.body.password;

        //If the username and password sent in the request is found
        AdminCol.find({name: username, password: password}, (err, data)=>{
            if(err){
                res.send(err);
            }
            res.send(data); //Data contains Key for admin to use and login in the future
        });
}
//Middleware Function to handle authenticating users
export const AuthenticateUser = (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*"); //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let userKey = req.body.key;
    AdminCol.findById(userKey, (err, data)=>{
        if(err){
            res.send(err);
        }
        if(data!=null){
            res.send(true)
        }
        else{
            res.send(false)
        }
    });
}
//Function to return all the services
export const AddBooking =(req, res) =>{
     let newBooking = new BookingCol(req.body);
     newBooking.save((err, data)=>{
        if(err){
            res.send(err);
        }
        res.send(data);
    })
}
//Middleware function to search database before adding
export const SearchSchedule = (req, res, next) =>{

    let find = req.body;
    ScheduleCol.find(find, (err, data)=>{
        if(err){
            res.send(err);
        }
        if(data.length > 0){
            res.send(
                {
                    message: 'Slot Already added',
                    error: false
                });
        }
        else{
            next();
        }
    });

}

//Function to add schedule
export const AddSchedule = (req, res)=>{
    let slot = req.body;
    let Schedule = new ScheduleCol(slot);
    Schedule.save((err, data)=>{
            if(err){
                res.send(err);
            }
            res.send(data);
        });

}
//Function to remove a schedule
export const RemoveSchedule = (req, res)=>{
    let query = req.body;
    console.log(query);
    ScheduleCol.findOneAndRemove(query, (err, data)=>{
        if(err){
            res.send(err)
        }
        res.send("Slot removed");
    })
}

//Function to get all Schdeules
export const GetAllSchedules= (req, res)=>{

    ScheduleCol.find((data, err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    })

}

//Function to get all Bookings
export const GetAllBookings= (req, res)=>{
    BookingCol.find((data, err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
}

//Function delete a Booking
export const RemoveBooking = (req, res)=>{
    let query = req.body;
    BookingCol.findOneAndRemove(query, (err, data)=>{
        if(err){
            res.send(err)
        }
        res.send("Slot removed");
    })
}