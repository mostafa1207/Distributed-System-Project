const jwt = require('jsonwebtoken');

module.exports = (email, id, userType) => {
  const token = jwt.sign(
    { email, userId: id.toString(), userType },
    'ThisIsASecretKeyYouShouldNotShareItWithAnyOne',
    { expiresIn: '1h' }
  );
  return token;
};
