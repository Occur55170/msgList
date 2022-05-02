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
      <div class="newMessage">
        <div class="closeMessage" v-if="switchMSG">
          <a href="" @click.prevent="openLoginIn">請先登入在留言</a>
        </div>
        <input type="text" class="form-control" id="name" name="姓名" v-model.trim="newMessage.author" placeholder="請輸入姓名" required maxlength="20">
        <div>
          <input type="radio" id="boy" name="性別" value="boy" v-model="newMessage.male"><label for="boy">男</label>
          <input type="radio" id="girl" name="性別" value="girl" v-model="newMessage.male"><label for="girl">女</label>
        </div>
        <textarea name="" id="" cols="30" rows="10" v-model.trim="newMessage.content"></textarea>
        <button class="btn btn-danger" type="submit" @click="addMessage" :disabled="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// import axios from 'axios'

export default {
  name: 'articleCon',
  data () {
    return {
      Aid: '',
      article: {},
      messageList: [],
      newMessage: {
        author: '',
        male: '',
        content: '',
        time: '',
        good: ''
      }
    }
  },
  props: ['userID'],
  methods: {
    getArcitleCon () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let formData = JSON.stringify({ 'Aid': vm.Aid })
      let api = `https://script.google.com/macros/s/AKfycbzB5-0GjOcnWU-s0f6eSk1-bIGBn23L8PJL-2dDNDJzoum6YHG2y-J06eq56B7bvvYR/exec`
      vm.$http.post(api, formData).then(response => {
        vm.article = response.data.data
        vm.$store.dispatch('upadateisLoad', false)
      })
    },
    goback () {
      this.$router.push('/')
    },
    getMessage () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let mid = { 'mid': vm.Aid }
      let api = `https://script.google.com/macros/s/AKfycbzGLZ8zt7tHLrNGbklRSa3SdHDKaoww9Rc2JfEMyuxscv-F9ADTdzyLnqnZHilZFIj7/exec`
      $.ajax({
        url: api,
        data: mid,
        dataType: 'JSON',
        success: function (response) {
          vm.messageList = []
          if (response.length !== 0) {
            response.forEach(item => {
              if (item.mainMsg) {
                let neM = {}
                neM.mainMsg = JSON.parse(item.mainMsg)
                if (item.reply.length !== 0) {
                  neM.reply = item.reply.map(ele => JSON.parse(ele))
                }
                vm.messageList.push(neM)
                vm.newMessage.author = ''
                vm.newMessage.male = ''
                vm.newMessage.content = ''
              }
            })
          }
          vm.$store.dispatch('upadateisLoad', false)
        },
        error: function (response) {
          console.log(response)
        }
      })
    },
    addMessage () {
      const vm = this
      vm.$emit('load', true)
      const timestamp = new Date()
      let yyyy = timestamp.getFullYear()
      let mm = timestamp.getMonth() + 1
      let day = timestamp.getDate()
      let hour = timestamp.getHours()
      let min = timestamp.getMinutes()
      let sec = timestamp.getSeconds()
      let time = `${yyyy} / ${mm} / ${day}  ${hour}:${min}:${sec}`
      var data = {
        'mid': vm.Aid,
        'author': vm.newMessage.author,
        'male': vm.newMessage.male,
        'content': vm.newMessage.content,
        'time': time,
        'good': 0
      }
      $.ajax({
        type: 'post',
        url: 'https://script.google.com/macros/s/AKfycbzGLZ8zt7tHLrNGbklRSa3SdHDKaoww9Rc2JfEMyuxscv-F9ADTdzyLnqnZHilZFIj7/exec',
        data: data,
        success: function (response) {
          vm.getMessage()
        },
        error: function (response) {
          console.log(response)
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
        }
      })
    },
    openLoginIn () {
      this.$emit('openLoginIn')
    }
  },
  computed: {
    submit () {
      const vm = this
      if (vm.newMessage.author && vm.newMessage.content && vm.newMessage.male) {
        return false
      }
      return true
    },
    switchMSG () {
      const userID = this.userID
      if (userID !== '') {
        return false
      } else {
        return true
      }
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
    .newMessage{
      width:100%;
      position:relative;
      textarea{
        width:100%;
      }
      button{
        margin:0 0 0 auto;
      }
      .closeMessage{
        background:rgba(0, 0, 0, .5);
        box-sizing:border-box;
        box-shadow:0 0 4px 4px rgba(0, 0, 0, .2);
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0.5;
        a{
          font-size: 30px;
          color:blue;
        }
      }
    }
  }
}
</style>
