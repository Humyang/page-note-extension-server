var koa = require('koa')
var koaRouter = require('koa-router')
var body = require('koa-better-body')
var koaBody = require('koa-body')
var mongo = require('koa-mongo')
var uid = require('uid2')
var serve = require('koa-static');
const app = new koa();
const router = new koaRouter();
const PORT = 3200;

var graphqlKoa = require('graphql-server-koa').graphqlKoa
var { buildSchema } = require('graphql');

var OAUTCH_CLIENT = require('../oauth_client/lib/index.js')
var CONFIG = require('./config.js')

function middleware(){
    return async function(ctx,next){
        console.log(5)
        await next()
        console.log(6)
    }
}

var myGraphQLSchema = buildSchema(`
  type RandomDie{
    numSides:Int!,
    rollOnce:Int!,
    roll(numRolls:Int!):[Int]
  }
  type Mutation {
    setMessage(message: String): String
  }
  type Position{
    x:Int!,
    y:Int!
  }
  type Note{
    note_id:String,
    note:String,
    position:Position
  }
  type Query {
    hello: String,
    list(url:String):[Note]
  }
`);

var root = {
  list: async ({url},ctx,obj) => {
    console.log(url)
    let query_obj = {
        uid:ctx.LOGIN_STATUS.uid,
        url
    }
    let res = await ctx.mongo
                        .db(CONFIG.dbName)
                        .collection('note')
                        .find(query_obj)
                        .sort({_id:-1})
                        .toArray()

    for (var i = res.length - 1; i >= 0; i--) {
        res[i].position = JSON.parse(res[i].position)
        
    }

    return res
  },
  hello:async (a,b,c,d,e,f)=>{
        debugger
        return 'Hello world!';
  }
};

router.post('/graphql', 
    OAUTCH_CLIENT.oauth_login_check(),
async function(ctx,next){
  ctx.request.body=Object.assign({},ctx.request.fields)
  await next()
}
,
    graphqlKoa(
    (ctx) => {
        return {
            schema: myGraphQLSchema,
            rootValue: root,
            graphiql: true,
            context: ctx
        }
    }));

app.use(serve("./static",{maxage:3153600000}))

router.get('/login_success',async function(ctx){
    ctx.body = '登录成功'
})

router.post('/oauth_login',OAUTCH_CLIENT.oauth_client())

router.post('/note',OAUTCH_CLIENT.oauth_login_check(),async function(ctx,next){
    // 获取参数
    let token = ctx.request.fields.token
    let note = ctx.request.fields.note
    let position = ctx.request.fields.position
    let url = ctx.request.fields.url

    // 有note_id说明是更新，没 id 则是新数据
    let note_id = ctx.request.fields.note_id
    debugger
    if(!!!note_id || note_id==="undefined"){
        note_id = uid(40)
    }

    let update_ = {
        note_id,
        uid:ctx.LOGIN_STATUS.uid,
        note,
        position,
        url
    }

    // 插入数据库
    let res = await ctx.mongo
                .db(CONFIG.dbName)
                .collection('note')
                .update({uid,note_id,url},
                    {'$set':update_},
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