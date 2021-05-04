import { Application } from 'express';


export abstract class CommonRoutesConfig {
    public app: Application;
    public name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName(){
        return this.name;
    }
    abstract configureRoutes(): Application;
}