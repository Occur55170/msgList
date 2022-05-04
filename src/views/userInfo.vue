<template>
  <div class="userInfo">
    <h1>userInfo</h1>
    <p>使用者姓名:{{ user.name }}</p>
    <p>使用者帳號:{{ user.account }}</p>
    <p>使用者密碼:{{ user.password }}</p>
    <p>使用者信箱:{{ user.email }}</p>
    <p>註冊日期:{{ user.signDate }}</p>
    <p>收藏文章:{{ user.collect }}</p>
    <p>說讚的文章:{{ user.likeList }}</p>
    <div class="textContent">
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'userInfo',
  data () {
    return {
      userID: '',
      user: {
        'name': '',
        'account': '',
        'password': '',
        'email': '',
        'signDate': '',
        'collect': '',
        'likeList': '',
        'time': '',
        'userID': ''
      }
    }
  },
  methods: {
    loadStatus (userID) {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      const api = `${process.env.VUE_APP_MEMBER}`
      let data = { 'userID': userID }
      if (userID !== '') {
        $.ajax({
          type: 'get',
          url: api,
          data: data,
          success: response => {
            response = JSON.parse(response)
            if (response.success) {
              this.getUser(this.$route.params.id)
            } else {
              console.log(response)
              vm.$router.push('/')
              vm.$store.dispatch('upadateisLoad', false)
            }
          },
          error: response => {
            console.log(response)
          }
        })
      } else {
        console.log('尚未登入')
      }
    },
    getUser (userID) {
      const vm = this
      const api = `${process.env.VUE_APP_MEMBER}`
      let data = { 'userID': userID }
      $.ajax({
        type: 'get',
        url: api,
        data: data,
        success: function (response) {
          response = JSON.parse(response)
          vm.user = {
            'account': response.userData.account,
            'collect': response.userData.collect,
            'email': response.userData.email,
            'likeList': response.userData.likeList,
            'name': response.userData.name,
            'password': response.userData.password,
            'signDate': response.userData.signDate,
            'time': response.userData.time,
            'userID': response.userData.userID
          }
          vm.$store.dispatch('upadateisLoad', false)
        },
        error: function (response) {
          vm.$store.dispatch('upadateisLoad', false)
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
        }
      })
    }
  },
  created () {
    this.loadStatus(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.userInfo{
  background:#fff;
  border-radius:10px;
  box-sizing:border-box;
  padding:20px;
  h1{
    text-align:center;
  }
  .textContent{
    text-align:left;
  }
}
</style>
