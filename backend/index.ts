import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { load } from "js-yaml";
import { readFile } from "fs/promises"
const YAML = require('yaml')
const fs = require('fs')
const axios = require('axios');

import {AccountFlow, Tenant} from './types'

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT;


let estate = new Map<string, Tenant>()

async function startup() {
  estate.clear()
  let files = fs.readdirSync("./data/tenants/")
  for (const file of files) {
    if(file.endsWith(".yaml")){
      var tenant = load(await readFile('./data/tenants/'+file, "utf8")) as Tenant;
      estate.set(tenant.name, tenant)
    }
    
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

app.post('/tenant/:tenantId', (req: Request, res: Response) => {
  var regex = /^[1-9a-zA-Z]*$/g
  if (! regex.test(req.params.tenantId) ) {
    res.status(400)
    return
  }
  let object: Tenant = req.body
  object['name'] = req.params.tenantId
  console.log(object)
  writeDoc(object)
  res.send(object);
});

app.post('/tenantWithCheck/:tenantId', async (req: Request, res: Response) => {
  var regex = /^[1-9a-zA-Z]*$/g
  if (! regex.test(req.params.tenantId) ) {
    res.status(400)
    return
  }
  let object: Tenant = req.body
  object['name'] = req.params.tenantId
  console.log(object)

  const result = await axios.post('http://localhost:8181/v1/data/main', {"input": object });
  console.log(result.data)
  if (result.data['result']['deny'].length > 0) {
    writeDoc(object)
    res.send(result.data['result']['deny']);
  } else {
    writeDoc(object)
    res.status(200)
    res.send()
  }
});

function writeDoc(data:Tenant) {
  const doc = new YAML.Document();
  doc.contents = data;
  fs.writeFileSync("./data/tenants/"+data["name"]+".yaml", doc.toString())
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});