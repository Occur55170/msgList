<template>
  <div class="userInfo">
    <h1>userInfo</h1>
    <p>使用者姓名 {{ user.name }}</p>
    <p>使用者帳號 {{ user.account }}</p>
    <p>使用者密碼 {{ user.password }}</p>
    <p>使用者信箱 {{ user.email }}</p>
    <p>註冊日期 {{ user.signDate }}</p>
    <p>收藏文章 {{ user.collect }}</p>
    <p>說讚的文章 {{ user.likeList }}</p>
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
    getUser (userID) {
      const vm = this
      vm.$emit('load', true)
      const api = `${process.env.VUE_APP_MEMBER}`
      let data = { 'userID': userID }
      console.log(userID)
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
          vm.$emit('load', false)
        },
        error: function (response) {
          console.log(response)
          vm.$emit('load', false)
          alert('系統出錯，請稍後在試一次或者聯絡客服人員')
        }
      })
    }
  },
  created () {
    this.getUser(this.$route.params.id)
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
