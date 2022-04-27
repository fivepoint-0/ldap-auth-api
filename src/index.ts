import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import { createConnection } from "typeorm"
import { Request, Response } from "express"
import { Routes } from "./routes"
import { config } from 'dotenv'

// Set up environment variables from .env file.
config()

// createConnection() creates the database connection (import from TypeORM public, open-source lib)
createConnection().then(async connection => {
  // Create an express server
  const app = express()

  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
  })

  app.all("*", function(req, res, next) {
    if (req.method.toLowerCase() !== "options") {
      return next();
    }
    return res.send(204);
  })

  // Body parse incoming requests.
  app.use(bodyParser.json())

  // Register each API route defined in ./routes.ts
  Routes.forEach(route => {

    // Create URL handler for each route 
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {

      // Execute the API action that will run in the controllers/ folder for the resource requested.
      const result = (new (route.controller as any))[route.action](req, res, next)

      // Return results from the controller to the response and send it to the client.
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })

  // Start the server
  app.listen(process.env.SERVER_PORT)
}).catch(error => console.log(error))
