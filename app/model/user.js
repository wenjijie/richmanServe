module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true }
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
