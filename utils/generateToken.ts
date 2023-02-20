import jwt from 'jsonwebtoken';
type payload={
    id:string|number
}
export const createAccessToken=(payload:payload)=>{
    return jwt.sign(payload,(process.env.ACCESS_TOKEN_SECRET||''),{expiresIn:'15m'})
}

export const createRefreshToken=(payload:payload)=>{
    return jwt.sign(payload,(process.env.REFRESH_TOKEN_SECRET||''),{expiresIn:'7d'})
}