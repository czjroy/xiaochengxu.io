<template>
  <div class="container" >

    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->

     <!-- 组件在main.json中引入 -->
    <!-- <van-button @click="onClick">按钮</van-button>
    <van-notify id="van-notify" /> -->

    <view class="search">
      <view class="search-result">
       
          <template v-for="items in list">
            
            <van-card
              :key="items.id"
              :title="items.title"
              :desc="items.intro"
              :thumb="items.logo"
              @click="clickHandle(items.id, $event)"
              desc-class="desc"
            />
          </template>
          <view class="loading" :hidden="!searchLoading">正在载入更多...</view>
          <view class="loading complete" :hidden="!searchLoadingComplete">已加载全部</view>
        
      </view>
    </view>
  </div>
  
</template>

<script>
import card from '@/components/card'
import Notify from '@/../static/vant/notify/notify'
import api from '@/api/index'

export default {
  data () {
    return {

      list: [],
      isloading: true, // 用于判断searchSongList数组是不是空数组，默认true，空的数组
      searchLoading: true, // "上拉加载"的变量，默认false，隐藏
      searchLoadingComplete: false // “没有数据”的变量，默认false，隐藏

    }
  },
  onReachBottom () {
    console.log('23423234234234234234234234')
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

  components: {
    card
  },
  // created (){
  //   this.getalist()
  // },
  methods: {
    // searchScrollLower (e) {
    //   this.searchLoading = true
    //   if (this.searchLoadingComplete) {
    //     this.searchLoading = false
    //     return
    //   }
    //   if (this.isloading) {
    //     this.searchLoading = true
    //     this.isloading = false
    //     setTimeout(() => {
    //       api.getalist().then(r => {
    //         if (r.more) {
    //           this.list = this.list.concat(r.data)
    //         } else {
    //           this.searchLoadingComplete = true
    //         }
    //         this.searchLoading = false
    //         this.isloading = true
    //       })
    //     }, 1000)
    //   }
    // },
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
      console.log('clickHandle:', msg, ev)
      this.$router.push({ path: '/pages/counter/main', query: { id: msg } })
    }
  },
  onShow () {
    console.log(123123213)
  },

  async mounted () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    // this.getList()
    console.log(this.$route)
  },

  created () {
    this.getList()
  }
}
</script>

<style>
/* page{
  height: 100%;
  display: flex;
  flex-direction: column;
} */
</style>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  height: 100%;

}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

/* .search{
  flex: auto;
  display: flex;
  flex-direction: column;
  background: #fff;

}


.search-result{
  
  flex: auto;
  position: relative;
}
.search-result scroll-view{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
} */
.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}



.loading{
  padding: 10rpx;
  text-align: center;
}
.loading:before{
  display: inline-block;
  margin-right: 5rpx;
  vertical-align: middle;
  content: '';
  width: 40rpx;
  height: 40rpx;
  /* background: url(../../images/icon-loading.png) no-repeat; */
  background-size: contain;
  animation: rotate 1s linear infinite;
}
.loading.complete:before{
  display: none;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
