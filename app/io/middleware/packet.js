module.exports = app => {
    return async (ctx, next) => {
      ctx.socket.emit('res', 'packet received!');
      // console.log('packet:', this.packet);
      // console.log('packet:', ctx.args);
      await next();
    };
};