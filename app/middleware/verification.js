'use strict';
const jwt = require('jsonwebtoken');
// const Redis = require('redis');
// const redis = Redis.createClient();

module.exports = (option, app) => {
    return async function tokenVerify(ctx, next) {
        try {
            if (app.config.jwt.whiteList.indexOf(ctx.req._parsedUrl.pathname) === -1) {
                if (!ctx.helper.isEmpty(ctx.headers.token) && ctx.headers.token !== 'undefined' && !ctx.helper.isEmpty(ctx.headers.token.trim())) {
                    const token = ctx.headers.token.trim()
                    let payload = await jwt.decode(token, app.config.secret);
                    console.log('pay: ', payload)
                    let tokenUserId = payload._id;
                    let userId = (await app.redis.hgetall(app.config.redis.prefix + 'token-' + token))._id;
                    if (!ctx.helper.isEmpty(userId)) {
                        if (userId === tokenUserId) {
                            // let auth = await authVerify(ctx, userId)
                            // if(auth.info.errno === app.config.result.SUCCESS.errno){
                            app.redis.expire(app.config.redis.prefix + 'token-' + token, app.config.jwt.token_expire);
                            ctx.state.userId = payload._id;
                            await next();
                            // }else {
                            //   ctx.body = auth.info;
                            //   ctx.body.data = auth.data;
                            //   return false;
                            // }
                        } else {
                            return ctx.body = app.config.result.TOKEN_INVALID;
                        }
                    } else {
                        return ctx.body = app.config.result.TOKEN_NOT_FOUND;
                    }
                } else {
                    return ctx.body = app.config.result.TOKEN_MISS;
                }
            } else {
                await next();
            }
        } catch (error) {
            ctx.logger.error(error);
            return ctx.body = app.config.result.TOKEN_INVALID
        }
    };
};


// async function authVerify(ctx, _id) {
//   let result;
//   let user = await ctx.model.User.findById(_id);

//   if (!ctx.helper.isEmpty(user.identity)) {
//     let roles = await ctx.model.Permission.find({ identity: {$in: user.identity} });

//     if (!ctx.helper.isEmpty(roles)) {
//       console.log('url: ', ctx.req)
//       console.log('url: ', ctx.req._parsedUrl.pathname)
//       let api = await ctx.model.Api.findOne({ url: ctx.req._parsedUrl.pathname, method: ctx.method });

//       if (!ctx.helper.isEmpty(api)) {
//         let flag = false;
//         for(let role of roles){
//           if (role.accurl.indexOf(api._id) != -1) {
//             flag = true;
//             result = { info: ctx.app.config.result.SUCCESS };
//           }
//         }
//         if(flag === false){
//           result = { info: ctx.app.config.result.NO_PERMISSION };
//         }
//       } else {
//         result = { info: ctx.app.config.result.API_UNDEFINED, data: '访问的接口未注册' };
//       }
//     } else {
//       result = { info: ctx.app.config.result.NO_PERMISSION, data: '查询用户身份失败' };
//     }
//   } else { // 未设置身份，作为无权限处理
//     result = { info: ctx.app.config.result.NO_PERMISSION, data: '查询用户身份失败' };
//   }
//   return new Promise((resolve, reject) => {
//     resolve(result);
//   });
// }