"use strict"

const Koa = require("koa")
const Router = require("koa-router")
const koaBody = require("koa-body")
const cors = require("@koa/cors")
const json = require("koa-json")

const app = new Koa();
const router = new Router({
    prefix: '/api'
});

router.get('/login', (ctx) => {
    const params = ctx.request.query
    ctx.body = {
        name: params.name,
        email: params.email
    }
    console.log("hello login");
})

// 作业代码开始
router.post('/user', async (ctx) => {
    let { body } = ctx.request
    const header = ctx.request.header

    if ({ ...body }.name && { ...body }.email && header.role == "admin") {
        ctx.body = {
            code: "200",
            data: { ...body },
            msg: "上传成功"
        }
    } else {
        // name与email必填
        if (!{ ...body }.name || !{ ...body }.email) {
            ctx.body = {
                code: "404",
                msg: "name与email不得为空"
            }
        }

        // role必须为admin
        if (header.role !== "admin") {
            ctx.body = {
                code: "401",
                msg: "unauthorized post"
            }
        }
    }

})

app.use(koaBody())
app.use(cors())
app.use(json({
    pretty: false,
    param: 'pretty'
}))

app.use(router.routes())
    .use(router.allowedMethods())

app.listen('3000')