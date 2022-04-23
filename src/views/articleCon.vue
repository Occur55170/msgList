<template>
  <div class="articleCon">
    <div class="articlePage">
      <div class="head mb-4">
        <div class="d-flex justify-content-between">
          <a href="" @click.prevent="goback">回上頁</a>
          <h6>{{ article.author }}</h6>
        </div>
        <h2 class="font-weight-bold mt-4 mb-2">{{ article.title }}</h2>
        <h6>{{ article.category }}</h6>
      </div>
      <div class="content">
        <p>{{ article.content }}</p>
      </div>
    </div>
    <div class="message">
      <p>共 {{ messageList.length }} 則留言</p>
      <ul>
        <li v-for="(item,key) in messageList" :key="key">
          <div class="mainReply">
            <div class="avatar">
              <div :class="item.mainMsg.male">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div>
              <p class="name">{{ item.mainMsg.author }}</p>
              <p class="content">{{ item.mainMsg.content }}</p>
              <p class="time"><span>B{{ key+1 }}</span>{{ item.mainMsg.time }}</p>
            </div>
          </div>
          <div class="reply" v-for="(reply,index) in item.reply" :key="index">
            <div class="avatar">
              <div :class="reply.male">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div>
              <p class="name">{{ reply.author }}</p>
              <p class="content">{{ reply.content }}</p>
              <p class="time"><span>B{{ key+1 }}<em>-1</em></span>{{ reply.time }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="mewMessage">
        <input type="text" class="mb-3" placeholder="請輸入姓名">
        <input type="radio" name=""><label for="">男</label>
        <input type="radio" name=""><label for="">女</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>送出</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleCon',
  data () {
    return {
      Aid: '',
      article: {},
      messageList: [],
      mewMessage: {
        user: {
          name: '',
          male: ''
        }
      }
    }
  },
  methods: {
    getArcitleCon () {
      const vm = this
      vm.$emit('load', true)
      let formData = JSON.stringify({ 'Aid': vm.Aid })
      let api = `https://script.google.com/macros/s/AKfycbzB5-0GjOcnWU-s0f6eSk1-bIGBn23L8PJL-2dDNDJzoum6YHG2y-J06eq56B7bvvYR/exec`
      vm.$http.post(api, formData).then(response => {
        console.log(response.data.data)
        vm.article = response.data.data
        vm.$emit('load', false)
      })
    },
    goback () {
      this.$router.push('/')
    },
    getMessage () {
      const vm = this
      vm.$emit('load', true)
      let mid = JSON.stringify({ 'mid': vm.Aid })
      let api = `https://script.google.com/macros/s/AKfycbxiYvMt7eBXlLVGVnRmILwvQSPGCo7tIls4gG7lljfd7KZiLEJ8UjVRffaoKtlRTJZW/exec`
      vm.$http.post(api, mid).then(response => {
        console.log(response.data.data)
        vm.messageList = response.data.data.map(item => {
          item.mainMsg = JSON.parse(item.mainMsg)
          if (item.reply.length !== 0) {
            item.reply = item.reply.map(element => {
              element = JSON.parse(element)
              return element
            })
          }
          return item
        })
        vm.$emit('load', false)
      })
    }
  },
  created () {
    this.Aid = this.$route.params.id
    this.getArcitleCon()
    this.getMessage()
  }
}
</script>

<style lang="scss" scoped>
.articleCon{
  max-width:900px;
  margin:0 auto;
  .articlePage{
    background:#fff;
    box-sizing:border-box;
    padding:30px 50px;
    background:#fff;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    .head{
    }
    .content{
      line-height:2;
    }
  }
  .message{
    box-sizing:border-box;
    padding:50px 50px 30px 50px;
    background:#f5f5f5;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    &>p{
      margin-bottom:20px;
    }
    ul{
      padding-left:0;
      list-style-type:none;
      &>li{
        padding:30px 0 0 0;
        border-top:1px solid #e9e9e9;
        &:last-Child{
          border-bottom:1px solid #e9e9e9;
          margin-bottom:0;
        }
        margin-bottom:10px;
      }
      .avatar{
      margin-right:15px;
        div{
          width:50px;
          height:50px;
          border-radius:99em;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        i{
          color:#fff;
          font-size:30px;
        }
        .boy{
          background:#81d4fa;
        }
        .girl{
          background:#f48fb1;
        }
      }
      .mainReply{
        margin-bottom:20px;
      }
      .mainReply,.reply{
        display:flex;
      }
      .reply{
        padding:10px 0;
        margin-left:60px;
        em{
          font-style:normal;
        }
        &:last-Child{
          margin-bottom:0;
        }
      }
      .name{
        font-size:16px;
        font-weight:bold;
        line-height:1;
        margin-bottom:5px;
      }
      .content{
        font-size:18px;
        margin-bottom:0px;
        color:#525252;
      }
      .time{
        font-size:14px;
        margin-top:10px;
        span{
          &::after{
            content: "・";
          }
        }
      }
    }
    .mewMessage{
      width:100%;
      textarea{
        width:100%;
      }
      button{
        margin:0 0 0 auto;
      }
    }
  }
}
</style>
