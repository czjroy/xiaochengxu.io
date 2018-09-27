<template>
    <div class="index-card">
        <div class="imgbox"><img :src="imgSrc" /></div>
        <div class="middle" style="padding: 0px 8px;">
            <div class="react-flex-item react-flex-v2--flex-1">
                <h4>{{title}}</h4>
            </div>
            <div class="desc" >《魔天记3D》是一款由作者"忘语"正版授权改编的同名3DMMO手游。</div>
        </div>
        <div class="to-right" >
            
        </div>
    </div>
    

</template>

<script>
export default {
  props: ['imgSrc', 'title', 'desc']
}
</script>

<style lang="scss" scoped>
.index-card {
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-bottom: 1rpx solid #f6f6f6;
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
  }
}
</style>
