const { login } =require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')



const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path
    //登陆接口
    if (method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body
        const username = req.query.username
        const password = req.query.password
        const result = login(username, password)
        return result.then((data) => {
            if (data.username) {
                req.session.userName = data.username
                req.session.realName = data.realname
                return new SuccessModel(data)
            } else {
                return new ErrorModel('登陆失败')
            }
        })
    }
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.session.username
                })
            )
        } else {
            return Promise.resolve(
                new ErrorModel('尚未登陆')
            )
        }
    }
}

module.exports = handleUserRouter
