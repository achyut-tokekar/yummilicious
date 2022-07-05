//env variable
require('dotenv').config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//API
import Auth from './API/Auth';
import Restaurant from './API/Resraurant';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Image';
import Order from './API/Order';
import Reviews from './API/Reviews';


//Database connection
import ConnectDB from "./database/connection"

const yummy = express();

yummy.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true
}));
yummy.use(express.json());
yummy.use(express.urlencoded({ extended: false }));
yummy.use(helmet());
yummy.use(cors());
yummy.use(passport.initialize());
yummy.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For Application routes
//localhost:4000/auth/signup
yummy.use('/auth', Auth);
yummy.use('/restaurant', Restaurant);
yummy.use('/food', Food);
yummy.use('/menu', Menu);
yummy.use('/image', Image);
yummy.use('/order', Order);
yummy.use('/reviews', Reviews);

yummy.get('/', (req, res) => res.json({ message: "Setup success Yay!!" }));

yummy.listen(4000, () =>
    ConnectDB().then(() => console.log("Server is up and running!"))
        .catch(() => console.log("DB Connection failed!!")));