'use strict';
const { Service } = require('egg');

class BaseService extends Service {
  success(data) {
    return {
      errno : this.config.result.SUCCESS.errno,
      errmsg: '成功',
      data  : data || ''
    };
  }
  // fail(msg, no) {
  //   return {
  //     errno: no || 400,
  //     errmsg: msg || '内部错误'
  //   };
  // }
  /**
   * 新增fail方法，方便使用result参数，
   * 为方便自定义errno、errmsg方法，加入tmp参数，
   * 第一个参数为object类型时使用result参数方法，
   * 否则参数含义为(errno, errmsg, data)
   */
  fail(resultEnum, data, message) {
    let obj;
    if (typeof resultEnum == 'object') {
      obj = {
        errno : resultEnum.errno,
        errmsg: message!==undefined&&message!=='' ? message: resultEnum.errmsg,
        data  : data || ''
      };
    } else {
      obj = {
        errno : resultEnum,
        errmsg: data,
        data  : message
      }
    }
    return obj;
  }
}
module.exports = BaseService;
