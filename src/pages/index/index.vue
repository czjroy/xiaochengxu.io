<template>
  <div class="container" >
    <view class="search">
      <view class="search-result">
        <template v-for="items in list">
          <div class="index-card" @click="clickHandle(items.id)" :key="items.id">
            <div class="imgbox"><img :src="items.logo" /></div>
            <div class="middle" style="padding: 0px 8px;">
                <div>
                    <h4>{{items.title}}</h4>
                </div>
                <div class="desc" >{{items.intro}}</div>
            </div>
            <div class="to-right" >
                <van-icon name="arrow" />
            </div>
          </div>
        </template>
        <view class="loading" :hidden="!searchLoading" ><van-loading  size="15px"/> <span>正在载入更多...</span></view>
        <view class="loading complete" :hidden="!searchLoadingComplete">已加载全部</view>
          <!-- <div v-html="html"></div> -->
      </view>
    </view>
    <van-tabbar :active="active" >
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" >搜索</van-tabbar-item>
      <van-tabbar-item icon="chat" info="5">消息</van-tabbar-item>
      <van-tabbar-item icon="contact" dot>我</van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<script>
import card from '@/components/card'
import Notify from '@/../static/vant/notify/notify'
import api from '@/api/index'

export default {
  components: {
    card
  },
  data () {
    return {
      active: 0,
      html: `<div>123123 <br /> <img src="http://jgbackend.oss-cn-shanghai.aliyuncs.com/bi/images/2018091114392369856.png" alt="12"></div>`,
      list: [],
      isloading: true, // 用于判断searchSongList数组是不是空数组，默认true，空的数组
      searchLoading: true, // "上拉加载"的变量，默认false，隐藏
      searchLoadingComplete: false // “没有数据”的变量，默认false，隐藏
    }
  },

  async onPullDownRefresh () {
    api.getalist().then(r => {
      console.log(r)
      this.list = r.data
      this.searchLoadingComplete = false
      this.searchScrollLower()
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom () {
    this.searchScrollLower()
  },
  methods: {
    searchScrollLower (e) {
      this.searchLoading = true
      if (this.searchLoadingComplete) {
        this.searchLoading = false
        return
      }
      if (this.isloading) {
        this.searchLoading = true
        this.isloading = false
        setTimeout(() => {
          api.getalist().then(r => {
            if (r.more) {
              this.list = this.list.concat(r.data)
            } else {
              this.searchLoadingComplete = true
            }
            this.searchLoading = false
            this.isloading = true
          })
        }, 1000)
      }
    },
    getList () {
      api.getalist().then(r => {
        console.log(r)
        this.list = r.data
      })
    },
    onClick () {
      Notify('通知消息！')
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg)
      this.$router.push({ path: '/pages/community/main', query: { id: msg } })
    }
  },
  async mounted () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getList()
    this.searchScrollLower()
    console.log(this.$route)
  },

  created () {

  }
}
</script>


<style lang="scss" scoped>
.container{
  padding-bottom:50px;
}
.loading{
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
  color: #999;
  
  span{
    vertical-align: middle;
    padding-left: 8px;
  }
}

.index-card {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-bottom: 1rpx solid #ebebeb;
  font-size: 0;

  .imgbox{
    flex: 0 1 auto;
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

  }

  .middle{
    flex: 1 1 0%;

    h4{
      font-size: 16px;
      color: #666;
    }

    .desc{
      color: #999;
      font-size: 12px;
    }

  }
  .to-right{
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #777;
  }
}

</style>
