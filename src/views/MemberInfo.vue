<template>
  <div class="memberInfo">
    <h1>會員資料</h1>
    <div class="mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者姓名:</h5>
      <div>
        <span>{{ member.name }}</span>
        <input type="text" name="" id="">
      </div>
      <button>修改</button>
    </div>
    <div class="mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者帳號:</h5>
      <div>
        <span>{{ member.account }}</span>
        <input type="text" name="" id="">
      </div>
      <button>修改</button>
    </div>
    <div class="mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者密碼:</h5>
      <div>
        <span>{{ member.password }}</span>
      <input type="text" name="" id="">
      </div>
      <button>修改</button>
    </div>
    <div class="mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者信箱:</h5>
      <div>
        <span>{{ member.email }}</span>
      <input type="text" name="" id="">
      </div>
      <button>修改</button>
    </div>
    <div class="mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">註冊日期:</h5>
      <span>{{ member.signDate }}</span>
    </div>
    <div>
      收藏文章:
      <ul>
        <li v-for="(item, key) in member.collect" :key='key'>
          <a href="#" @click.prevent="pushArticle(item.Aid)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <!-- <p>說讚的文章:{{ member.likeList }}</p> -->
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
      vm.$http.post(api, data).then(response => {
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
  max-width:768px;
  margin:0 auto;
  background:#fff;
  border-radius:10px;
  box-sizing:border-box;
  padding:20px 60px;
  h1{
    margin-bottom:20px;
    text-align:center;
    font-weight:bold;
  }
  p{
    margin-bottom:10px;
  }
  .textContent{
    text-align:left;
  }
}
</style>
