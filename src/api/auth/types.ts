export interface ILoginRequest {
    login: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;

    login: string;

    role: 'user' | 'staff' | 'admin';
}
