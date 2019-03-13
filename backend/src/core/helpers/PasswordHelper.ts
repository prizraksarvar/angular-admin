import bcrypt from 'bcryptjs';

export const cryptPassword = (password:string) => {
    return (new Promise<string>((resolve,reject)=> {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                return reject(err);

            bcrypt.hash(password, salt, function (err, hash) {
                if (err)
                    reject(err);
                return resolve(hash);
            });
        });
    }));
};

export const comparePassword = (plainPass:string, hashword:string) => {
    return (new Promise<boolean>((resolve,reject)=> {
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
            return err == null ?
                resolve(isPasswordMatch) :
                reject(err);
        });
    }));
};
