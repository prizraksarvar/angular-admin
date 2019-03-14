
export interface INextFunction {
    // tslint:disable-next-line callable-types (In ts2.1 it thinks the type alias has no call signatures)
    (err?: any): void;
}
