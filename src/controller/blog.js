const getList = (author, keyword) => {
    //先返回模拟数据
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1563453083909,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1563453157167,
            author: '李四'
        },
    ]
}

module.exports = {
    getList
}
