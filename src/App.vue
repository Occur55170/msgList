<template>
  <div>
    <loading :active.sync="isLoading"/>
    <header>
      <div>
        <div class="logo">
          <router-link to="/">Occur</router-link>
        </div>
        <div class="searchBar">
          <input type="text" name="searchText" id="searchText" v-model.trim="searchText" @keyup.enter="search">
          <button @click="search">搜尋</button>
        </div>
        <div class="user">
          <div v-if="userID">
            <p class="mx-2 d-block mb-0"><a href="#" @click.prevent="goUserInfo"><i class="fas fa-user"></i><span class="mx-1">{{ user.name }}</span></a>你好</p>
            <a href="#" class="logOut" @click.prevent="logOut">登出</a>
          </div>
          <button type="button" class="user" data-bs-toggle="modal" data-bs-target="#exampleModal" v-else>註冊/登入</button>
        </div>
      </div>
    </header>
    <main>
      <router-view class="section" :searchText="searchText" :userID="userID" :user="user" @openLoginIn="openLoginIn"></router-view>
    </main>
    <footer>
      練習作業用網站
    </footer>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" ref="exampleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" v-if="userMode=='loginIn'">登入會員</h5>
            <h5 class="modal-title font-weight-bold" v-if="userMode=='signUp'">註冊會員</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="userMode=='loginIn'">
              <validation-observer class="mb-3" v-slot="{ invalid }">
                <form @submit.prevent="loginIn">
                  <validation-provider rules="required" v-slot="{errors,classes}" class="mb-3 d-block">
                    <label for="account">帳號</label>
                    <input type="text" class="form-control" id="account" :class="classes" name="帳號" v-model.number="logAc" placeholder="帳號" required maxlength="20">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{errors,classes}" class="mb-3 d-block">
                    <label for="password">密碼</label>
                    <input type="text" class="form-control" id="password" :class="classes" name="密碼" v-model.number="logPwd" placeholder="密碼" required maxlength="20">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <div class="text-center my-2">
                    <button class="btn btn-danger" type="submit" :disabled="invalid">登入</button>
                  </div>
                </form>
              </validation-observer>
            </div>
            <div v-if="userMode=='signUp'">
              <validation-observer class="mb-3" v-slot="{ invalid }">
                <form >
                <!-- <form @submit.prevent="userData"> -->
                  <validation-provider rules="required" v-slot="{ errors,classes }" class="mb-3 d-block">
                    <label for="username">名稱</label>
                    <input type="text" class="form-control" :class="classes" name="名稱" id="username" v-model.trim="user.name" placeholder="輸入名稱">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <ValidationProvider rules="oneOf:boy,girl" name="male" v-slot="{ errors }" class="mb-3 d-block">
                    <label>
                      <input type="radio" value="boy" v-model="user.male">男
                    </label>
                    <label>
                      <input type="radio" value="girl" v-model="user.male">女
                    </label>
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                  <validation-provider rules="required|email" v-slot="{ errors,classes }" class="mb-3 d-block">
                    <label for="email">收件人信箱</label>
                    <input type="text" class="form-control" :class="classes" name="信箱" id="email" v-model.trim="user.email" placeholder="輸入信箱">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{errors,classes}" class="mb-3 d-block">
                    <label for="account">帳號</label>
                    <input type="text" class="form-control" id="account" :class="classes" name="帳號" v-model.number="user.account" placeholder="帳號" required maxlength="20">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{errors,classes}" class="mb-3 d-block">
                    <label for="password">密碼</label>
                    <input type="text" class="form-control" id="password" :class="classes" name="密碼" v-model.number="user.password" placeholder="密碼" required maxlength="20">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                  <div class="text-center my-2">
                    <button class="btn btn-danger" type="submit" :disabled="invalid" @click.prevent="signUp">註冊</button>

                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="modal-footer">
            <p v-if="userMode=='loginIn'">還沒有會員?<a href="" @click.prevent="userMode='signUp'">註冊</a></p>
            <p v-if="userMode=='signUp'">您已經有帳號了嗎?<a href="" @click.prevent="userMode='loginIn'">登入</a></p>
          </div>
        </div>
      </div>
    </div>
    <AlertMSG/>
  </div>
</template>

<script>
// import $ from 'jquery'
import { Modal } from 'bootstrap'
import { mapGetters } from 'vuex'
import AlertMSG from './components/AlertMSG'

