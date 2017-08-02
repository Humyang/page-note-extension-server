var koa = require('koa')
var koaRouter = require('koa-router')
var body = require('koa-better-body')
var mongo = require('koa-mongo')
var uid = require('uid2')
var serve = require('koa-static');
const app = new koa();
const router = new koaRouter();
const PORT = 3200;

var OAUTCH_CLIENT = require('../oauth_client/lib/index.js')
var CONFIG = require('./config.js')

function middleware(){
    return async function(ctx,next){
        console.log(5)
        await next()
        console.log(6)
    }
}

app.use(serve(".",{maxage:3153600000}))

router.get('/login_success',async function(ctx){
    ctx.body = 'login_success'
})

router.post('/oauth_login',OAUTCH_CLIENT.oauth_client())

router.post('/note',OAUTCH_CLIENT.oauth_login_check(),async function(ctx,next){
    // 获取参数
    let token = ctx.request.fields.token
    let note = ctx.request.fields.token
    let position = ctx.request.fields.position
    // 有id说明是更新，没 id 则是新数据
    let note_id = ctx.request.fields.note_id

    if(!note_id){
        note_id = uid(40)
    }

    let update_ = {
        note_id,
        uid:ctx.LOGIN_STATUS.uid,
        note,
        position
    }

    // 插入数据库
    // console.log(CONFIG.dbname)
    let res = await ctx.mongo
                .db(CONFIG.dbName)
                .collection('note')
                .update({uid},
                    {'$set':{update_}},
                    {'upsert':true}
                )

    // 返回
    ctx.body = {
        status:true
    }
})


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