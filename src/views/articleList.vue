<template>
  <div class="articleList">
    <aside>
      <ul>
        <li v-for="(item,key) in category" :key="key" @click="updateSortName(item)" :class="{'activeSort': sortName == item}">
          <a href="#"><span>{{ key+1 }}</span>{{ item }}</a>
        </li>
      </ul>
    </aside>
    <section>
      <div v-if="filterGroup.length == 0">
        <p>你所搜尋的項目暫時沒有相關文章喔</p>
      </div>
      <article v-for="(item,key)  in filterGroup" :key="key">
        <p class="my-2 mb-3">{{item.category}}</p>
        <h3>{{item.title}}</h3>
        <p class="my-2 mb-3">
          <span class="mr-3">{{item.author}}</span>
          <span>{{item.time}}</span>
        </p>
        <p class="Pdesc">{{item.description}}</p>
        <a href="" @click.prevent="openArticle(item.id)"></a>
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
          if (response.success) {
            vm.articleList = response.data
            vm.$store.dispatch('upadateisLoad', false)
          } else {
            console.log(response.message)
            vm.$store.dispatch('upadateisLoad', false)
          }
        },
        error: function (response) {
          console.log(response)
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
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin:0 auto;
  aside{
    width:20%;
    ul{
      padding-left:0;
      margin: 20px 0;
      list-style-type:none;
      span::after{
        content:'.'
      }
    }
    a{
      padding: 10px 20px;
      box-sizing: border-box;
      display: block;
      text-decoration: none;
      color: #fff;
      font-size: 20px;
      &:hover{
        background-color: rgba(0, 0, 0, 0.35);
        color: #fff;
      }
    }
    .activeSort>a{
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  section{
    background:#00324e;
    box-sizing:border-box;
    width:80%;
    padding: 30px;
    border-radius:10px;
    background:#fff;
    article{
      padding:20px;
      box-sizing:border-box;
      border-bottom:1px solid #999;
      position:relative;
      &:first-Child{
        padding-top:0;
      }
      &:last-Child{
        padding-bottom:0;
      }
      h3{
        font-weight:bold;
      }
      p{
        margin-bottom:0;
        color:#666;
      }
      .Pdesc{
        color:#000;
        font-size:18px;
      }
      &>a{
        position:absolute;
        top:0;
        left:0;
        display:block;
        width:100%;
        height:100%;
      }
      &:last-Child{
        border-bottom:0;
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
    aside{
      width:15%;
      padding-right: 10px;
      ul{
        margin-top:0;
      }
      a{
        padding:10px 0 10px 20px;
      }
    }
    section{
      width:85%;
    }
  }
}
@media(max-width:600px){
  .articleList{
    flex-wrap:wrap;
    aside{
      width:100%;
      padding-right: 0;
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
    section{
      width:100%;
      padding:20px 30px;
      article{
        padding: 20px 0;
      }
    }
  }
}
</style>
