<template>
  <div class="container">
    <div class="poster" :style="{'backgroundImage': 'url('+info.topBanner[0]+')'}">
      <div class="iconBox">
        <div class="icon"><img :src="info.logo"></div>
        <div class="title">{{info.title}}</div>
        <div class="des">
          关注
          <text>3</text> 话题 88
        </div>
        <div class="clear"></div>
        <span class="attention">+关注</span>
      </div>
    </div>
    <div class="list">
      <van-panel class="box" title="测试正文1500" use-footer-slot>
        <div class="content">啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊，啊啊啊啊啊...</div>
        <div slot="footer">
          <van-row>
            <van-col span="3">
              <img class="pic" src="http://jgbackend.oss-cn-shanghai.aliyuncs.com/test/community/headimg/deabfb5b71281c4b528db1b5f69b0c02.jpeg">
            </van-col>
            <van-col span="8">
              <div class="nickname">痞子</div>
              <div class="publish-time">07/04 14:30</div>
            </van-col>
            <van-col class="right" span="13">
              <div class="small"><van-icon name="like-o" /><text>123</text></div>
              <div class="small"><van-icon name="chat" /><text>12312</text></div>
            </van-col>

          </van-row>

        </div>
      </van-panel>

    </div>
    <!-- <view class="search">
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
      </view>
    </view>
    <van-tabbar :active="active" >
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" >搜索</van-tabbar-item>
      <van-tabbar-item icon="chat" info="5">消息</van-tabbar-item>
      <van-tabbar-item icon="contact" dot>我</van-tabbar-item>
    </van-tabbar> -->
  </div>

</template>

<script>
import card from '@/components/card'
import {deepClone} from '@/utils/util'
import api from '@/api/index'

export default {
  components: {
    card
  },
  data () {
    return {
      topics: null,
      info: null
    }
  },
  async onPullDownRefresh () {},
  onReachBottom () {},
  methods: {
    getInfo () {
      api.getCommunity().then(r => {
        const allinfo = deepClone(r.data)
        const topics = allinfo.topics
        this.topics = topics
        delete allinfo['topics']
        this.info = allinfo
        console.log(this.topics, this.info)

        // this.list = r.data
      })
    }
  },
  mounted () {

  },
  created () {
    this.getInfo()
  }
}
</script>

<style>
.van-icon {
  vertical-align: middle;
}
</style>


<style lang="scss" scoped>
.poster {
  height: 180px;
  position: relative;

  .iconBox {
    height: 60px;
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;

    .icon {
      position: absolute;
      border-radius: 13px;
      float: left;
      top: -25px;
      left: 15px;
      width: 76px;
      height: 76px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 16px;
      // font-weight: bold;
      color: #fff;
      box-sizing: border-box;
      padding-left: 100px;
      float: none;
      margin-top: 9px;
      line-height: 18px;
    }
    .des {
      color: #cacaca;
      padding-left: 100px;
      font-size: 14px;
    }
    .attention {
      position: absolute;
      right: 10px;
      top: 18px;
      color: #fff;
      font-size: 14px;
      padding: 1px 3px;
      border: 1px solid #fff;
      border-radius: 3px;
    }
  }
}

.list {
  .box {
    margin-bottom: 10px;
    .pic {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .nickname {
      font-size: 12px;
      color: #3399ff;
    }
    .publish-time {
      color: #aeaeae;
      font-size: 10px;
    }
    .right {
      text-align: right;
      .small{
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color:#bbb ;
        margin-left:10px;
        text{
          vertical-align: middle;
          
        }
      }
    }

    .content {
      padding: 10px;
      color: #6b6b6b;
      word-wrap: break-word;
      word-break: break-all;
      line-height: 20px;
      font-size: 14px;
    }
  }
}
</style>
