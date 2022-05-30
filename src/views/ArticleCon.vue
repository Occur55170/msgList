<template>
  <div class="articleCon">
    <div class="articlePage">
      <div class="head mb-4">
        <div class="d-flex justify-content-between">
          <a href="#" @click.prevent="goback">回上頁</a>
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
      <div>
        <p>
          <a href="#" @click.prevent="articleLike" class="good">
            <span class="addGd" v-if="article.likeList.indexOf(`${ userID }`) !== -1 && userID !== ''">
              <i is="font-awesome-icon" icon="fa-solid fa-thumbs-up" />{{ article.likeList.length }}
            </span>
            <span class="rmGd" v-else>
              <i is="font-awesome-icon" icon="fa-regular fa-thumbs-up" />{{ article.likeList.length }}
            </span>
          </a>
        </p>
        <p>
          <a href="#" @click.prevent="articleCollect" class="collect">
            <span v-if="article.collect.indexOf(JSON.stringify(userID)) !== -1 && userID !== ''">
              <i is="font-awesome-icon" icon="fa-solid fa-star" />取消收藏
            </span>
            <span v-else>
              <i is="font-awesome-icon" icon="fa-solid fa-star" />收藏
            </span>
          </a>
        </p>
      </div>
    </div>
    <div class="message">
      <p>共 {{ messageList.length }} 則留言</p>
      <ul>
        <li v-for="(item,key) in messageList" :key="key">
          <div class="mainReply">
            <div class="avatar">
              <div :class="item.mainMsg.male">
                <i is='font-awesome-icon' icon="fa-solid fa-user"></i>
              </div>
            </div>
            <div>
              <p class="name">{{ item.mainMsg.author }}</p>
              <p class="content">{{ item.mainMsg.content }}</p>
              <p class="time"><span>B{{ key+1 }}</span>{{ item.mainMsg.time }}</p>
              <div class="MSGfeatures">
                <a href="#" class="mx-2" @click.prevent="openReply(key)">回覆</a>
                <a href="#" class="mx-2" @click.prevent="addMSGlike(item.mainMsg.msgID, userID)">
                  <i class="fa-solid fa-thumbs-up" v-if="item.mainMsg.good.indexOf(`${userID}`) !== -1"></i>
                  <i class="fa-regular fa-thumbs-up" v-else></i>
                </a>
                {{ item.mainMsg.good.length }}
              </div>
            </div>
            <a href="#" class="del" @click.prevent="delMessage(item.mainMsg.msgID)" v-if="item.mainMsg.userID == userID"><font-awesome-icon icon="fa-solid fa-trash-can" class="" /></a>
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
                <i is='font-awesome-icon' icon="fa-solid fa-user"></i>
              </div>
            </div>
            <div>
              <p class="name">{{ reply.author }}</p>
              <p class="content">{{ reply.content }}</p>
              <p class="time"><span>B{{ key+1 }}<em>-{{ index+1 }}</em></span>{{ reply.time }}</p>
              <div class="MSGfeatures">
                <a href="#" class="mx-2" @click.prevent="addMSGlike(reply.msgID, userID)">
                  <i class="fa-solid fa-thumbs-up" v-if="reply.good.indexOf(`${userID}`) !== -1"></i>
                  <i class="fa-regular fa-thumbs-up" v-else></i>
                </a>
                {{ reply.good.length }}
              </div>
            </div>
            <a href="#" class="del" @click.prevent="delMessage(reply.msgID)" v-if="reply.userID == userID"><font-awesome-icon icon="fa-solid fa-trash-can" /></a>
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

