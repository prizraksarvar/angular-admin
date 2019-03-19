import bcrypt from 'bcryptjs';

export const generateToken = () => {
    return (new Promise<string>((resolve,reject)=> {
        bcrypt.genSalt(64, function (err, salt) {
            if (err) {
                reject(err);
            }
            resolve(salt);
        });
    }));
};
