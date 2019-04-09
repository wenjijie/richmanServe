module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      integral: { type: Number, required: true, default: 0 }    // 积分
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('User', UserSchema);
};
