import bcrypt from 'bcryptjs'

const salt = await bcrypt.genSalt(10);

export const hashPassword = async (password) => await bcrypt.hash(password, salt)
export const verifyPassword = async (password, hash) => await bcrypt.compare(password, hash)
