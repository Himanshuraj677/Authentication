import User from "./user.model.js";
import Token from "./token.model.js";

User.hasMany(Token, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Token.belongsTo(User, {
  foreignKey: 'user_id'
});

export {User, Token};