'use strict';
const uuid = require('uuid');

const Controller = require('egg').Controller;

module.exports = class extends Controller {
  // async create() {
  //   const { ctx, app, config } = this;
  //   // const nsp = app.io.of('/');
  //   const message = ctx.args[0] || {};
  //   console.log('msg: ', message)
  //   try {
  //     let userInfo = await app.redis.hmget(config.redis.prefix+message.token);
  //     let roomId = uuid.v1();
  //     // ctx.socket.join(roomId);
  //     app.redis.hmset(config.redis.prefix + 'room-' +roomId, {
  //       name: message.name,
  //       userNum: 1,
  //       max: message.maxNum,
  //       status: '等待',
  //       currentPlayer: userInfo._id,
  //       currentStatus: 'dice',  // 等待掷骰子(dice)、等待玩家操作(oper)
  //       players: [userInfo]
  //     })
  //   } catch (error) {
  //     app.logger.error(error);
  //   }
  // }
}