export default {
  name: 'articleCon',
  metaInfo () {
    return {
      title: this.article.title
    }
  },
  data () {
    return {
      Aid: '',
      article: {
        collect: [],
        likeList: []
      },
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
            vm.article.collect = JSON.parse(vm.article.collect)
            vm.article.likeList = JSON.parse(vm.article.likeList)
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            let message = response.message
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          let message = '系統出錯，請稍後在試一次或者聯絡客服人員'
          let success = 'danger'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
        }
      })
    },
    articleCollect () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      if (this.userID === '') {
        alert('請先登入會員')
        this.$emit('openLoginIn')
      } else {
        let data = {
          'Aid': vm.Aid,
          'title': vm.article.title,
          'userID': vm.userID
        }
        $.ajax({
          type: 'get',
          url: `${process.env.VUE_APP_USER}`,
          data: data,
          success: function (response) {
            response = JSON.parse(response)
            if (response.success) {
              if (response.mode === 'receive') {
                let message = '收藏成功'
                let success = 'success'
                vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
              } else if (response.mode === 'put') {
                let message = '取消收藏成功'
                let success = 'success'
                vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
              }
              vm.getArticleCon()
            } else {
              let message = response.message
              let success = 'danger'
              vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
              vm.$store.dispatch('upadateisLoad', false)
            }
          },
          error: function (response) {
            vm.$store.dispatch('upadateisLoad', false)
          }
        })
      }
    },
    articleLike () {
      const vm = this
      this.$store.dispatch('upadateisLoad', true)
      if (this.userID === '') {
        alert('請先登入會員')
        this.$emit('openLoginIn')
      } else {
        let data = JSON.stringify({
          'Aid': vm.Aid,
          'title': vm.article.title,
          'userID': JSON.stringify(vm.userID)
        })
        let api = `${process.env.VUE_APP_ARTICLE}`
        vm.$http.post(api, data).then(response => {
          if (response.data.success && response.data.mode === 'press') {
            let message = '按讚'
            let success = 'success'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          } else if (response.data.success && response.data.mode === 'takeback') {
            let message = '收回讚'
            let success = 'success'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          } else {
            let message = response.message
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          }
          vm.getArticleCon()
        })
      }
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
          let message = '留言載入錯誤，請稍後在試一次或者聯絡客服人員'
          let success = 'danger'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
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
          let message = response.message
          if (response.success) {
            let success = 'success'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            vm.getMessage()
          } else {
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
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
      $.ajax({
        type: 'post',
        url: `${process.env.VUE_APP_MESSAGE}`,
        data: data,
        success: function (response) {
          response = JSON.parse(response)[0]
          let message = response.message
          if (response.success) {
            let success = 'success'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            vm.getMessage()
          } else {
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
        }
      })
    },
    openReply (key) {
      if (this.userID !== '') {
        $(`.reply-${key}`).toggle()
      } else {
        alert('請先登入會員')
        this.$emit('openLoginIn')
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
          let message = response.message
          if (response.success) {
            let success = 'success'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          } else {
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          }
        },
        error: function (response) {
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
              let message = response.message
              let success = 'success'
              vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            } else {
              let message = response.message
              let success = 'success'
              vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
            }
            vm.$store.dispatch('upadateisLoad', false)
          },
          error: function (response) {
            let message = '系統出錯，請稍後在試一次或者聯絡客服人員'
            let success = 'danger'
            vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          }
        }).then(() => {
          vm.getMessage()
        })
      } else {
        alert('請先登入會員')
        this.$emit('openLoginIn')
      }
    },
    logStatus () {
      if (this.userID === '') {
        alert('請先登入會員')
        this.$emit('openLoginIn')
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
}
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
  padding:0 30px 40px 30px;
  box-sizing:border-box;
  div{
    padding:15px 10px;
    display:flex;
    justify-content:space-around;
    border-top:1px solid #ced0d4;
    border-bottom:1px solid #ced0d4;
  }
  p{
    margin-bottom:0;
  }
  span{
    font-size: 20px;
  }
  a{
    box-sizing:border-box;
    font-size:20px;
    margin:0 10px;
    text-decoration:none;
    color:#606770;
    svg{
      margin-right:10px;
    }
    .addGd{
      color:#CE0000;
    }
    .rmGd{
      color:#606770;
    }
    .adCt{
      color:#CE0000;
    }
    .rmCt{
      color:#EAC100;
    }
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
      svg{
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
@media(max-width:768px){
  .articleCon .message .newMessage{
    input{
      width:85%;
    }
    button{
      width:13%;
    }
  }
}
@media(max-width:600px){
  .articlePage{
    padding: 30px 15px;
    .head{
      h2{
        font-weight:bold;
        line-height:1.3;
      }
      &>h6{
        margin-top:20px;
      }
    }
  }
  .articlefeatures{
    padding: 0 15px 20px 15px;
    div{
      padding:10px;
    }
  }
  .message{
    padding:20px;
    ul{
      .avatar{
        margin-right:5px;
        div{
          width:30px;
          height:30px;
        }
        svg{
          font-size: 20px;
        }
      }
      .reply{
        margin-left: 40px;
        margin-top: 0px !important;
      }
    }
    .newMessage{
      text-align:center;
      input{
        width:100%;
        margin-bottom:10px;
        font-size:20px;
      }
      button{
        width:auto;
        margin: 0 auto;
      }
    }
  }
}
</style>
