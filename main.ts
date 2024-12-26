import { Hono } from 'https://deno.land/x/hono@v4.3.11/mod.ts'
import { serveStatic } from 'https://deno.land/x/hono@v4.3.11/middleware.ts'
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.11/adapter/deno/websocket.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";

const app = new Hono()
const apiApp = new Hono()

const infos = new Map<string,WSContext>()
const poss = new Map<string,{x:number,y:number}>()

const broadcastEvent = (uid:string,_poss:Map<string, {
  x: number;
  y: number;
}>) => {
  infos.forEach((w)=>{
    w.send(JSON.stringify({me:uid,positions:Array.from(_poss, ([name, value]) => ({ name, value }))}));
  });
}

apiApp.get('/test', (c) => c.json({ message: 'Hello Hono!!!' }))
apiApp.get(
  '/ws',
  upgradeWebSocket((_c) => {
    const uid = crypto.randomUUID();
    
    return {
      onOpen(_event,ws:WSContext){
        infos.set(uid,ws)
        poss.set(uid,{x:50,y:50})
        broadcastEvent(uid,poss)
      },
      onMessage(event, _ws:WSContext) {
        const data = JSON.parse(event.data.toString()) as {uid:string,x:number,y:number}
        poss.set(uid,{x:data.x,y:data.y})
        broadcastEvent(uid,poss);
      },
      onClose: () => {
       poss.delete(uid);
      },
    }
  })
)
app.route('/api', apiApp)
app.use('/*', serveStatic({ root: './static' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/', serveStatic({ path: './static/index.html' }))

Deno.serve(app.fetch)


