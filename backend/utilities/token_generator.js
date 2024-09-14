const jwt = require('jsonwebtoken');

module.exports = (email, id, userType) => {
  const token = jwt.sign(
    { email, userId: id.toString(), userType },
    process.env.SECRET,
    { expiresIn: '1h' }
  );
  return token;
};
