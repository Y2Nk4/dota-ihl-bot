const Router = require('koa-router');
const Db = require('../../lib/db');
const db = require('../../models');

const router = new Router();
const BASE_URL = `/api/v1/leaderboards`;

router.get(BASE_URL, async (ctx) => {
    try {
        const data = await db.Leaderboard.findAll({ limit: ctx.request.query.limit || 10, offset: ctx.request.query.offset || 0 }, { order: [['id', 'ASC']] });
        ctx.body = {
            status: 'success',
            data,
        };
    }
    catch (e) {
        console.log(e);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const data = await db.Leaderboard.findOne({ where: { id: ctx.params.id } });
        if (data) {
            ctx.body = {
                status: 'success',
                data,
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That leaderboard does not exist.',
            };
        }
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;