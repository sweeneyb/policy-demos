import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { load } from "js-yaml";
import { readFile } from "fs/promises"

import {Tenant} from './types'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


let estate = new Set<Tenant>()

async function startup() {
  estate.clear()
  estate.add(load(await readFile('./data/tenants/first.yaml', "utf8")) as Tenant);
  estate.add(load(await readFile('./data/tenants/second.yaml', "utf8")) as Tenant);
}
startup();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.get('/tenants', (req: Request, res: Response) => {
  startup().then( () => {
    console.log(estate.size)
    res.send(JSON.stringify(Array.from(estate)));
  })
});


app.get('/tenant/:tenantId', (req: Request, res: Response) => {
  let tenant : Tenant =  new Tenant(req.params.tenantId)
  res.send(tenant);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});