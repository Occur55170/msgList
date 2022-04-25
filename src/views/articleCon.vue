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
        <input type="text" class="form-control" id="name" name="姓名" v-model.trim="newMessage.author" placeholder="請輸入姓名" required maxlength="20">
        <div>
          <input type="radio" id="boy" name="性別" value="boy" v-model="newMessage.male"><label for="boy">男</label>
          <input type="radio" id="girl" name="性別" value="girl" v-model="newMessage.male"><label for="girl">女</label>
        </div>
        <textarea name="" id="" cols="30" rows="10" v-model.trim="newMessage.content"></textarea>
        <!-- <button class="btn btn-danger" type="submit" @click="addMessage" :disabled="submit">送出</button> -->
        <!-- <button class="btn btn-danger" style="margin-right: 10px;" type="submit" @click="getMessage">get</button> -->
        <button class="btn btn-danger" type="submit" @click="addMessage">add</button>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
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
  methods: {
    getArcitleCon () {
      const vm = this
      vm.$emit('load', true)
      let formData = JSON.stringify({ 'Aid': vm.Aid })
      let api = `https://script.google.com/macros/s/AKfycbzB5-0GjOcnWU-s0f6eSk1-bIGBn23L8PJL-2dDNDJzoum6YHG2y-J06eq56B7bvvYR/exec`
      vm.$http.post(api, formData).then(response => {
        // console.log(response.data.data)
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
      // msgapi
      let api = `https://script.google.com/macros/s/AKfycbwrLoDh54vq48S5kbwCXSsx3Qq0ev4yH1Q3LH65yCsRoqSRojqqlqxHgGNTN-vOR5tb/exec`
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
    // addMessage () {
    //   // msgapi
    //   const vm = this
    //   const timestamp = new Date()
    //   let yyyy = timestamp.getFullYear()
    //   let mm = timestamp.getMonth() + 1
    //   let day = timestamp.getDate()
    //   let hour = timestamp.getHours()
    //   let min = timestamp.getMinutes()
    //   let sec = timestamp.getSeconds()
    //   let time = {
    //     time: `${yyyy} / ${mm} / ${day}  ${hour}:${min}:${sec}`
    //   }
    //   var data = Object.assign({}, vm.newMessage, time)
    //   console.log(data)
    //   // data = JSON.stringify(data)
    //   // console.log(data)
    //   // 可用ajax
    //   $.ajax({
    //     // 這邊用get type
    //     type: 'get',
    //     // api url - google appscript 產出的 url
    //     url: 'https://script.google.com/macros/s/AKfycbwrLoDh54vq48S5kbwCXSsx3Qq0ev4yH1Q3LH65yCsRoqSRojqqlqxHgGNTN-vOR5tb/exec',
    //     // 剛剛整理好的資料帶入
    //     data: data,
    //     // 資料格式是JSON
    //     dataType: 'JSON',
    //     // 成功送出 會回頭觸發下面這塊感謝
    //     success: function (response) {
    //       console.log(response)
    //       alert('恭喜成功送出，已具備抽獎資格')
    //     },
    //     error: function (response) {
    //       console.log(response)
    //       alert('系統出錯，請稍後在試一次或者聯絡客服人員')
    //     }
    //   })
    // }
  },
  computed: {
    submit () {
      const vm = this
      if (vm.newMessage.author && vm.newMessage.content && vm.newMessage.male) {
        return false
      }
      return true
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
