<template>
  <div>
    <loading :active.sync="isLoading"/>
    <header class="indexContainer">
      <div>
        <div class="logo">
          <RouterLink to="/">
            <img src="@/assets/logo.png" alt="">
          </RouterLink>
        </div>
        <div class="searchBar">
          <div>
            <input type="text" name="searchText" id="searchText" v-model.trim="searchText">
          </div>
          <a href="" @click.prevent="openSearch"><i class="fa-solid fa-magnifying-glass"></i></a>
        </div>
        <div class="user">
          <div v-if="userID">
            <p class="mx-2 d-block mb-0"><a href="#" @click.prevent="goUserInfo"><i class="fas fa-user"></i><span class="mx-1">{{ user.name }}</span></a>你好</p>
            <a href="#" class="logOut" @click.prevent="logOut">登出</a>
          </div>
          <button type="button" @click="openLoginIn" v-else>註冊/登入</button>
        </div>
      </div>
    </header>
    <main class="indexContainer">
      <RouterView class="section" :searchText="searchText" :userID="userID" :user="user" @openLoginIn="openLoginIn"></RouterView>
    </main>
    <footer>
      練習作業用網站
    </footer>

    <div class="modal fade" id="userModal" ref="userModal">
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
                <form ref="form">
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
import $ from 'jquery'
import { Modal } from 'bootstrap'
import { mapGetters } from 'vuex'
import AlertMSG from './components/AlertMSG'
// import Usermodal from './components/Modal'

export default {
  name: 'App',
  metaInfo: {
    title: '拉拉新聞網',
    titleTemplate: '%s | 拉拉新聞網'
  },
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
          let message = response.data[0].message
          let success = 'success'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          vm.modal.hide()
          vm.user = {}
          vm.userMode = 'loginIn'
        } else {
          let message = response.data[0].message
          let success = 'danger'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
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
        response.data = response.data[0]
        if (response.data.success) {
          let message = response.data.message
          let success = 'success'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
          vm.logAc = ''
          vm.logPwd = ''
          vm.userID = response.data.userID
          vm.user.name = response.data.name
          vm.user.male = response.data.male
          vm.user.collect = JSON.parse(response.data.collect)
          vm.user.likeList = JSON.parse(response.data.likeList)
          vm.modal.hide()
        } else {
          let message = response.data.message
          let success = 'danger'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
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
        response.data = response.data[0]
        if (response.data.success) {
          // 恢復預設值
          vm.userID = ''
          vm.logAc = ''
          vm.logPwd = ''
          vm.user = {}
          let message = response.data.message
          let success = 'success'
          vm.$store.dispatch('AlertMSGModules/updateMessage', { message, success })
        }
        // 登出後 看要回此頁，但是不可在使用者頁面
        if (vm.$route.name === 'MemberInfo') {
          vm.$router.push('/')
        }
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
      this.$store.dispatch('upadateisLoad', false)
    },
    openSearch () {
      $('.searchBar>div').toggle()
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  components: {
    AlertMSG
  },
  mounted () {
    this.modal = new Modal(this.$refs.userModal)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
header{
  background:#B8BB9A;
  padding:20px 0;
  &>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .logo{
    width:150px;
    flex-grow:0;
    flex-shrink:0;
    img{
      display:block;
      width:100%;
    }
  }
  .searchBar{
    color: #fff;
    flex-grow: 2;
    flex-shrink: 2;
    width: 100%;
    padding:0 3%;
    box-sizing:border-box;
    display: flex;
    &>div{
      width:100%;
    }
    input{
      width: 100%;
      box-sizing: border-box;
      padding:5px 10px;
      border: 0;
      border:1px solid rgb(38, 38, 38);
      border-radius:5px;
    }
    a{
      display:none;
    }
  }
  .user{
    flex-shrink: 1;
    margin-left:15px;
    button{
      width:100px;
      color:#000;
      background:transparent;
      border:0;
      font-size:18px;
      font-weight:bold;
    }
    &>div{
      width:200px;
      display:flex;
      color:#000;
      font-size:18px;
      font-weight:bold;
      a{
        color:#000;
        font-size:18px;
        font-weight:bold;
      }
    }
  }
  .logOut{
    text-decoration:none;
    color:#fff;
  }
}
main{
  background:#cba282;
  box-sizing:border-box;
  padding:20px 10px;
}
footer{
  text-align: center;
  padding:20px;
  font-weight: bold;
  font-size: 20px;
}
@media(max-width:768px){
  header{
    .logo{
      flex-basis:unset;
      width:15%;
      padding-right:20px;
      box-sizing:border-box;
      img{
        width:100%;
      }
    }
  }
}
@media(max-width:600px){
  header{
    position:relative;
    .logo{
      flex-basis:unset;
      width:35%;
      padding-right:20px;
      box-sizing:border-box;
      img{
        width:100%;
      }
    }
    .searchBar{
      justify-content: flex-end;
      a{
        color:#fff;
        display:inline-block;
      }
      &>div{
        box-sizing:border-box;
        padding:10px 20px;
        background:#acacac;
        display:none;
        position:absolute;
        top:100%;
        left:0;
        input{
          border:0;
          border-right: 0;
        }
      }
    }
  }
}
</style>
