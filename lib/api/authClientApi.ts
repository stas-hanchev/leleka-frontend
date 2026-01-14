import { NextServer } from "./api"

export const logout = async (): Promise<void> => {
    await NextServer.post('/auth/logout')
}