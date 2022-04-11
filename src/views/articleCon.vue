<template>
  <div class="articleCon">
    <div class="articlePage">
      <div class="head mb-4">
        <div class="d-flex justify-content-between">
          <a href="" @click.prevent="goback">回上頁</a>
          <h6>{{ article.author }}</h6>
        </div>
        <h2 class="font-weight-bold mt-4 mb-2">{{ article.title }}</h2>
        <h6>{{ article.category }}</h6>
      </div>
      <div class="content">
        <p>{{ article.content }}</p>
      </div>
    </div>
    <div class="message">
      <p>共 2 則留言</p>
      <div>
        <div class="mainReply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">國立臺北科技大學</p>
            <p class="content">聽海哭夭的聲音</p>
            <p class="time"><span>B1</span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">暨南國際大學</p>
            <p class="content">幹妳娘我快笑瘋了啦</p>
            <p class="time"><span>B1<em>-1</em></span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="girl"></div>
          </div>
          <div>
            <p class="name">南臺科技大學</p>
            <p class="content">幹妳娘我快笑瘋了啦</p>
            <p class="time"><span>B1<em>-2</em></span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">澎湖科大</p>
            <p class="content">幹妳娘我快笑瘋了啦<br>除非你要餓死了沒有時間考慮別間</p>
            <p class="time"><span>B1<em>-3</em></span>2022/04/10 12:30</p>
          </div>
        </div>
      </div>
      <div>
        <div class="mainReply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">國立臺北科技大學</p>
            <p class="content">聽海哭夭的聲音</p>
            <p class="time"><span>B2</span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">暨南國際大學</p>
            <p class="content">幹妳娘我快笑瘋了啦</p>
            <p class="time"><span>B2<em>-1</em></span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="girl"></div>
          </div>
          <div>
            <p class="name">南臺科技大學</p>
            <p class="content">幹妳娘我快笑瘋了啦</p>
            <p class="time"><span>B2<em>-2</em></span>2022/04/10 12:30</p>
          </div>
        </div>
        <div class="reply">
          <div class="avatar">
            <div class="boy"></div>
          </div>
          <div>
            <p class="name">澎湖科大</p>
            <p class="content">幹妳娘我快笑瘋了啦<br>除非你要餓死了沒有時間考慮別間</p>
            <p class="time"><span>B2<em>-3</em></span>2022/04/10 12:30</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleCon',
  data () {
    return {
      Aid: '',
      article: {}
    }
  },
  methods: {
    getArcitleCon () {
      const vm = this
      vm.$emit('load', true)
      let formData = JSON.stringify({ 'Aid': vm.Aid })
      let api = `https://script.google.com/macros/s/AKfycbzB5-0GjOcnWU-s0f6eSk1-bIGBn23L8PJL-2dDNDJzoum6YHG2y-J06eq56B7bvvYR/exec`
      vm.$http.post(api, formData).then(response => {
        vm.article = response.data.data
        vm.$emit('load', false)
      })
    },
    goback () {
      this.$router.push('/')
    }
  },
  created () {
    this.Aid = this.$route.params.id
    this.getArcitleCon()
  }
}
</script>

<style lang="scss" scoped>
.articleCon{
  max-width:900px;
  margin:0 auto;
  .articlePage{
    background:#fff;
    box-sizing:border-box;
    padding:30px 50px;
    background:#fff;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    .head{
    }
    .content{
      line-height:2;
    }
  }
  .message{
    box-sizing:border-box;
    padding:50px 50px 30px 50px;
    background:#f5f5f5;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    p{
      margin-bottom:0;
    }
    &>div{
      padding:20px 0;
      border-top:1px solid #e9e9e9;
      &:last-Child{
        border-bottom:1px solid #e9e9e9;
      }
      margin-bottom:10px;
    }
    .avatar{
      margin-right:15px;
      div{
        width:50px;
        height:50px;
        border-radius:99em;
      }
      .boy{
        background:#81d4fa;
      }
      .girl{
        background:#f48fb1;
      }
    }
    .mainReply{
      margin-bottom:20px;
    }
    .mainReply,.reply{
      display:flex;
    }
    .reply{
      padding:10px 0;
      margin-bottom:10px;
      margin-left:60px;
      em{
        font-style:normal;
      }
      &:last-Child{
        margin-bottom:0;
      }
    }
    .name{
      font-size:14px;
      line-height:1;
      margin-bottom:5px;
    }
    .content{
      font-size:16px;
      color:#565656;
    }
    .time{
      font-size:14px;
      margin-top:10px;
      span{
        &::after{
          content: "・";
        }
      }
    }
  }
}
</style>
