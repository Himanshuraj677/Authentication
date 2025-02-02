import User from "./user.model.js";
import Token from "./token.model.js";
import Problem from "./probem.model.js";

User.hasMany(Token, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Token.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Problem, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

Problem.belongsTo(User, {
  foreignKey: 'author_id'
});



export {User, Token, Problem};