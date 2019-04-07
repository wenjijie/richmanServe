
module.exports = app => {
    return async (ctx, next) => {
        console.log('连上了')
        ctx.socket.emit('res', 'connected!');
        await next();
        // execute when disconnect.
        console.log('disconnection!');

        
    };
};