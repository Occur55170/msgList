<template>
  <div>
    <loading :active.sync="isLoading"/>
    <header>
      <div>
        <div class="logo">
          <router-link to="/">Occur</router-link>
        </div>
        <div class="searchBar">
          <input type="text" name="" id="">
          <button>搜尋</button>
        </div>
        <div v-if="userID">
          <a href="#" class="member" v-if="userID" @click.prevent="goUserInfo"><i class="fas fa-user"></i><span class="mx-1">{{ user.name }}</span>你好</a>
          <a href="" class="logOut" @click.prevent="logOut">登出</a>
        </div>
        <button type="button" class="member" data-bs-toggle="modal" data-bs-target="#exampleModal" v-else>註冊/登入</button>
      </div>
    </header>
    <main>
      <router-view class="section" @load="loadStatus"></router-view>
    </main>
    <footer>
      練習作業用
      {{msg}}
    </footer>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" ref="exampleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" v-if="memberMode=='loginIn'">登入會員</h5>
            <h5 class="modal-title font-weight-bold" v-if="memberMode=='signUp'">註冊會員</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="memberMode=='loginIn'">
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
            <div v-if="memberMode=='signUp'">
              <validation-observer class="mb-3" v-slot="{ invalid }">
                <form >
                <!-- <form @submit.prevent="memberData"> -->
                  <validation-provider rules="required" v-slot="{ errors,classes }" class="mb-3 d-block">
                    <label for="username">名稱</label>
                    <input type="text" class="form-control" :class="classes" name="名稱" id="username" v-model.trim="user.name" placeholder="輸入名稱">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
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
            <p v-if="memberMode=='loginIn'">還沒有會員?<a href="" @click.prevent="memberMode='signUp'">註冊</a></p>
            <p v-if="memberMode=='signUp'">您已經有帳號了嗎?<a href="" @click.prevent="memberMode='loginIn'">登入</a></p>
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
import AlertMSG from './components/AlertMSG'

export default {
  name: 'App',
  data: () => ({
    msg: 'App',
    isLoading: false,
    memberMode: 'loginIn',
    logAc: '',
    logPwd: '',
    user: {
      'type': '',
      'account': '',
      'password': '',
      'name': '',
      'email': ''
    },
    // 測試用
    userID: ''
  }),
  methods: {
    signUp () {
      const vm = this
      const timestamp = new Date()
      let yyyy = timestamp.getFullYear()
      let mm = timestamp.getMonth() + 1
      let day = timestamp.getDate()
      let hour = timestamp.getHours()
      let min = timestamp.getMinutes()
      let sec = timestamp.getSeconds()
      let time = `${yyyy} / ${mm} / ${day}  ${hour}:${min}:${sec}`
      const userID = new Date().getTime()
      const api = `https://script.google.com/macros/s/AKfycbxAXjuXMw2yOWOdZGKx7t6zP2OAIIFmSDBQu0GM8hCHPYRy-y1QLGts_4doAcODixkt/exec`
      vm.user.type = vm.memberMode
      vm.user.time = time
      vm.user.userID = userID
      console.log(userID)
      let formData = JSON.stringify(vm.user)
      vm.axios.post(api, formData).then(function (response) {
        if (response.data[0].message === '註冊成功') {
          console.log(response.data[0].message)
          vm.$bus.$emit('message:push', response.data[0].message, 'success')
          vm.modal.hide()
        } else {
          console.log(response.data[0].message)
        }
      })
    },
    loginIn () {
      const vm = this
      const api = `https://script.google.com/macros/s/AKfycbxAXjuXMw2yOWOdZGKx7t6zP2OAIIFmSDBQu0GM8hCHPYRy-y1QLGts_4doAcODixkt/exec`
      vm.user.type = vm.memberMode
      let formData = JSON.stringify({
        'type': vm.user.type,
        'account': vm.logAc,
        'password': vm.logPwd
      })
      vm.axios.post(api, formData).then(function (response) {
        console.log(response.data[0])
        if (response.data[0].success) {
          vm.$bus.$emit('message:push', response.data[0].message, 'success')
          // 恢復預設值
          vm.logAc = ''
          vm.logPwd = ''
          vm.userID = response.data[0].userID
          vm.user.name = response.data[0].name
          vm.modal.hide()
        } else {
          console.log(response.data[0].success)
          vm.$bus.$emit('message:push', response.data[0].message, 'danger')
          vm.modal.hide()
        }
      })
    },
    logOut () {

    },
    goUserInfo () {
      this.$router.push(`./UserInfo/${this.userID}`)
    },
    loadStatus (load) {
      this.isLoading = load
    },
    test () {
      this.$bus.$emit('message:push', '新增成功', 'success')
    }
  },
  components: {
    AlertMSG
  },
  mounted () {
    this.modal = new Modal(this.$refs.exampleModal)
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
    flex-basis:20%;
    flex-grow:0;
    flex-shrink:0;
    margin-right:20px;
    text-align: left;
    a{
      text-decoration:none;
      color: #fff;
      font-size:60px;
      font-weight: bold;
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
  .member{
    color:#fff;
    width:15%;
    font-size:18px;
    border:0;
    background:transparent;
    font-weight:bold;
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
