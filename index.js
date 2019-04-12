const Koa = require('koa');
const app = new Koa();
const path = require('path');

// 一些配置
const config = require('./config/config.json');

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bdnote.db');

// 静态资源
const static = require('koa-static');
app.use(static(path.join(__dirname, config.staticPath)));

// 模板引擎
const render = require('koa-ejs');
render(app, {
	root: path.join(__dirname, config.ejs.root),
	layout: config.ejs.layout,
	viewExt: 'html',
	cache: config.ejs.cache,
	debug: config.ejs.debug,
});

// 路由
const Router = require('koa-router');
let router = new Router();

	// 主页
router.get('/', async (ctx, next) => {
		await ctx.render('index', {
			sub_title: 'Index'
		});
	})
	// 查看乐谱列表
	.get('/sheet/list/:page/per/:per/mode/:mode', async (ctx, next) => {
		let {page, per, mode} = ctx.params;
		console.log(page, per, mode);
		// console.log(ctx.request)
	})
	// 查看某个乐谱
	.get('/sheet/:id', async (ctx, next) => {
		await ctx.render('sheet', {
			sub_title: 'Sheet'
		});
	})
	// 未找到
	.get('/notfound', async (ctx, next) => {
		await ctx.render('404', {
			sub_title: 'Not Found'
		});
	});

app.use(router.routes());
app.listen(config.port)

console.log(`[demo] start-quick is starting at port ${config.port}`)