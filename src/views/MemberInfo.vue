<template>
  <div class="memberInfo">
    <h1>會員資料</h1>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者姓名:</h5>
      <span>{{ member.name }}</span>
      <button @click="openModifyModal('name', member.name)">修改</button>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者性別:</h5>
      <span v-show="member.male == 'boy'">男</span>
      <span v-show="member.male == 'girl'">女</span>
      <button @click="openModifyModal('male', member.male)">修改</button>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者帳號:</h5>
      <span>{{ member.account }}</span>
      <button @click="openModifyModal('account', member.account)">修改</button>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者密碼:</h5>
      <span>{{ member.password }}</span>
      <button @click="openModifyModal('password', member.password)">修改</button>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者信箱:</h5>
      <span>{{ member.email }}</span>
      <button @click="openModifyModal('email', member.email)">修改</button>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">註冊日期:</h5>
      <span>{{ member.signDate }}</span>
    </div>
    <div class="memberItem mb-4 pb-3 d-flex flex-wrap align-items-center justify-content-between border-bottom">
      <h5 class="fw-bold mb-2 w-100">使用者編號:</h5>
      <span>{{ member.memberID }}</span>
    </div>
    <div>
      <h5 class="fw-bold mb-2 w-100">收藏文章:</h5>
      <ul>
        <li v-for="(item, key) in member.collect" :key='key'>
          <a href="#" @click.prevent="pushArticle(item.Aid)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modifyModal" ref="modifyModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">修改{{ modify.item }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body px-5 py-3">
            <div class="mb-3" v-if="modify.item !== '性別'">
              <div class="mb-3">
                <label class="oldItemName" for="account">舊{{ modify.item }}</label>
                <span>{{ modify.old }}</span>
              </div>
              <label class="newItemName" for="mItem">新{{ modify.item }}</label>
              <input class="newItemInput" type="text" id="mItem" :name="modify.item" :placeholder="`請輸入新${modify.item}`" required maxlength="20" v-model="modify.new">
            </div>
            <div v-if="modify.item == '性別'">
              <div class="mb-3">
                <label class="oldItemName" for="account">原{{ modify.item }}</label>
                <span v-show="modify.old == 'boy'">男</span>
                <span v-show="modify.old == 'girl'">女</span>
              </div>
              <label>
                <input type="radio" value="boy" v-model="modify.new">男
              </label>
              <label>
                <input type="radio" value="girl" v-model="modify.new">女
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" type="submit" @click="enterModifyModal" :disabled="modify.new==''">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import { Modal } from 'bootstrap'

export default {
  name: 'memberInfo',
  metaInfo: {
    title: '會員資料'
  },
  data () {
    return {
      memberID: '',
      modify: {
        sort: '',
        item: '',
        old: '',
        new: ''
      },
      member: {
        male: ''
      }
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
            vm.member = response.data.userData
            vm.member.collect = JSON.parse(response.data.userData.collect)
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            alert(response.data.message)
            vm.$router.push('/')
            vm.$store.dispatch('upadateisLoad', false)
          }
        } else {
          vm.$store.dispatch('upadateisLoad', false)
        }
      })
    },
    pushArticle (Aid) {
      this.$router.push(`/articleCon/${Aid}`)
    },
    openModifyModal (sort, data) {
      this.modify.sort = sort
      this.modify.new = ''
      this.modal = new Modal(this.$refs.modifyModal)
      switch (sort) {
        case 'name':
          this.modify.item = '姓名'
          break
        case 'male':
          this.modify.new = data
          this.modify.item = '性別'
          break
        case 'account':
          this.modify.item = '帳號'
          break
        case 'password':
          this.modify.item = '密碼'
          break
        case 'email':
          this.modify.item = '信箱'
          break
        default:
          alert('系統錯誤，請重新操作')
      }
      this.modify.old = data
      this.modal.show()
    },
    enterModifyModal () {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      let api = `https://script.google.com/macros/s/AKfycbz3iOitzTsNhaBrxIc6K3w94dzCEF_w3ptmVxv2InhPbWCx6PHYz6pwCVS5OE5KrXQI/exec`
      let formData = JSON.stringify({
        memberID: vm.member.memberID,
        type: 'modify',
        sort: vm.modify.sort,
        newData: vm.modify.new
      })
      vm.$http.post(api, formData).then(response => {
        if (response.data.success) {
          let message = response.data.message
          let success = 'success'
          vm.$store.dispatch('messageModules/updateMessage', { message, success })
          vm.modal.hide()
          vm.userMode = 'loginIn'
          vm.getMember(this.userID)
        } else {
          vm.$store.dispatch('upadateisLoad', false)
        }
      })
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
  .oldItemName,.newItemName{
    margin-right:10px;
  }
  .textContent{
    text-align:left;
  }
}
@media(max-width:768px){
  .memberInfo{
    max-width:600px;
    margin: 20px auto;
  }
  .memberItem{
    h5{
      font-size:20px;
    }
    span{
      font-size:18px;
    }
  }
}
@media(max-width:600px){
  .memberInfo{
    padding: 20px 30px;
  }

}
</style>
