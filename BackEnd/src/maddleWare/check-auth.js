import jwt from 'jsonwebtoken'


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Save decoded user information in request object
    req.user = decoded;
    next();
  });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // Check if user's role is admin
  if (req.user && req.user.role === 'admin') {
    next(); // Allow access if user is admin
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
};

export {isAdmin, verifyToken}