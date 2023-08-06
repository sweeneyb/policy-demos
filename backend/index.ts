import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { load } from "js-yaml";
import { readFile } from "fs/promises"

import {AccountFlow, Tenant} from './types'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// let estate = new Set<Tenant>()
let estate = new Map<string, Tenant>()

async function startup() {
  estate.clear()
  let files = ["first.yaml", "second.yaml"]
  for (var file of files)  {
    var tenant = load(await readFile('./data/tenants/'+file, "utf8")) as Tenant;
    estate.set(tenant.name, tenant)
  }
}
startup();

app.use('/', (req, res, next) => {
  startup().then( () => {
    next()
  })
})

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

    let tenant = estate.get(req.params.tenantId)
    res.send(tenant);

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});