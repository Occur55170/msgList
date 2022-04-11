<template>
  <div class="articleList">
    <aside>
      <ul>
        <li><a href="#" v-for="(item,key) in categories" :key="key">{{ key+1 }}.{{ item }}</a></li>
      </ul>
    </aside>
    <section>
      <article v-for="(item,key)  in articleList" :key="key">
        <p class="my-2 mb-3">{{item.category}}</p>
        <h3>{{item.title}}</h3>
        <p class="my-2 mb-3">
          <span class="mr-3">{{item.author}}</span>
          <span>{{item.time}}</span>
        </p>
        <p class="Pdesc">{{item.description}}</p>
        <div class="Info">
          <span>讚</span>
          <span>留言</span>
          <span>收藏</span>
        </div>
        <a href="" @click.prevent="openArcitle(item.id)"></a>
      </article>
    </section>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  data () {
    return {
      tit: 'articleList',
      articleList: []
    }
  },
  methods: {
    getArcitleList () {
      const vm = this
      vm.$emit('load', true)
      let formData = JSON.stringify({ 'Aid': '' })
      let api = `https://script.google.com/macros/s/AKfycbzB5-0GjOcnWU-s0f6eSk1-bIGBn23L8PJL-2dDNDJzoum6YHG2y-J06eq56B7bvvYR/exec`
      vm.$http.post(api, formData).then(response => {
        console.log(response.data)
        vm.articleList = response.data
        vm.$emit('load', false)
      })
    },
    openArcitle (Aid) {
      this.$router.push(`/articleCon/${Aid}`)
    }
  },
  computed: {
    categories () {
      const vm = this
      let sort = []
      vm.articleList.forEach(element => {
        if (sort.indexOf(element.category) === -1) {
          sort.push(element.category)
        }
      })
      return sort
    }
  },
  created () {
    this.getArcitleList()
    this.$emit('load', true)
  }
}
</script>

<style lang="scss" scoped>
.articleList{
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin:0 auto;
  aside{
    width:20%;
    margin-right:20px;
    ul{
      padding-left:0;
      margin: 20px 0;
      list-style-type:none;
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
  }
  section{
    background:#00324e;
    box-sizing:border-box;
    width:70%;
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
      a{
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
</style>
