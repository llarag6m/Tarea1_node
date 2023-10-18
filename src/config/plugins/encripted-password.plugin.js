import bcrypt from 'bcrypt'

export const encryptedPassword = async(password) =>{
    const encry = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, encry)
}

export const verifyPassword = async(bodyPassword, userPassword) =>{
    return await bcrypt.compare(bodyPassword, userPassword)
}