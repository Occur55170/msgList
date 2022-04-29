<template>
  <div class="userInfo">
    <h1>userInfo</h1>
    <p>姓名姓名姓名姓名姓名</p>
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
      // name: 'userInfo',
      userID: '',
      user: {
        'type': '',
        'account': '',
        'password': '',
        'name': '',
        'email': ''
      }
    }
  },
  methods: {
    getUser (userID) {
      // const vm = this
      const api = `https://script.google.com/macros/s/AKfycbxAXjuXMw2yOWOdZGKx7t6zP2OAIIFmSDBQu0GM8hCHPYRy-y1QLGts_4doAcODixkt/exec`
      let data = { 'userID': userID }
      console.log(userID)
      $.ajax({
        type: 'get',
        url: api,
        data: data,
        success: function (response) {
          console.log(response)
        },
        error: function (response) {
          console.log(response)
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
