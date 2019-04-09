module.exports = app => {
  const mongoose = app.mongoose;
  const GameSchema = new mongoose.Schema(
    {
      roomId: { type: String, required: true },
      name: { type: String, required: true },
      userNum: { type: Number, required: true },
      aliveNum: { type: Number, required: true },
      max: { type: Number, required: true },
      status: { type: String, required: true, enum: ['等待', '游戏中', '已结束'], default: '等待' },
      owner: { type: mongoose.Schema.Types.ObjectId, required: true },
      initMoney: { type: Number, required: true },
      players: [{
        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        username: {type: String, required: true},
        color: {type: String, required: true},
        money: {type: Number, required: true},
        status: {type: String, required: true, enum: ['normal', 'bankrupt', 'win']},
        rank: {type: Number, required: true},     // 最终名次
      }],
      area: { type: Object, required: true },
      colors: [{ type: String }],
      endTime: {type: Date}
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('Game', GameSchema);
};
