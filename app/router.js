'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // router.get('/', controller.home.index);
  // router.get('/game/getAreas', controller.game.getAreas);
  router.get('/game/getRooms/', controller.game.getRooms);
  router.get('/game/getRoom/:id', controller.game.getRoom);
  router.post('/game/createRoom', controller.game.createRoom);
  router.get('/game/joinRoom/:id', controller.game.joinRoom);
  router.get('/game/startGame/:id', controller.game.startGame);
  router.get('/game/getCurrentAreas/:roomId', controller.game.getCurrentAreas);
  router.get('/game/getGameResult/:roomId', controller.game.getGameResult);
  router.post('/signup', controller.user.signup);
  router.post('/login', controller.user.login);
  router.get('/user/current', controller.user.current);
  router.get('/user/getGameInfo/:userId', controller.user.getGameInfo);
  router.get('/test', controller.home.test);
  router.resources('/user', controller.user);


  // socket controller
  // io.of('/').route('createRoom', io.controller.room.create);
  // io.of('/').route('test', io.controller.game.test);
  // io.of('/').route('joinRoom', io.controller.game.joinRoom);
  io.of('/').route('throwDice', io.controller.game.throwDice);
  io.of('/').route('buyArea', io.controller.game.buyArea);
  io.of('/').route('saleHouse', io.controller.game.saleHouse);
};