export default {
  name: 'App',
  data: () => ({
    userMode: 'loginIn',
    logAc: '',
    logPwd: '',
    user: {},
    userID: '',
    searchText: ''
  }),
  methods: {
    signUp () {
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
      const userID = new Date().getTime()
      const api = `${process.env.VUE_APP_USER}`
      vm.user.type = vm.userMode
      vm.user.male = 'boy'
      vm.user.time = time
      vm.user.userID = userID
      let formData = JSON.stringify(vm.user)
      vm.axios.post(api, formData).then(function (response) {
        if (response.data[0].message === '註冊成功') {
          console.log(response.data[0].message)
          vm.$bus.$emit('message:push', response.data[0].message, 'success')
          vm.modal.hide()
        } else {
          console.log(response.data[0].message)
        }
        vm.$store.dispatch('upadateisLoad', false)
      })
    },
    loginIn () {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      const api = `${process.env.VUE_APP_USER}`
      vm.user.type = vm.userMode
      let formData = JSON.stringify({
        'type': vm.user.type,
        'account': vm.logAc,
        'password': vm.logPwd
      })
      vm.axios.post(api, formData).then(function (response) {
        if (response.data[0].success) {
          vm.$bus.$emit('message:push', response.data[0].message, 'success')
          // 恢復預設值
          vm.logAc = ''
          vm.logPwd = ''
          vm.userID = response.data[0].userID
          vm.user.name = response.data[0].name
          vm.user.male = response.data[0].male
          vm.modal.hide()
        } else {
          console.log(response.data[0].success)
          vm.$bus.$emit('message:push', response.data[0].message, 'danger')
          vm.modal.hide()
        }
        vm.$store.dispatch('upadateisLoad', false)
      })
    },
    logOut () {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      const api = `${process.env.VUE_APP_USER}`
      vm.user.type = vm.userMode
      let formData = JSON.stringify({
        'type': 'logOut',
        'userID': vm.userID
      })
      vm.axios.post(api, formData).then(function (response) {
        console.log(response.data[0])
        if (response.data[0].success) {
          // 恢復預設值
          vm.userID = ''
          vm.logAc = ''
          vm.logPwd = ''
          vm.$bus.$emit('message:push', response.data[0].message, 'success')
        }
        // 登出後 看要回此頁，但是不可在使用者頁面
        vm.$router.push('/')
        // 登出後 看要回此頁，但是不可在使用者頁面
        vm.$store.dispatch('upadateisLoad', false)
      })
    },
    goUserInfo () {
      if (this.$route.name !== 'MemberInfo') {
        this.$router.push(`/MemberInfo/${this.userID}`)
      }
    },
    openLoginIn () {
      this.userMode = 'loginIn'
      this.modal.show()
    },
    search () {
      const vm = this
      console.log(vm.searchText)
    }
  },
  computed: {
    // isLoading
    ...mapGetters(['isLoading'])
  },
  components: {
    AlertMSG
  },
  mounted () {
    // this.$store.dispatch('upadateisLoad', true)
    this.modal = new Modal(this.$refs.exampleModal)
    // this.getlogStatus()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
header{
  background:#006aa6;
  padding: 20px calc((100% - 1000px)/2);
  &>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    margin: 0 auto;
  }
  .logo{
    flex-basis:200px;
    flex-grow:0;
    flex-shrink:0;
    text-align: left;
    a{
      text-decoration:none;
      color: #fff;
      font-size:48px;
      font-weight: bold;
    }
  }
  .searchBar{
    color: #fff;
    flex-grow: 2;
    flex-shrink: 2;
    width: 100%;
    box-sizing:border-box;
    display: flex;
    input{
      width: 100%;
      border: 0;
      box-sizing: border-box;
      padding:5px 10px;
      border-top-left-radius:5px;
      border-bottom-left-radius:5px;
      border:1px solid rgb(38, 38, 38);
      border-right: 0;
    }
    button{
      background:#00588a;
      color: #fff;
      border: 0;
      width: 10%;
      border-top-right-radius:5px;
      border-bottom-right-radius:5px;
      border:1px solid rgb(38, 38, 38);
      border-left: 0;
    }
  }
  .user{
    flex-shrink: 1;
    color:#fff;
    margin-left:15px;
    font-size:18px;
    border:0;
    background:transparent;
    font-weight:bold;
    width:250px;
    &>div{
      display:flex
    }
    a{
      color:#fff;
    }
  }
  .logOut{
    text-decoration:none;
    color:#fff;
  }
}
main{
  background:#00324e;
  box-sizing:border-box;
  padding:20px calc((100% - 1000px)/2)
}
footer{
  text-align: center;
  padding:20px;
  font-weight: bold;
  font-size: 20px;
}
</style>
