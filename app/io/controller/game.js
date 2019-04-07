'use strict';
const uuid = require('uuid');

const Controller = require('egg').Controller;

module.exports = class extends Controller {
    // async test() {
    //     console.log('test -----------------')
    //     const { ctx, app, config } = this;
    //     const message = ctx.args[0] || {};
    //     try {
    //         let userInfo = await app.redis.hgetall(config.redis.prefix + 'token-' + message.token);
    //         console.log('user111: ', userInfo)
    //         let roomId = '336';
    //         // ctx.socket.join(roomId);
    //         let colors = ['red', 'yellow', 'orange', 'green', 'blue', 'purple', 'saddlebrown', 'silver'];
    //         let random = Math.floor(Math.random() * colors.length) <= colors.length - 1 ? Math.floor(Math.random() * colors.length) : colors.length - 1;
    //         colors.splice(random, 1);
    //         console.log(colors)
    //         let area = config.country;
    //         for (let i in area) {
    //             area[i].owner = '';
    //             area[i].rank = 0;
    //         }

    //         let roomInfo = {
    //             name: message.name,
    //             userNum: 1,
    //             max: message.max,
    //             status: '等待',
    //             colors: colors,
    //             playerIds: [userInfo._id],
    //             currentRound: 0,
    //             currentStatus: 'dice',  // 等待掷骰子(dice)、等待玩家操作(oper)
    //             initMoney: message.money,
    //             players: JSON.stringify({
    //                 [userInfo._id]: {
    //                     username: userInfo.username,
    //                     step: 0,
    //                     money: message.money,
    //                     color: colors[random],
    //                     position: {
    //                         x: 91.67,
    //                         y: 85.815
    //                     },
    //                     area: config.country[0],
    //                     createdAt: userInfo.createdAt
    //                 }
    //             }),
    //             area: JSON.stringify(area)
    //         }
    //         console.log('aaa" ', colors[random])
    //         console.log('roomInfo: ', roomInfo)
    //         app.redis.hmset(config.redis.prefix + 'room-' + roomId, roomInfo)
    //     } catch (error) {
    //         app.logger.error(error);
    //     }
    // }

    // /**
    //  * 加入房间
    //  */
    // async joinRoom() {
    //     console.log('====================================')
    //     console.log('joinRoom')
    //     const { ctx, app, config } = this;
    //     const message = ctx.args[0] || {};
    //     try {
    //         const nsp = app.io.of('/');
    //         let userInfo = await app.redis.hgetall(config.redis.prefix + 'token-' + message.token);
    //         console.log('userss: ', userInfo);
    //         let roomInfo = await app.redis.hgetall(message.roomId)
    //         if (!ctx.helper.isEmpty(roomInfo) && !ctx.helper.isEmpty(roomInfo.players) && roomInfo.status === '等待') {
    //             let players = JSON.parse(roomInfo.players);
    //             if (!ctx.helper.isEmpty(userInfo._id) && ctx.helper.isEmpty(players[userInfo._id])) {
    //                 // ctx.socket.join(message.roomId);
    //                 let colors = roomInfo.colors.split(',');
    //                 console.log('cccc: ', colors)
    //                 let random = Math.floor(Math.random() * colors.length) <= colors.length - 1 ? Math.floor(Math.random() * colors.length) : colors.length - 1;
    //                 colors.splice(random, 1);
    //                 console.log('cccc: ', colors)
    //                 console.log('ran:', random);
    //                 players[userInfo._id] = {
    //                     username: userInfo.username,
    //                     step: 0,
    //                     money: roomInfo.initMoney,
    //                     color: colors[random],
    //                     position: {
    //                         x: 91.67,
    //                         y: 85.815
    //                     },
    //                     area: config.country[0],
    //                     createdAt: userInfo.createdAt
    //                 }
    //                 let playerIds = roomInfo.playerIds += ',' + userInfo._id;
    //                 await app.redis.hmset(message.roomId, { players: JSON.stringify(players), playerIds: playerIds });
    //             }
    //         }else {
    //             nsp.emit(message.roomId + '-joinRoomBack', {
    //                 _id: userInfo._id,
    //                 nextPlayer: playerIds[roomInfo.currentRound],
    //                 result: 'noRound',
    //                 throughStart: false
    //             })
    //         }
    //         // app.redis.hmset(config.redis.prefix + 'room-' + message.roomId, roomInfo)
    //     } catch (error) {
    //         app.logger.error(error);
    //     }
    // }

    /**
     * 扔骰子
     */
    async throwDice() {
        console.log('====================================')
        console.log('throwDice')
        const { ctx, app, config } = this;
        const message = ctx.args[0] || {};
        try {


            let userInfo = await app.redis.hgetall(config.redis.prefix + 'token-' + message.token);
            // console.log('users：', userInfo);
            let roomInfo = await app.redis.hgetall(message.roomId)
            if (!ctx.helper.isEmpty(roomInfo) && !ctx.helper.isEmpty(roomInfo.players)) {
                let players = JSON.parse(roomInfo.players);
                let area = JSON.parse(roomInfo.area);
                if (!ctx.helper.isEmpty(players[userInfo._id])) {

                    let playerIds = roomInfo.playerIds.split(',');
                    // console.log(roomInfo.currentRound)
                    // console.log('curr: ', playerIds[roomInfo.currentRound])
                    if (playerIds[roomInfo.currentRound] === userInfo._id) {
                        // 获得骰子点数
                        let random = Math.floor(Math.random() * 6) + 1;
                        if (random === 7) {
                            random = 6;
                        }

                        // 更新信息
                        let before = players[userInfo._id].step;
                        let beforeRound = roomInfo.currentRound;
                        players[userInfo._id].step = (players[userInfo._id].step + random) % 34;
                        players[userInfo._id].area = area[players[userInfo._id].step];

                        // 得到下一轮玩家id
                        while (true) {
                            roomInfo.currentRound = (Number(roomInfo.currentRound) + 1) % (playerIds.length);
                            console.log('aaa: ', roomInfo.currentRound)
                            console.log('eee: ', roomInfo.playerIds);
                            console.log('ccc: ', roomInfo.playerIds.split(',')[roomInfo.currentRound])
                            // console.log('bbb: ', players[roomInfo.playerIds.split(',')[roomInfo.currentRound]])
                            console.log('fff: ', players[roomInfo.playerIds.split(',')[roomInfo.currentRound]].status)
                            if (players[roomInfo.playerIds.split(',')[roomInfo.currentRound]].status === 'normal') {
                                console.log('正常通过')
                                break;
                            }
                        }
                        const nsp = app.io.of('/');

                        console.log('next: ', playerIds[roomInfo.currentRound])
                        // 目的地区的影响（地皮、机会、命运、海洋、监狱、起点）
                        let result = {
                            _id: userInfo._id,
                            nextPlayer: playerIds[roomInfo.currentRound],
                            result: 'run',
                            step: random,
                            area: area[players[userInfo._id].step],
                            effect: '',
                            throughStart: false,
                            payFor: ''
                        };
                        // 经过起点得2000元
                        if (before > players[userInfo._id].step) {
                            players[userInfo._id].money += 2000;
                            result.throughStart = true;
                        }
                        if (result.area.type === 'chance' || result.area.type === 'fate') {
                            if (result.area.type === 'chance') {
                                let randomChance = Math.floor(Math.random() * Object.keys(config.chances).length) + 1;
                                if (randomChance === Object.keys(config.chances).length) {
                                    randomChance = Object.keys(config.chances).length - 1;
                                }
                                // console.log('sss: ', config.chances);
                                // console.log('ran: ', randomChance);
                                result.effect = config.chances[randomChance];
                            } else {
                                let randomFate = Math.floor(Math.random() * Object.keys(config.chances).length) + 1;
                                if (randomFate === Object.keys(config.chances).length) {
                                    randomFate = Object.keys(config.chances).length - 1;
                                }
                                // console.log('sss: ', config.chances);
                                // console.log('ran: ', randomFate);
                                result.effect = config.fates[randomFate];
                            }

                            let houseMoey = calcHouseMoey(area, userInfo._id);
                            if (Number(players[userInfo._id].money) + result.effect.effect > 0) {
                                players[userInfo._id].money = Number(players[userInfo._id].money) + result.effect.effect;
                            } else if (Number(players[userInfo._id].money) + result.effect.effect + houseMoey > 0) {
                                // 现金不足
                                // 需出售房产
                                result.result = 'needSaleHouse';
                                let afterRound = roomInfo.currentRound;
                                roomInfo.currentRound = beforeRound;

                                // 推送卖方倒计时
                                // 标识倒计时，用来消除倒计时
                                result.orderId = uuid.v1();
                                countDown(30, result.orderId, userInfo._id, message.roomId, playerIds[afterRound], afterRound, app, async () => {
                                    let roomInfo2 = await app.redis.hgetall(message.roomId);
                                    let players2 = JSON.parse(roomInfo2.players);
                                    let area2 = JSON.parse(roomInfo2.area);

                                    let result2 = '';
                                    let sale = [];
                                    console.log('result: ', result);
                                    if (Number(players2[userInfo._id].money) + result.effect.effect > 0) {
                                        players2[userInfo._id].money = Number(players2[userInfo._id].money) + result.effect.effect;
                                        // players2[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                        result2 = 'moneyEnough'
                                    } else {
                                        // 现金依然不足
                                        // 依次出售拥有的房产直至现金足够为止
                                        for (let i in area2) {
                                            if (area2[i].owner == userInfo._id && area2[i].type == 'place') {
                                                area2[i].houseId = i;
                                                sale.push(area2[i]);
                                                let flag = false;
                                                // 卖房
                                                for (let j = Number(area2[i].rank) - 1; j > 0; j--) {
                                                    players2[userInfo._id].money += area2[j].upgradePrice / 2;
                                                    area2[i].rank = Number(area2[i].rank) - 1;
                                                    if (Number(players2[userInfo._id].money) + result.effect.effect > 0) {
                                                        players2[userInfo._id].money = Number(players2[userInfo._id].money) + result.effect.effect;
                                                        flag = true;
                                                        break;
                                                    }
                                                }
                                                if (flag) {
                                                    // 钱已足够
                                                    break;
                                                }

                                                if (Number(area2[i].rank) < 2) {
                                                    // 卖地
                                                    players2[userInfo._id].money += area2[i].price / 2;
                                                    area2[i].owner = '';
                                                    area2[i].rank = 0;
                                                }

                                                if (Number(players2[userInfo._id].money) + result.effect.effect > 0) {
                                                    // 钱已足够
                                                    players2[userInfo._id].money = Number(players2[userInfo._id].money) + result.effect.effect;
                                                    break;
                                                }
                                            }
                                        }

                                        console.log('player2: ', players2);
                                        console.log('area2: ', area2);
                                        // 更新房产、资金
                                        await app.redis.hmset(message.roomId, { players: JSON.stringify(players2), area: JSON.stringify(area2) });
                                        // 广播点数和目的地区信息
                                        // console.log('res: ', result)
                                        result2 = 'autoSaleHouse';
                                    }

                                    nsp.emit(message.roomId + '-needSaleHouseBack', {
                                        _id: userInfo._id,
                                        result: result2,
                                        payPlayerMoney: players2[userInfo._id].money,
                                        effect: result.effect.effect,
                                        payFor: result.area.owner,
                                        area: result.area,
                                        sale: sale
                                    })
                                });
                            } else if (Number(players[userInfo._id].money) + result.effect.effect + houseMoey < 0) {
                                // 无力支付
                                // 将房产全部变卖后所有资金给对方
                                result.result = 'nothingToPay';
                                players[userInfo._id].money = -1;
                                players[userInfo._id].status = 'bankrupt';
                                roomInfo.aliveNum -= 1;
                                // players[result.area.owner].money += Number(players[result.area.owner].money) + houseMoey;

                                // 拥有的房产出售变为无主
                                for (let i in area) {
                                    if (area[i].owner == userInfo._id && area[i].type == 'place') {
                                        area[i].owner = '';
                                        area[i].rank = 0;
                                    }
                                }
                            }

                            // console.log('chance: ', result.effect);

                        } else if (result.area.type === 'prison') {
                            result.effect = {
                                text: '入狱',
                                result: '停止收益，需转轮盘逃出',
                                effect: 0
                            }
                        } else if (result.area.type === 'place') {
                            // console.log('area: ', result.area.owner)
                            if (ctx.helper.isEmpty(result.area.owner)) {
                                // console.log('place-1', roomInfo.currentRound)
                                result.result = 'buy';
                                // console.log('--- buy')
                                // console.log('be: ', result.nextPlayer);
                                // console.log('beR: ', beforeRound);
                                let afterRound = roomInfo.currentRound;
                                roomInfo.currentRound = beforeRound;
                                result.nextPlayer = playerIds[roomInfo.currentRound];
                                // console.log('place-2', roomInfo.currentRound);
                                // console.log('next: ', result.nextPlayer);

                                // 推送够买升级倒计时
                                // let countDown = 20;
                                // 标识倒计时，用来消除倒计时
                                result.orderId = uuid.v1();
                                countDown(20, result.orderId, userInfo._id, message.roomId, playerIds[afterRound], afterRound, app);
                            } else if (result.area.owner === userInfo._id) {
                                result.result = 'upgrade';
                                let afterRound = roomInfo.currentRound;
                                roomInfo.currentRound = beforeRound;
                                result.nextPlayer = playerIds[roomInfo.currentRound];

                                // let countDown = 20;
                                result.orderId = uuid.v1();
                                countDown(20, result.orderId, userInfo._id, message.roomId, playerIds[afterRound], afterRound, app);
                            } else {
                                result.result = 'pay';
                                result.payFor = result.area.owner;
                                console.log('rank: ', result.area.rank)
                                console.log('收入', result.area.income);

                                let houseMoey = calcHouseMoey(area, userInfo._id);
                                if (Number(players[userInfo._id].money) > Number(result.area.income[result.area.rank])) {
                                    players[userInfo._id].money -= result.area.income[result.area.rank];
                                    players[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                } else if (Number(players[userInfo._id].money) + houseMoey > Number(result.area.income[result.area.rank])) {
                                    // 现金不足
                                    // 需出售房产
                                    result.result = 'needSaleHouse';
                                    let afterRound = roomInfo.currentRound;
                                    roomInfo.currentRound = beforeRound;

                                    // 推送卖方倒计时
                                    // 标识倒计时，用来消除倒计时
                                    result.orderId = uuid.v1();
                                    countDown(30, result.orderId, userInfo._id, message.roomId, playerIds[afterRound], afterRound, app, async () => {
                                        let roomInfo2 = await app.redis.hgetall(message.roomId);
                                        let players2 = JSON.parse(roomInfo2.players);
                                        let area2 = JSON.parse(roomInfo2.area);

                                        let result2 = '';
                                        let sale = [];
                                        if (Number(players2[userInfo._id].money) > Number(result.area.income[result.area.rank])) {
                                            console.log('现金充足');
                                            players2[userInfo._id].money -= result.area.income[result.area.rank];
                                            players2[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                            result2 = 'moneyEnough'
                                        } else {
                                            console.log('现金依然不足');
                                            // 现金依然不足
                                            // 依次出售拥有的房产直至现金足够为止
                                            for (let i in area2) {
                                                if (area2[i].owner == userInfo._id && area2[i].type == 'place') {
                                                    area2[i].houseId = i;
                                                    sale.push(area2[i]);
                                                    console.log('=========\n卖: ', area2[i]);
                                                    debugger;
                                                    let flag = false;
                                                    // 卖房
                                                    for (let j = Number(area2[i].rank) - 1; j > 0; j--) {
                                                        console.log('卖第', area2[i].rank - 1, '层楼');
                                                        players2[userInfo._id].money += area2[i].upgradePrice / 2;
                                                        area2[i].rank = Number(area2[i].rank) - 1;
                                                        console.log('--', area2[i])
                                                        if (Number(players2[userInfo._id].money) > Number(result.area.income[result.area.rank])) {
                                                            console.log('卖楼够了')
                                                            // players2[userInfo._id].money -= result.area.income[result.area.rank];
                                                            // players2[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                                            players2[userInfo._id].money -= result.area.income[result.area.rank];
                                                            players2[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                                            flag = true;
                                                            break;
                                                        }
                                                    }
                                                    console.log('flag: ', flag);
                                                    if (flag) {
                                                        // 钱已足够
                                                        break;
                                                    }

                                                    console.log('area2.rank: ', area2[i]);
                                                    console.log(Number(area2[i].rank) < 2)
                                                    if (Number(area2[i].rank) < 2) {
                                                        console.log('卖掉土地： ', area2[i].country);
                                                        // 卖地
                                                        players2[userInfo._id].money += area2[i].price / 2;
                                                        area2[i].owner = '';
                                                        area2[i].rank = 0;
                                                    }

                                                    if (Number(players2[userInfo._id].money) > Number(result.area.income[result.area.rank])) {
                                                        // 钱已足够
                                                        console.log('卖地够了');
                                                        players2[userInfo._id].money -= result.area.income[result.area.rank];
                                                        players2[result.area.owner].money += Number(result.area.income[result.area.rank]);
                                                        break;
                                                    }
                                                }
                                            }

                                            console.log('更新');
                                            // 更新房产、资金
                                            await app.redis.hmset(message.roomId, { players: JSON.stringify(players2), area: JSON.stringify(area2) });
                                            // 广播点数和目的地区信息
                                            // console.log('res: ', result)
                                            result2 = 'autoSaleHouse';
                                        }

                                        nsp.emit(message.roomId + '-needSaleHouseBack', {
                                            _id: userInfo._id,
                                            result: result2,
                                            payPlayerMoney: players2[userInfo._id].money,
                                            getPlayerMoney: players2[result.area.owner].money,
                                            effect: Number(result.area.income[result.area.rank]),
                                            payFor: result.area.owner,
                                            area: result.area,
                                            sale: sale
                                        })
                                    });

                                } else if (Number(players[userInfo._id].money) + houseMoey < Number(result.area.income[result.area.rank])) {
                                    // 无力支付
                                    // 将房产全部变卖后所有资金给对方
                                    result.result = 'nothingToPay';
                                    players[userInfo._id].money = -1;
                                    players[result.area.owner].money += Number(players[result.area.owner].money) + houseMoey;
                                    players[userInfo._id].status = 'bankrupt';
                                    roomInfo.aliveNum -= 1;

                                    // 拥有的房产出售变为无主
                                    for (let i in area) {
                                        if (area[i].owner == userInfo._id && area[i].type == 'place') {
                                            area[i].owner = '';
                                            area[i].rank = 0;
                                        }
                                    }
                                }
                            }
                        }

                        console.log('t: ', typeof players[userInfo._id].money)
                        console.log('money', players[userInfo._id].money);
                        console.log('flag: ', players[userInfo._id].money < 0)
                        // if (players[userInfo._id].money < 0) {
                        //     console.log('破产');
                        //     players[userInfo._id].status = 'bankrupt';
                        //     roomInfo.aliveNum -= 1;
                        //     nsp.emit(message.roomId + '-bankrupt', {
                        //         _id: userInfo._id
                        //     })
                        // }

                        // 只剩以为玩家存活，游戏结束
                        if (roomInfo.aliveNum <= 1) {
                            nsp.emit(message.roomId + '-gameOver', {
                                _id: userInfo._id
                            })
                        }

                        console.log('设置redis')
                        // console.log('s', roomInfo.currentRound)
                        await app.redis.hmset(message.roomId, { players: JSON.stringify(players), currentRound: roomInfo.currentRound, aliveNum: roomInfo.aliveNum });
                        // 广播点数和目的地区信息
                        // console.log('res: ', result)
                        nsp.emit(message.roomId + '-throwDiceBack', result)
                    } else {
                        // console.log('没到你买房');
                        // console.log(playerIds[roomInfo.currentRound]);
                        // console.log(userInfo._id);

                        const nsp = app.io.of('/');
                        nsp.emit(message.roomId + '-throwDiceBack', {
                            _id: userInfo._id,
                            nextPlayer: playerIds[roomInfo.currentRound],
                            result: 'noRound',
                            throughStart: false
                        })
                    }
                }
            }
            // app.redis.hmset(config.redis.prefix + 'room-' + message.roomId, roomInfo)
        } catch (error) {
            app.logger.error(error);
        }
    }

    /**
     * 选择是否够买
     */
    async buyArea() {
        console.log('====================================')
        console.log('buyArea')
        const { ctx, app, config } = this;
        const message = ctx.args[0] || {};
        try {
            let userInfo = await app.redis.hgetall(config.redis.prefix + 'token-' + message.token);
            let roomInfo = await app.redis.hgetall(message.roomId)
            if (!ctx.helper.isEmpty(roomInfo) && !ctx.helper.isEmpty(roomInfo.players)) {
                let players = JSON.parse(roomInfo.players);
                let area = JSON.parse(roomInfo.area);
                if (!ctx.helper.isEmpty(players[userInfo._id])) {
                    let playerIds = roomInfo.playerIds.split(',');
                    if (playerIds[roomInfo.currentRound] === userInfo._id) {
                        let result = 'noBuy';
                        if (message.isBuy) {
                            console.log('area: ', area[players[userInfo._id].step]);
                            if (area[players[userInfo._id].step].owner === '') {
                                if (players[userInfo._id].money > area[players[userInfo._id].step].price) {
                                    area[players[userInfo._id].step].owner = userInfo._id;
                                    area[players[userInfo._id].step].rank += 1;
                                    players[userInfo._id].money -= area[players[userInfo._id].step].price;
                                    result = 'buy';
                                } else {
                                    result = 'noMoney';
                                }
                            } else if (area[players[userInfo._id].step].owner === userInfo._id) {
                                if (players[userInfo._id].money > area[players[userInfo._id].step].upgradePrice) {
                                    players[userInfo._id].money -= area[players[userInfo._id].step].upgradePrice;
                                    area[players[userInfo._id].step].rank += 1;
                                    result = 'upgrade';
                                } else {
                                    result = 'noMoney';
                                }
                            } else {
                                result = 'isBought'
                            }
                        }
                        // roomInfo.currentRound = (Number(roomInfo.currentRound) + 1) % (playerIds.length);
                        while (true) {
                            roomInfo.currentRound = (Number(roomInfo.currentRound) + 1) % (playerIds.length);
                            console.log('aaa: ', roomInfo.currentRound)
                            console.log('eee: ', roomInfo.playerIds);
                            console.log('ccc: ', roomInfo.playerIds.split(',')[roomInfo.currentRound])
                            // console.log('bbb: ', players[roomInfo.playerIds.split(',')[roomInfo.currentRound]])
                            console.log('fff: ', players[roomInfo.playerIds.split(',')[roomInfo.currentRound]].status)
                            if (players[roomInfo.playerIds.split(',')[roomInfo.currentRound]].status === 'normal') {
                                console.log('正常通过')
                                break;
                            }
                        }
                        await app.redis.hmset(message.roomId, { players: JSON.stringify(players), area: JSON.stringify(area), currentRound: roomInfo.currentRound % playerIds.length });
                        // 标记已处理过
                        await app.redis.set(message.orderId, true);
                        const nsp = app.io.of('/');
                        nsp.emit(message.roomId + '-buyAreaBack', {
                            _id: userInfo._id,
                            nextPlayer: playerIds[roomInfo.currentRound],
                            money: players[userInfo._id].money,
                            result: result,
                            area: area[players[userInfo._id].step]
                        })
                    } else {
                        const nsp = app.io.of('/');
                        nsp.emit(message.roomId + '-buyAreaBack', {
                            _id: userInfo._id,
                            nextPlayer: playerIds[roomInfo.currentRound],
                            result: 'noRound'
                        })
                    }
                }
            }
        } catch (error) {
            app.logger.error(error);
        }
    }

    /**
     * 出售一间房屋或地皮
     */
    async saleHouse() {
        console.log('====================================')
        console.log('saleHouse')
        const { ctx, app, config } = this;
        const message = ctx.args[0] || {};
        try {
            let userInfo = await app.redis.hgetall(config.redis.prefix + 'token-' + message.token);
            let roomInfo = await app.redis.hgetall(message.roomId)
            if (!ctx.helper.isEmpty(roomInfo) && !ctx.helper.isEmpty(roomInfo.players)) {
                let players = JSON.parse(roomInfo.players);
                let areas = JSON.parse(roomInfo.area);

                let result = '';
                let area = areas[message.id];
                if (area.owner == userInfo._id && Number(area.rank) > 0 && area.type == 'place') {
                    console.log('area: ', area);

                    if (Number(area.rank) > 1) {
                        console.log('1111');
                        areas[message.id].rank = Number(area.rank) - 1;
                        players[userInfo._id].money = Number(players[userInfo._id].money) + area.upgradePrice / 2;
                        result = 'house';
                    } else {
                        console.log('2222')
                        areas[message.id].rank = 0;
                        areas[message.id].owner = '';
                        players[userInfo._id].money = Number(players[userInfo._id].money) + area.price / 2;
                        result = 'place';
                    }
                } else {
                    result = 'noOwner';
                }

                await app.redis.hmset(message.roomId, { players: JSON.stringify(players), area: JSON.stringify(areas) });
                const nsp = app.io.of('/');
                nsp.emit(message.roomId + '-saleHouseBack', {
                    _id: userInfo._id,
                    username: userInfo.username,
                    result: result,
                    area: area,
                    houseId: message.id,
                    money: players[userInfo._id].money
                })
            }
        } catch (error) {
            app.logger.error(error);
        }
    }
}

/**
 * 计算不动产
 * @param {*} areas 全部地区信息
 * @param {*} userId 用户id
 */
function calcHouseMoey(areas, userId) {
    let money = 0;
    for (let i in areas) {
        if (areas[i].owner == userId && areas[i].type == 'place') {
            money += areas[i].price + areas[i].upgradePrice * (Number(areas[i].rank) - 1);
        }
    }

    return money;
}

/**
 * 倒计时
 */
async function countDown(countDown, orderId, userId, roomId, nextPlayer, afterRound, app, callback) {
    // 推送够买升级倒计时
    // let countDown = 20;
    // 标识倒计时，用来消除倒计时
    // result.orderId = uuid.v1();
    await app.redis.set(orderId, false);
    app.redis.expire(orderId, countDown + 10);
    const nsp = app.io.of('/');
    // 每秒减一
    let timer = setInterval(async () => {
        // 已处理过则不再计时，清空计时器（已够买或取消够买）
        let isProcessed = await app.redis.get(orderId);
        if (isProcessed == 'false') {
            // console.log('tt: ', countDown);
            nsp.emit(roomId + '-countDown', {
                _id: userId,
                countDown: countDown
            })
            countDown -= 1;

            if (countDown < 0) {
                clearInterval(timer);
                // console.log('倒计时结束');
                app.redis.hmset(roomId, { currentRound: afterRound });
                nsp.emit(roomId + '-currentRound', {
                    _id: userId,
                    nextPlayer: nextPlayer
                })
                if (callback) {
                    callback();
                }
            }
        } else {
            clearInterval(timer);
        }
    }, 1000);
}