// pages/home/home.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        contentHight: 0,
        goodsClassifyID: 0,
        goodsTotal: 0,
        cartListState: false,
        store_info: {
            img: "/images/store_photo.png",
            name: "怀湘楼·银轩店",
            notice_icon: "/images/notice.png",
            notice: "欢迎光临"
        }, // store_info对象内容为店面基本信息
        goods_classify: [{
                id: 0,
                name: "全部"
            },
            {
                id: 1,
                name: "大厨推荐"
            },
            {
                id: 2,
                name: "招牌菜"
            },
            {
                id: 3,
                name: "湖南小吃"
            },
            {
                id: 4,
                name: "三湘湖鲜"
            },
            {
                id: 5,
                name: "三湘特色"
            },
            {
                id: 6,
                name: "传统家常"
            },
            {
                id: 7,
                name: "经典凉菜"
            },
            {
                id: 8,
                name: "地道蒸菜"
            },
            {
                id: 9,
                name: "田园时蔬"
            },
            {
                id: 10,
                name: "养胃主食"
            },
            {
                id: 11,
                name: "原味汤羹"
            }
        ],
        goods_list: [{
                goodsID: 0,
                goodsName: '原味肉枣汤 （份）',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 58.00,
                goodsSales: 163,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 1
            },
            {
                goodsID: 1,
                goodsName: '有机菜花',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 26.00,
                goodsSales: 273,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 1
            },
            {
                goodsID: 2,
                goodsName: '阳干鲫鱼',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 49.00,
                goodsSales: 95,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 4
            },
            {
                goodsID: 3,
                goodsName: '湘西腊味四饼',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 68.00,
                goodsSales: 320,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 1
            },
            {
                goodsID: 4,
                goodsName: '青椒焖水鱼',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 128.00,
                goodsSales: 59,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 1
            },
            {
                goodsID: 5,
                goodsName: '经典剁椒鱼头',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 98.00,
                goodsSales: 163,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 2
            },
            {
                goodsID: 6,
                goodsName: '坡子街糖油粑粑',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 12.00,
                goodsSales: 164,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 3
            },
            {
                goodsID: 7,
                goodsName: '将军鸭',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 98.00,
                goodsSales: 164,
                goodsKeywords: ['堂吃', '外卖'],
                goodsClassify: 5
            },
            {
                goodsID: 8,
                goodsName: '原味肉枣汤 （份）',
                goodsImg: '/images/foot_photo.png',
                goodsPrice: 58.00,
                goodsSales: 163,
                goodsKeywords: ['堂吃', '外卖']
            },
        ],
        cart_list: [
            // {
            //     goodsID: 1,
            //     goodsName: '有机菜花',
            //     goodsImg: '/images/foot_photo.png',
            //     goodsPrice: 26.00,
            //     goodsNumber: 2,
            // },
        ]
    },

    switchTab: function(e) {
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return
        } else {
            this.setData({
                currentTab: e.currentTarget.dataset.current
            })
        }
    },

    switchShow: function(e) {
        if (e.detail.source == 'touch') {
            this.setData({
                currentTab: e.detail.current
            })
        }
    },
    //分类
    changeClassify: function(e) {
        if (this.data.goodsClassifyID === e.currentTarget.dataset.classifyid) return
        this.setData({
            goodsClassifyID: e.currentTarget.dataset.classifyid
        })
    },
    // 增加数量
    addGoods: function(e){
        let newcart_list = this.data.cart_list
        //在购物车列表中寻找已近加入购物车的商品
        let found = newcart_list.findIndex(function(item){
            return item.goodsID == e.currentTarget.dataset.goodsid
        })
        if(found<0){
            let newGoods = {}
            //在商品列表中寻找商品
            let goodsIndex = this.data.goods_list.findIndex(function(item){
                return item.goodsID == e.currentTarget.dataset.goodsid
            })
            newGoods.goodsID = this.data.goods_list[goodsIndex].goodsID
            newGoods.goodsName = this.data.goods_list[goodsIndex].goodsName
            newGoods.goodsImg = this.data.goods_list[goodsIndex].goodsImg
            newGoods.goodsPrice = this.data.goods_list[goodsIndex].goodsPrice
            newGoods.goodsNumber = 1
            newcart_list.push(newGoods)
            console.log(newGoods)
        }else{
            newcart_list[found].goodsNumber = newcart_list[found].goodsNumber + 1
        }
        this.setData({
            cart_list: newcart_list,
            goodsTotal: this.goodsTotal()
        })
    },
    reduceGoods: function(e){
        let newcart_list = this.data.cart_list
        //检查购物车中是否存在要减去数量的商品
        let foundIndex = newcart_list.findIndex(function (item) {
            return item.goodsID == e.currentTarget.dataset.goodsid
        })
        if(foundIndex<0) return
        if (newcart_list[foundIndex].goodsNumber <= 0) return
        newcart_list[foundIndex].goodsNumber = newcart_list[foundIndex].goodsNumber-1
        if (newcart_list[foundIndex].goodsNumber <= 0){
            newcart_list.splice(foundIndex,1)
        }
        this.setData({
            cart_list: newcart_list,
            goodsTotal: this.goodsTotal()
        })
    },
    // 商品总价
    goodsTotal: function(){
        let newcart_list = this.data.cart_list
        let goodsTotal = 0
        if(newcart_list.length <= 0) return goodsTotal
        for(let i=0; newcart_list.length > i; i++){
            goodsTotal = newcart_list[i].goodsPrice * newcart_list[i].goodsNumber + goodsTotal
            // console.log(goodsTotal)
        }
        return goodsTotal
    },
    toggleCart: function(e){
        let newCartListState = this.data.cartListState
        this.setData({
            cartListState: !newCartListState
        })
    },
    clearCart: function(){
        let newcart_list = this.data.cart_list
        newcart_list.splice(0, newcart_list.length)
        this.setData({
            cart_list: newcart_list
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowHeight)
                that.setData({
                    contentHight: res.windowHeight*2 - 188- 74
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})