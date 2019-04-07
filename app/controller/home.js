'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async test() {
    const { ctx } = this;
    const query = ctx.query;
    const nsp = this.app.io.of('/');
    console.log('nsp: ', nsp.connected)
    // nsp.emit(message.roomId + '-throwDiceBack', {
    nsp.emit(query.id, '123456')
    nsp.emit('5c89e748cce2231cbc915c08', '123456')
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
