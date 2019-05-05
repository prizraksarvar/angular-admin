import database from './core/database';
import server from './core/server';
import {comparePassword, cryptPassword} from "./core/helpers/password.helper";
import serverStarter from "./core/server";
import {Application} from "./core/application";
import {AutorizationController} from "./components/autorization/autorization-controller";

//cryptPassword("testPass123").then((value => console.log(value)));

let app = Application.create().then((app)=>{
    app.registerController(new AutorizationController());
});
