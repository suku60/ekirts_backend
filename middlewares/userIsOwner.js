// this will help us filter user actions: only owners will be able to update/delete parties
// user will be able to modify only its own data

// module.exports = (req, res, next) => {

//     if (!req.headers.data.userId) {
//         res.status(401).json({ msg: "Unauthorized acess. You need to be logged"});
//     } else {

//         let token = req.headers.authorization.split(" ")[1];

//         jwt.verify(token, authConfig.secret, (err, decoded) => {

//             if (err) {
//                 res.status(500).json({ msg: "Error: Invalid token.", err });
//             } else {
//                 req.user = decoded;
//                 next();
//             }

//         })
//     }

// };