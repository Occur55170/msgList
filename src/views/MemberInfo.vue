<template>
  <div class="memberInfo">
    <h1>memberInfo</h1>
    <p>使用者姓名:{{ member.name }}</p>
    <p>使用者帳號:{{ member.account }}</p>
    <p>使用者密碼:{{ member.password }}</p>
    <p>使用者信箱:{{ member.email }}</p>
    <p>註冊日期:{{ member.signDate }}</p>
    <div>
      收藏文章:
      <ul>
        <li v-for="(item, key) in member.collect" :key='key'>
          <a href="#" @click.prevent="pushArticle(item.Aid)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <p>說讚的文章:{{ member.likeList }}</p>
    <div class="textContent">
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  name: 'memberInfo',
  data () {
    return {
      memberID: '',
      member: {}
    }
  },
  props: ['userID'],
  methods: {
    getMember (userID) {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      const api = `${process.env.VUE_APP_USER}`
      let data = JSON.stringify({
        'userID': userID,
        'type': 'getMember'
      })
      console.log(data)
      vm.$http.post(api, data).then(response => {
        console.log(response)
        if (response.data.success) {
          if (response.data.userStatus && vm.userID !== '') {
            vm.member = {
              'account': response.data.userData.account,
              'password': response.data.userData.password,
              'email': response.data.userData.email,
              'likeList': response.data.userData.likeList,
              'name': response.data.userData.name,
              'signDate': response.data.userData.signDate,
              'memberID': response.data.userData.userID
            }
            vm.member.collect = JSON.parse(response.data.userData.collect)
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            alert(response.data.message)
            vm.$router.push('/')
            vm.$store.dispatch('upadateisLoad', false)
          }
        } else {
          console.log(response.data.message)
        }
      })
    },
    pushArticle (Aid) {
      this.$router.push(`/articleCon/${Aid}`)
    }
  },
  created () {
    this.getMember(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.memberInfo{
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
