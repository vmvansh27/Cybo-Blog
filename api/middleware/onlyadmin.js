// import jwt from 'jsonwebtoken'
// export const onlyadmin = async (req, res, next) => {
//     try {
//         const token = req.cookies.access_token
//         if (!token) {
//             return next(403, 'Unathorized')
//         }
//         const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
//         if (decodeToken.role === 'admin') {
//             req.user = decodeToken
//             next()
//         } else {
//             return next(403, 'Unathorized')
//         }
//     } catch (error) {
//         next(500, error.message)
//     }
// }


import jwt from 'jsonwebtoken'

export const onlyadmin = async (req, res, next) => {
    // console.log("onlyadmin middleware triggered")

    try {
        const token = req.cookies.access_token
        // console.log("Token from cookie:", token)
        if (!token) {
            return next({ status: 403, message: 'Unauthorized' })
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        // console.log(decodeToken)

        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            return next({ status: 403, message: 'Unauthorized' })
        }
    } catch (error) {
        next({ status: 500, message: error.message })
    }
}
