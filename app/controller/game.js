'use strict';

// const jwt = require('jwt-simple');
const { Controller } = require('egg');

module.exports = class extends Controller {
    async getRooms() {
        const { ctx, service } = this;
        // const { id } = ctx.params || {};
        return ctx.body = await service.game.getRooms();
    }
    async getRoom() {
        const { ctx, service } = this;
        const { id } = ctx.params || {};
        return ctx.body = await service.game.getRoom(id);
    }
    async createRoom() {
        const { ctx, service } = this;
        const body = ctx.request.body || {};
        return ctx.body = await service.game.createRoom(body);
    }
    async joinRoom() {
        const { ctx, service } = this;
        const { id } = ctx.params || {};
        return ctx.body = await service.game.joinRoom(id);
    }
    async startGame() {
        const { ctx, service } = this;
        const { id } = ctx.params || {};
        return ctx.body = await service.game.startGame(id);
    }
    async getCurrentAreas() {
        const { ctx, service } = this;
        const { roomId } = ctx.params || {};
        return ctx.body = await service.game.getCurrentAreas(roomId);
    }
    // async update() {
    //     const { ctx, service } = this;
    //     const { id } = ctx.params;
    //     const payload = ctx.request.body || {};
    //     return ctx.body = await service.user.update(id, payload);
    // }
};
