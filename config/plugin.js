'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  cors: {
    enable: true,
    package: 'egg-cors'
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  }
};
