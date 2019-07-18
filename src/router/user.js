const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path

    //登陆接口
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: '这是登陆的接口'
        }
    }
}

module.exports = handleUserRouter
