import bcrypt from "bcrypt"

export const hasPassword = async (password: string) => {
    return await bcrypt.hash(password, 12)
}

export const comparePasswords = async (str: string, hash: string) => {
    return await bcrypt.compare(str, hash)
}
