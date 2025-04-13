declare class BcryptUtil {
    static hashPassword(password: string): string;
    static comparePassword(password: string, hash: string): boolean;
}
export { BcryptUtil };
