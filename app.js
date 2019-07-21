const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const SESSION_DATA = {}

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toUTCString()
}

const handlePostData = (req) => {
    return new Promise((resolve, reject) => {
        //不是post请求返回空数据
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        //格式不是json返回空数据
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        //接受数据
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk
        })
        req.on('end', () => {
            //数据为空，返回空数据
            if (!postData) {
                resolve({})
            } else {
                //传出数据
                resolve(JSON.parse(postData))
            }
        })

    })
}

const serverHandle = (req, res) => {
    //设置返回json格式
    res.setHeader('Content-type', 'application/json')
    //解析url path
    const url = req.url
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])
    //解析cookie
    const cookieStr = req.headers.cookie || '';
    req.cookie = {}
    cookieStr.split(';').forEach((item) => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    //解析section
    let needSetCookie = false
    let sessionId = req.cookie.sessionid
    if (sessionId) {
        if(!SESSION_DATA[sessionId]) {
            SESSION_DATA[sessionId] = {}
        }
    } else {
        needSetCookie = true
        sessionId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[sessionId] = {}
    }
    req.session = SESSION_DATA[sessionId]
    //处理post数据
    handlePostData(req).then((postData) => {
        //储存post数据
        req.body = postData
        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then((blogData) => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `sessionid=${sessionId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        //处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then((userData) => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `sessionid=${sessionId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        //未命中路由
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle
