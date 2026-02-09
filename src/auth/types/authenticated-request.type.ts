interface AuthenticatedAdmin {
    id: string
    email: string
}

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedAdmin
}