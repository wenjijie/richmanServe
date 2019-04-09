'use strict';

// const jwt = require('jwt-simple');
const { Controller } = require('egg');

module.exports = class extends Controller {
  async signup() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    return ctx.body = await service.user.signup(payload);
  }
  async current() {
    const { ctx, service } = this;
    return ctx.body = await service.user.current();
  }
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    return ctx.body = await service.user.login(payload);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    return ctx.body = await service.user.update(id, payload);
  }
  async getGameInfo() {
    const { ctx, service } = this;
    const { userId } = ctx.params;
    return ctx.body = await service.user.getGameInfo(userId);
  }
};
