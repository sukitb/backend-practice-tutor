const userModel = require('./user-model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
class AuthenController {

    async register(req, res) {
        // 1.เช็กข้อมูลว่าซ้ำมั้ย / email ซ้ำมั้ย
        // 2. ซ้ำ ส่ง response กลับไปว่าซ้ำ
        // 3. ไม่ซ้ำ บันทึกลง db
        // 3.1 ส่ง response กลับไปว่า success
        try {
            const { email, password, first_name, last_name } = req.body
            let newUserData
            const foundUser = await userModel.find({ email })
            if (foundUser.length !== 0) {
                console.log(foundUser)
                return res.status(400).send('email is not available')
            } else {
                // hash password
                const saltRounds = '<your salt : number>';
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password, salt);
                const newUser = new userModel({
                    email: email,
                    password: hashedPassword,
                    first_name: first_name,
                    last_name: last_name
                })
                newUserData = await newUser.save()
            }

            return res.send({ newUserData })
        } catch (error) {
            console.log(error)
            return res.send('internal error')
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            // const email = req.body.email
            // const password = req.body.password

            const user = await userModel.findOne({ email })

            // ถ้าอีเมลไม่มีใน db
            if (!user) {
                return res.status(400).send('email or password is wrong')
                // ถ้าอีเมลมีใน db
            } else {
                // เช็กว่า password ถูกต้องมั้ย
                const isPasswordMatch = bcrypt.compareSync(password, user.password)
                // ถ้าถูก
                if (isPasswordMatch) {
                    // สร้าง token
                    const secret = 'cat'
                    const token = jwt.sign(
                        { _id: user._id, email: user.email },
                        secret
                    )
                    return res.send({ token })
                    // ถ้าไม่ถูก
                } else {
                    return res.status(400).send('email or password is wrong')
                }
            }
        } catch (error) {
            console.log(error)
            res.send('internal error')
        }
    }

    async validateToken(req, res) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '')

            if (!token) {
                return res.status(401).send('Access denied')
            } else {
                // ถ้ามี token ให้ decode
                const secret = '<your secret>'
                // ถ้า verify ไม่ผ่าน จะ throw error
                const decoded = jwt.verify(token, secret)
    
                res.send('validate token success')
            }
    
            console.log(token)
            // console.log(cookies)
        } catch (error) {
            console.log(error)
            return res.status(401).send('Access denied')
        }
    }
}

module.exports = new AuthenController()