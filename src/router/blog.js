const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    const id = req.query.id
    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then((listData) => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }
    //新建一篇博客
    if (method === 'POST' && path === '/api/blog/new') {
        req.body.author = '张三'
        const result = newBlog(req.body)
        return result.then((data) => {
            return new SuccessModel(data)
        })
    }
    //更新一篇博客
    if (method === 'POST' && path ==='/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter
