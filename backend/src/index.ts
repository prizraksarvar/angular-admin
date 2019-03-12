import database from './core/database';
import server from './core/server';
import {comparePassword, cryptPassword} from "./core/helpers/PasswordHelper";
import serverStarter from "./core/server";
import {Application} from "./core/Application";
import {AutorizationController} from "./components/autorization/AutorizationController";

let app = Application.create().then((app)=>{
    app.registerController(new AutorizationController());
});
