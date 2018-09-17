<template>
  <div class="container" @click="clickHandle('test click', $event)">

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
    <van-button @click="onClick">按钮</van-button>
    <van-notify id="van-notify" />

    <template v-for="items in list">
      <van-card
        :key="items.id"
        :title="items.title"
        :desc="items.intro"
        :thumb="items.logo"
      />
    
    </template>
  </div>
  
</template>

<script>
import card from '@/components/card'
import Notify from '@/../static/vant/notify/notify'
import api from '@/api/index'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      list: []
    }
  },

  components: {
    card
  },
  // created (){
  //   this.getalist()
  // },
  methods: {
    getList () {
      console.log(11111)

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
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getList()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
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
