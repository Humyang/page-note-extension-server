var koa = require('koa')
var koaRouter = require('koa-router')
var body = require('koa-better-body')
var mongo = require('koa-mongo')
const app = new koa();
const router = new koaRouter();
const PORT = 3200;

var OAUTCH_CLIENT = require('../oauth_client/index.js')
function middleware(){
    return async function(ctx,next){
        console.log(5)
        await next()
        console.log(6)
    }
}

router.post('/oauth_login',OAUTCH_CLIENT.oauth_client)


router.get('/',middleware(),async function(ctx,next){
    console.log(1)
    await next()
    console.log(2)
},async function(ctx,next){
    console.log(3)
    await next()
    console.log(4)
});


app.use(body());
app.use(async function(ctx,next){
    ctx.set('Access-Control-Allow-Origin', "*");
    await next()
})
app.use(async function (ctx,next){
    try{
        await next()
    }catch (err) {
        try{
            // 业务逻辑错误
            ctx.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){
            // console.log(this)
            ctx.body = {
                status:false,
                msg:err.message,
                path:ctx.request.url
            }
        }
        console.log(err)
    }
})
app.use(mongo())
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);