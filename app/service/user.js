'use strict';
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');

const Service = require('../core/base_service');

module.exports = class extends Service {
  /**
   * 注册
   * @param {*} payload 
   */
  async signup(payload) {
    try {
      let isExist = await this.ctx.model.User.find({
        username: payload.username
      });
      if (this.ctx.helper.isEmpty(isExist)) {
        payload.password = sha256(payload.password);
        await this.ctx.model.User.create(payload)
        return this.success();
      } else {
        return this.fail(this.config.result.HAS_EXIST);
      }
    } catch (error) {
      this.logger.error(error); //打印报错信息
      return this.fail(this.config.result.EXCEPTION, error.message);
    }
  }

  /**
   * 查询当前用户信息
   */
  async current() {
    try {
      let userInfo = await this.ctx.model.User.findById(this.ctx.state.userId, {
        password: 0
      });
      if (!this.ctx.helper.isEmpty(userInfo)) {
        return this.success(userInfo);
      } else {
        return this.fail(this.config.result.USER_NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error); //打印报错信息
      return this.fail(this.config.result.EXCEPTION, error.message);
    }
  }

  /**
   * 登录
   * @param {*} payload
   */
  async login(payload) {
    try {
      console.log('pa： ', payload)
      console.log(sha256(payload.password))
      console.log('sss: ', {
        username: payload.username,
        password: sha256(payload.password)
      })
      let user = await this.ctx.model.User.findOne({
        username: payload.username,
        password: sha256(payload.password)
      });

      if (!this.ctx.helper.isEmpty(user)) {
        user = JSON.parse(JSON.stringify(user));
        delete user.password;
        let token = jwt.sign({
          _id: user._id,
          username: user.username
        }, this.config.jwt.secretKey, {
          expiresIn: this.config.jwt.max_token_expire
        });
        await this.app.redis.hmset(this.config.redis.prefix + 'token-' + token, user);
        await this.app.redis.expire(this.config.redis.prefix + 'token-' + token, this.config.jwt.token_expire);

        return this.success({
          token,
          user
        })
      } else {
        return this.fail(this.config.result.LOGIN_FAIL);
      }
    } catch (error) {
      this.logger.error(error); //打印报错信息
      return this.fail(this.config.result.EXCEPTION, error.message);
    }
  }

  /**
   * 更新
   * @param {*} _id 
   * @param {*} payload 
   */
  async update(_id, payload) {
    try {
      let newuser = await this.ctx.model.User.findById(_id);
      if (this.ctx.helper.isEmpty(newuser)) {
        return this.fail(this.config.result.USER_NOT_FOUND);
      }
      await this.ctx.model.User.findByIdAndUpdate(_id, payload);
      return this.success();
    } catch (error) {
      return this.fail(this.config.result.EXCEPTION, error.message);
    }
  }

  /**
   * 查询用户战绩
   * @param {String} userId 用户id
   */
  async getGameInfo(userId) {
    try {
      // let games = await this.ctx.model.Game.find({
      //   'players.userId': this.app.mongoose.Types.ObjectId(userId)
      // }, {
      //   area: 0,
      //   colors: 0
      // });
      let games = await this.ctx.model.Game.aggregate()
        .unwind({
          path: '$players'
        })
        .match({
          'players.userId': this.app.mongoose.Types.ObjectId(userId)
        })
        .project({
          area: 0,
          colors: 0
        })
        .sort({
          createdAt: -1
        })
      console.log('aaa', games);
      return this.success(games);
    } catch (error) {
      return this.fail(this.config.result.EXCEPTION, error.message);
    }
  }
};