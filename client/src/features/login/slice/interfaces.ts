interface LoginState {
    email: string;
    password: string;
}

interface ILoginData {
    property: keyof LoginState;
    value: any;
}  