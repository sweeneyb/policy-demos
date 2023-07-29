import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import {Tenant} from './types'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.get('/tenants', (req: Request, res: Response) => {
  let tenants = new Set<Tenant>()
  tenants.add(new Tenant("T1"))
  tenants.add(new Tenant("T2"))
  // console.log(tenants.size)
  res.send(JSON.stringify(Array.from(tenants)));
});


app.get('/tenant/:tenantId', (req: Request, res: Response) => {
  let tenant : Tenant =  new Tenant(req.params.tenantId)
  res.send(tenant);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});