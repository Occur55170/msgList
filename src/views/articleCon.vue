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
    <div class="articlefeatures">
      <a href="">按讚</a>
      <a href="">收藏</a>
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
              <div class="MSGfeatures">
                <a href="" class="mx-2" @click.prevent="openReply(key)">回覆</a>
                <a href="" class="mx-2" @click.prevent="addMSGlike(item.mainMsg.msgID, userID)">
                  <i class="fa-solid fa-thumbs-up" v-if="item.mainMsg.good.indexOf(`${userID}`) !== -1"></i>
                  <i class="fa-regular fa-thumbs-up" v-else></i>
                </a>
                {{ item.mainMsg.good.length }}
              </div>
            </div>
            <a href="" class="del" @click.prevent="delMessage(item.mainMsg.msgID)" v-if="item.mainMsg.userID == userID">刪除</a>
          </div>
          <div class="NewReply" :class="`reply-${key}`">
            <div>
              <input type="text" placeholder="請輸入回覆留言內容" v-model.trim="NewReplyCon">
              <button class="mx-2" @click.prevent="addReply(item.mainMsg.msgID)" :disabled="NewReplyCon == ''">回覆</button>
            </div>
          </div>
          <div class="reply mt-4" v-for="(reply,index) in item.reply" :key="index">
            <div class="avatar">
              <div :class="reply.male">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <div>
              <p class="name">{{ reply.author }}</p>
              <p class="content">{{ reply.content }}</p>
              <p class="time"><span>B{{ key+1 }}<em>-{{ index+1 }}</em></span>{{ reply.time }}</p>
              <div class="MSGfeatures">
                <a href="" class="mx-2" @click.prevent="addMSGlike(reply.msgID, userID)">
                  <i class="fa-solid fa-thumbs-up" v-if="reply.good.indexOf(`${userID}`) !== -1"></i>
                  <i class="fa-regular fa-thumbs-up" v-else></i>
                </a>
                {{ reply.good.length }}
              </div>
            </div>
            <a href="" class="del" @click.prevent="delMessage(reply.msgID)" v-if="reply.userID == userID">刪除</a>
          </div>
        </li>
      </ul>
      <div class="newMessage">
        <input type="text" v-model.trim="newMessage.content" placeholder="新增留言" @click="logStatus()">
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
        content: '',
        time: '',
        good: ''
      },
      NewReplyCon: ''
    }
  },
  props: ['userID', 'user'],
  methods: {
    getArticleCon () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let formData = { 'Aid': vm.Aid }
      $.ajax({
        type: 'get',
        url: `${process.env.VUE_APP_ARTICLE}`,
        data: formData,
        success: function (response) {
          response = JSON.parse(response)
          if (response.success) {
            vm.article = response.data
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            console.log(response.message)
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          console.log(response)
        }
      })
    },
    articleCollect () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let data = {
        'Aid': vm.Aid,
        'mode': 'collectArticle'
      }
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_ARTICLE}`,
        data: data,
        success: function (response) {
          console.log(response)
          // response = JSON.parse(response)
          // console.log('getArticleCon', response)
          // if (response.success) {
          //   vm.article = response.data
          //   vm.$store.dispatch('upadateisLoad', false)
          // } else {
          //   console.log(response.message)
          //   vm.$store.dispatch('upadateisLoad', false)
          // }
        },
        error: function (response) {
          console.log(response)
        }
      })
    },
    articleGood () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let data = { 'Aid': vm.Aid }
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_ARTICLE}`,
        data: data,
        success: function (response) {
          response = JSON.parse(response)
          if (response.success) {
            vm.article = response.data
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          console.log(response)
        }
      })
    },
    goback () {
      this.$router.push('/')
    },
    getMessage () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let mid = { 'mid': vm.Aid }
      $.ajax({
        type: 'get',
        url: `${process.env.VUE_APP_MESSAGE}`,
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
      vm.$store.dispatch('upadateisLoad', true)
      const timestamp = new Date()
      let yyyy = timestamp.getFullYear()
      let mm = timestamp.getMonth() + 1
      let day = timestamp.getDate()
      let hour = timestamp.getHours()
      let min = timestamp.getMinutes()
      let sec = timestamp.getSeconds()
      let time = `${yyyy} / ${mm} / ${day}  ${hour}:${min}:${sec}`
      let msgID = `${vm.Aid}-${new Date().getTime()}`
      var data = {
        'mode': 'addMessage',
        'mid': vm.Aid,
        'author': vm.user.name,
        'userID': vm.userID,
        'male': vm.user.male,
        'content': vm.newMessage.content,
        'time': time,
        'msgID': msgID
      }
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_MESSAGE}`,
        data: data,
        success: function (response) {
          response = JSON.parse(response)[0]
          if (response.success) {
            vm.$bus.$emit('message:push', response.message, 'success')
            vm.getMessage()
          } else {
            console.log(response)
            vm.$bus.$emit('message:push', response.message, 'danger')
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          console.log(response)
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
          vm.$store.dispatch('upadateisLoad', false)
        }
      })
    },
    delMessage (msgID) {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      let data = {
        'mode': 'delMessage',
        'mid': vm.Aid,
        'msgID': msgID
      }
      console.log(data)
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_MESSAGE}`,
        data: data,
        success: function (response) {
          response = JSON.parse(response)[0]
          console.log('del', response)
          if (response.success) {
            vm.$bus.$emit('message:push', response.message, 'success')
            vm.getMessage()
          } else {
            console.log(response)
            vm.$bus.$emit('message:push', response.message, 'danger')
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          console.log(response)
        }
      })
    },
    openReply (key) {
      if (this.userID !== '') {
        $(`.reply-${key}`).toggle()
      } else {
        alert('請先登入會員')
        this.openLoginIn()
      }
    },
    addReply (mainMsgID) {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      const timestamp = new Date()
      let yyyy = timestamp.getFullYear()
      let mm = timestamp.getMonth() + 1
      let day = timestamp.getDate()
      let hour = timestamp.getHours()
      let min = timestamp.getMinutes()
      let sec = timestamp.getSeconds()
      let time = `${yyyy} / ${mm} / ${day}  ${hour}:${min}:${sec}`
      let msgID = `${vm.Aid}-${new Date().getTime()}`
      var data = {
        'mode': 'addReply',
        'mid': vm.Aid,
        'author': vm.user.name,
        'userID': vm.userID,
        'male': vm.user.male,
        'content': vm.NewReplyCon,
        'time': time,
        'good': 0,
        'mainMsgID': mainMsgID,
        'msgID': msgID
      }
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_MESSAGE}`,
        data: data,
        success: function (response) {
          response = JSON.parse(response)[0]
          if (response.success) {
            console.log(response)
            vm.$bus.$emit('message:push', response.message, 'success')
          } else {
            console.log(response)
            vm.$bus.$emit('message:push', response.message, 'danger')
          }
        },
        error: function (response) {
          console.log(response)
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
          vm.$store.dispatch('upadateisLoad', false)
        }
      }).then(() => {
        vm.getMessage()
        vm.NewReplyCon = ''
        $('.NewReply').hide()
      })
    },
    addMSGlike (msgID, userID) {
      const vm = this
      if (userID !== '') {
        this.$store.dispatch('upadateisLoad', true)
        let data = {
          'mode': 'addMSGlike',
          'mid': vm.Aid,
          'msgID': msgID,
          'userID': userID
        }
        $.ajax({
          type: 'post',
          url: `${process.env.VUE_APP_MESSAGE}`,
          data: data,
          dataType: 'JSON',
          success: function (response) {
            response = response[0]
            if (response.success) {
              console.log(response.message)
            } else {
              console.log(response.message)
            }
            vm.$store.dispatch('upadateisLoad', false)
          },
          error: function (response) {
            console.log(response)
          }
        }).then(() => {
          vm.getMessage()
        })
      } else {
        alert('請先登入會員')
        this.openLoginIn()
      }
    },
    openLoginIn () {
      this.$emit('openLoginIn')
    },
    logStatus () {
      if (this.userID === '') {
        alert('請先登入會員')
        this.openLoginIn()
      }
    }
  },
  computed: {
    submit () {
      const vm = this
      if (vm.newMessage.content) {
        return false
      }
      return true
    }
  },
  created () {
    this.Aid = this.$route.params.id
    this.getArticleCon()
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
  .articlefeatures{
    background:#fff;
    display:flex;
    padding:0 50px 50px 50px;
    box-sizing:border-box;
    a{
      width:100%;
      background:rgba(158, 158, 158, .5);
      box-sizing:border-box;
      padding:10px;
      margin:0 20px;
      text-decoration:none;
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
        flex-wrap:wrap;
        position:relative;
      }
      .reply{
        padding:20px 0;
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
        margin-bottom:5px;
        margin-top:10px;
        span{
          &::after{
            content: "・";
          }
        }
      }
      .del{
        position:absolute;
        top:40%;
        right:0;
      }
      .MSGfeatures{
        width:100%;
        i{
          color:#006aa6;
        }
      }
    }
    .NewReply{
      display:none;
      &>div{
        display:flex;
        justify-content:space-between;
      }
      input{
        width:100%;
        flex-grow:2;
        flex-shrink:2;
      }
      button{
        flex-shrink:0;
        width:auto;
        border:0;
        box-sizing:border-box;
        padding:5px 12px;
        background:#006aa6;
        color:#fff;
        border-radius:5px;
        &:disabled{
          background:#054a72;
          color:#999;
        }
      }
    }
    .newMessage{
      width:100%;
      position:relative;
      input{
        width:90%;
        margin-right:2%;
      }
      button{
        width:8%;
        margin:0 0 0 auto;
      }
    }
  }
}
</style>
