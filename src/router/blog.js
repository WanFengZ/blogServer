const { getList } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.author || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }
    //新建一篇博客
    if (method === 'POST' && path === 'api/blog/new') {
        return {
            msg: '这是新建博客的接口'
        }
    }
    //更新一篇博客
    if (method === 'POST' && path ==='api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }
}

module.exports = handleBlogRouter
