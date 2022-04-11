<template>
  <div>
    <loading :active.sync="isLoading"/>
    <header>
      <div>
        <div class="logo">Occur</div>
        <div class="searchBar">
          <input type="text" name="" id="">
          <button>搜尋</button>
        </div>
        <a href="" class="text-white user" @click.prevent="openMember">
          註冊/登入
        </a>
      </div>
    </header>
    <main>
      <router-view class="section" @load="loadSta"></router-view>
    </main>
    <footer>
      練習作業用
      {{msg}}
    </footer>

    <!-- Member -->
    <div class="modal MemberCon" id="MemberCon">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" v-if="memberMode=='loginIn'">登入會員</h5>
            <h5 class="modal-title font-weight-bold" v-if="memberMode=='signUp'">註冊會員</h5>
            <button type="button" class="btn-close" @click="closeMember">X</button>
          </div>
          <div class="modal-body">
            <div v-if="memberMode=='loginIn'">
              <validation-observer class="mb-3" v-slot="{ invalid }">
                <form @submit.prevent="memberLoginIn">
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
                    <!-- <button class="btn btn-danger" type="submit" :disabled="invalid">註冊</button> -->
                    <button class="btn btn-danger" type="submit" :disabled="invalid" @click.prevent="memberSignUp">註冊</button>

                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="modal-footer text-center">
            <p v-if="memberMode=='loginIn'">還沒有會員?<a href="" @click.prevent="memberMode='signUp'">註冊</a></p>
            <p v-if="memberMode=='signUp'">您已經有帳號了嗎?<a href="" @click.prevent="memberMode='loginIn'">登入 </a></p>
          </div>
        </div>
      </div>
    </div>
    <!-- Member -->
    <AlertMSG/>
  </div>
</template>

<script>
import $ from 'jquery'
import AlertMSG from './views/AlertMSG'

export default {
  data () {
    return {
      msg: 'App',
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
      isLoading: false
    }
  },
  methods: {
    openMember () {
      $('#MemberCon').modal('show')
    },
    closeMember () {
      $('#MemberCon').modal('hide')
    },
    memberSignUp () {
      const vm = this
      // const timestamp = new Date()
      // let yyyy = timestamp.getFullYear(),
      // mm = timestamp.getMonth() + 1,
      // day = timestamp.getDate(),
      // hour = timestamp.getHours(),
      // min = timestamp.getMinutes(),
      // sec = timestamp.getSeconds();
      const api = `${process.env.VUE_APP_MEMBER}`
      vm.user.type = vm.memberMode
      let formData = JSON.stringify(vm.user)
      console.log(formData)
      vm.axios.post(api, formData).then(function (response) {
        console.log(response.data)
        if (response.data === '註冊成功') {
          $('#MemberCon').modal('hide')
        } else {
          console.log(response.data)
        }
      })
    },
    memberLoginIn () {
      const vm = this
      const api = `${process.env.VUE_APP_MEMBER}`
      vm.user.type = vm.memberMode
      let formData = JSON.stringify({
        'type': vm.user.type,
        'account': vm.logAc,
        'password': vm.logPwd
      })
      vm.axios.post(api, formData).then(function (response) {
        console.log(response.data[0].success)
        if (response.data[0].success) {
          $('#MemberCon').modal('hide')
          console.log(response.data[0].message)
        } else {
          console.log(response.data[0].success)
          console.log(response.data[0].message)
        }
      })
    },
    loadSta (so) {
      this.isLoading = so
    },
    te () {
      // const vm = this
      // $('#MemberCon').modal('hide');
      // vm.$bus.$emit('message:push','您已成功將商品加入購物車','success');
      $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbycJmymmXuvih5x4XkN-Ry5S6JgIrd2JhVXgAjWr2Wcm_jYBY4XuA6nuF4GhfRlmih7/exec',
        type: 'GET',
        data: '',
        complete: function (response) {
          let rdata = JSON.parse(response.responseText)
          console.log(rdata[0])
        },
        success () {

        }
      })
    }
  },
  components: {
    AlertMSG
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
header{
  background:#006aa6;
  padding: 20px 0;
  &>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    margin: 0 auto;
  }
  .logo{
    color: #fff;
    font-size:40px;
    font-weight: bold;
    flex-basis:20%;
    flex-grow:0;
    flex-shrink:0;
    margin-right:20px;
    text-align:center;
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
  .user{
    color:#fff;
    text-decoration:none;
    width:10%;
    font-weight:bold;
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
