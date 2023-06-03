            const jwt = require('jsonwebtoken');

            function generateToken(user) {
              const payload = {
                id: user._id,
                email: user.email
              };
              const secret = process.env.JWT_SECRET || '284927037804514';
              const options = {
                expiresIn: '2h',
              };

              return jwt.sign(payload, secret, options);
            }

            module.exports = {
              generateToken
            }
