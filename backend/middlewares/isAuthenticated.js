import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
      
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                message: "Server configuration error: SECRET_KEY is missing",
                success: false,
            });
        }

        
        const token = req.cookies?.token;
       
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated: Token missing",
                success: false,
            });
        }

      const secretkey=process.env.SECRET_KEY;
        const decoded = jwt.verify(token,secretkey );
        req.id = decoded.userId;
      
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Authentication failed: Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
