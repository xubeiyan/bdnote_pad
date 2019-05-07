const Koa = require('koa');
const app = new Koa();
const path = require('path');

// 一些配置
const config = require('./config/config.json');

// 数据库读写api
const db = require('./db.js');

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
	// 快速列表
	.get('/sheet/list', (ctx, next) => {
		ctx.redirect('/sheet/list/1');
	})
	// 查看乐谱列表
	.get('/sheet/list/:page', async (ctx, next) => {
		let {page} = ctx.params;
		let itemPerPage = config.itemPerPage;
		let result = await db.getNoteListsByPage(page, itemPerPage);
		
		await ctx.render('sheet_list', {
			sub_title: 'Sheet List',
			per: itemPerPage,
			page: page,
			result: result,
		});
	})
	// 上传乐谱页面
	.get('/sheet/upload', async (ctx, next) => {
		await ctx.render('upload', {
			sub_title: 'Upload',
		});
	})
	// 查看某个乐谱
	.get('/sheet/:id', async (ctx, next) => {
		let {id} = ctx.params;
		let note = await db.getNoteById(id); 
		if (typeof note == "undefined") {
			ctx.redirect('/notfound');
			return;
		}
		await ctx.render('sheet', {
			sub_title: 'Sheet',
			title: note.title,
			composer: note.composer,
			intro: note.intro,
			bdnote: note.bdnote,
			uploader: note.uploader,
		});
	})
	// 未找到
	.get('/notfound', async (ctx, next) => {
		await ctx.render('404', {
			sub_title: 'Not Found'
		});
	})
	// 帮助
	.get('/help', async (ctx, next) => {
		await ctx.render('help', {
			sub_title: 'Help',
		});
	});

app.use(router.routes());
app.listen(config.port)

console.log(`[INFO] BD note Pad is starting at port ${config.port}`)