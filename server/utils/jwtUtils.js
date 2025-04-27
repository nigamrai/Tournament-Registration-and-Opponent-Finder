import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
class JWTUtils {    
    generateToken(user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return token;
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}
const JwtService=new JWTUtils();
export default JwtService;