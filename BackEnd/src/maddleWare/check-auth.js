import jwt from 'jsonwebtoken'




// Access Token Middleware
const authenticateToken = (req, res, next) => {
  // Get the access token from the request headers or cookies
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // Store decoded user information in request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Refresh Token Middleware
const refreshAccessToken  = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(); // No access token found, proceed to the next middleware
  }

  try {
    jwt.verify(token, 'secretKey');
    next(); // Access token is still valid, proceed to the next middleware
  } catch (error) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh token not provided' });
    }

    try {
      const decoded = jwt.verify(refreshToken, 'tokenRefreshSecretKey');
      const newAccessToken = jwt.sign({ userId: decoded.userId }, 'secretKey', { expiresIn: '1h' });

      res.cookie('accessToken', newAccessToken, { httpOnly: true });
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  }
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

export {isAdmin, refreshAccessToken,authenticateToken}