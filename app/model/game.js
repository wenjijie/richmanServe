module.exports = app => {
  const mongoose = app.mongoose;
  const GameSchema = new mongoose.Schema(
    {
      roomId: { type: String, required: true },
      name: { type: String, required: true },
      userNum: { type: Number, required: true },
      max: { type: Number, required: true },
      status: { type: String, required: true },
      owner: { type: mongoose.Schema.Types.ObjectId, required: true },
      initMoney: { type: Number, required: true },
      players: { type: Object, required: true },
      area: { type: Object, required: true },
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
