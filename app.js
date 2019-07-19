const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
    //处理post数据
    handlePostData(req).then((postData) => {
        //储存post数据
        req.body = postData
        //处理blog路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }
        //处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }
    })
    //未命中路由
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()

}

module.exports = serverHandle
