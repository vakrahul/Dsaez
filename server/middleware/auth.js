const jwt = require('jsonwebtoken');
const User = require('../models/user');

// This middleware checks if a user is authenticated and has admin privileges.
exports.isAdmin = async (req, res, next) => {
  // 1. Get the token from the request header.
  const token = req.header('x-auth-token');

  // 2. Check if a token exists. If not, the user is not authenticated.
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // 3. Verify the token using the JWT secret.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // The decoded token payload contains the user ID.
    const userId = decoded.user.id;

    // 4. Find the user in the database using the ID from the token.
    const user = await User.findById(userId);

    // 5. Check if the user exists and has the isAdmin flag set to true.
    if (!user || !user.isAdmin) {
      // If they don't, return a 403 Forbidden error.
      return res.status(403).json({ msg: 'Access denied: Admin role required' });
    }

    // 6. If both checks pass, attach the user object to the request and proceed to the next middleware or route handler.
    req.user = decoded.user;
    next();
  } catch (err) {
    // If token verification fails, return a 401 Unauthorized error.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
