<template>
  <div class="articleList">
    <nav>
      <ul>
        <li v-for="(item,key) in category" :key="key" @click="updateSortName(item)" :class="{'activeSort': sortName == item}">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </nav>
    <aside>
      <h5 class="title">精選文章</h5>
      <div class="content">
        <div v-for="(item,key) in recommendList" :key="key">
          <p class="mb-0">{{ key+1 }}.{{ item.title }}</p>
          <a href="#" @click.prevent="openArticle(item.id)" class="w-100 h-100"></a>
        </div>
      </div>
    </aside>
    <section>
      <h5 class="title">近期焦點</h5>
      <div v-if="filterGroup.length == 0">
        <p>你所搜尋的項目暫時沒有相關文章喔</p>
      </div>
      <article v-for="(item,key)  in filterGroup" :key="key">
        <p class="h6 mb-2">{{ item.category }}</p>
        <a href="#" @click.prevent="openArticle(item.id)"></a>
        <div class="articleImg mb-3">
          <img :src="require(`@/assets/images/${item.id}.jpg`)" alt="">
        </div>
        <h3>{{ item.title }}</h3>
        <p class="Pdesc mb-3">{{ item.description }}</p>
        <p class="d-flex justify-content-between w-100">
          <span>{{ item.author }}</span>
          <span>{{ item.time }}</span>
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'articleList',
  data () {
    return {
      sortName: '',
      articleList: []
    }
  },
  props: ['searchText'],
  methods: {
    getArticleList () {
      const vm = this
      vm.$store.dispatch('upadateisLoad', true)
      let formData = { 'Aid': '' }
      $.ajax({
        type: 'get',
        url: `${process.env.VUE_APP_ARTICLE}`,
        data: formData,
        success: function (response) {
          response = JSON.parse(response)[0]
          response.data.forEach(item => {
            item.likeList = JSON.parse(item.likeList)
          })
          if (response.success) {
            vm.articleList = response.data
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          let message = '文章列表載入錯誤，請稍後在試一次或者聯絡客服人員'
          let success = 'danger'
          vm.$store.dispatch('messageModules/updateMessage', { message, success })
        }
      })
    },
    openArticle (Aid) {
      this.$router.push(`/articleCon/${Aid}`)
    },
    updateSortName (item) {
      const vm = this
      if (vm.sortName !== item) {
        vm.sortName = item
      } else {
        vm.sortName = ''
      }
    }
  },
  computed: {
    category () {
      const vm = this
      let category = []
      vm.articleList.forEach(element => {
        if (category.indexOf(element.category) === -1) {
          category.push(element.category)
        }
      })
      return category
    },
    filterGroup () {
      const vm = this
      if (vm.sortName !== '' && vm.searchText !== '') {
        return vm.articleList.filter(item => {
          return item.category === vm.sortName && item.title.indexOf(vm.searchText) !== -1
        })
      } else if (vm.sortName !== '') {
        return vm.articleList.filter(item => item.category === vm.sortName)
      } else if (vm.searchText !== '') {
        return vm.articleList.filter(item => item.title.indexOf(vm.searchText) !== -1)
      } else {
        return vm.articleList
      }
    },
    recommendList () {
      const vm = this
      let newAry = vm.articleList.filter(item => item.likeList.length > 1)
      return newAry
    }
  },
  created () {
    this.getArticleList()
    this.$store.dispatch('upadateisLoad', true)
  }
}
</script>

<style lang="scss" scoped>
.articleList{
  margin:0 auto;
  display:flex;
  align-items: flex-start;
  justify-content:space-between;
  flex-wrap:wrap;
  nav{
    width:100%;
    margin-bottom:10px;
    border:1px solid #eee;
    border-width:2px 0;
    box-sizing:border-box;
    padding:10px 0;
    background:rgba(255,255,255,0.5);
    ul{
      padding-left:0;
      margin-bottom:0;
      list-style-type:none;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    a{
      padding:0 20px;
      box-sizing: border-box;
      display: block;
      text-decoration: none;
      color: #fff;
      color: #000;
      font-size: 20px;
      &:hover{
        color: #d60c18;
      }
    }
    .activeSort>a{
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  aside{
    width:25%;
    order:2;
    padding: 30px 0 30px 30px;
    .content{
      box-sizing:border-box;
      div{
        background:rgba(255,255,255,0.5);
        border:1px solid #b3b3b3;
        padding: 10px;
        margin-bottom:10px;
        position:relative;
        p{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        a{
          position:absolute;
          top:0;
          left:0;
        }
      }
    }
  }
  section{
    box-sizing:border-box;
    flex-grow:2;
    flex-shrink:2;
    flex-basis:70%;
    padding: 30px 0;
    order:1;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    .title{
      width:100%;
    }
    article{
      width:49%;
      background:#fff;
      padding:20px 25px;
      box-sizing:border-box;
      position:relative;
      border-radius:10px;
      margin-bottom:20px;
      display:flex;
      flex-flow:column;
      justify-content:flex-start;
      .articleImg{
        margin-top:0;
        width:100%;
        height:180px;
        overflow:hidden;
        img{
          width:100%;
          min-height:100%;
        }
      }
      a{
        position:absolute;
        top:0;
        left:0;
        display:block;
        width:100%;
        height:100%;
      }
      h3{
        font-weight:bold;
        line-height:1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p{
        margin-bottom:0;
        color:#666;
      }
      div:last-Child{
        margin-top:20px;
        span{
          margin-right:20px;
        }
      }
      .Pdesc{
        color:#000;
        font-size:18px;
        flex-grow:2;
        flex-shrink:2;
      }
      .Info{
        margin-top:20px;
        color:#aaa;
        span{
          margin-right:10px;
        }
      }
    }
  }
}
@media(max-width:768px){
  .articleList{
    nav{
      padding-right: 10px;
    }
    aside{
      width: 23%;
      padding: 30px 0;
    }
    section{
      margin-right:2%;
      article{
        .articleImg{}
      }
    }
  }
}
@media(max-width:600px){
  .articleList{
    flex-wrap:wrap;
    nav{
      width:100%;
      padding: 0;
      ul{
        width:100%;
        margin-top:0;
        display:flex;
        li{
          width:100%;
          text-align:center;
        }
        span{
          display:none;
        }
      }
      a{
        padding:3px 10px;
      }
      .activeSort{
        background-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        font-weight:bold;
      }
    }
    aside{
      display:none;
    }
    section{
      .title{
        display:none;
      }
      width:100%;
      padding:20px 0;
      article{
        width:100%;
        padding: 10px 0;
        p, h3{
          padding: 0 15px;
        }
      }
    }
  }
}
</style>
