<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" :class="`alert-${item.success}`" v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AlertMSG',
  methods: {
    ...mapActions('AlertMSGModules', ['removeMessage'])
  },
  computed: {
    ...mapGetters('AlertMSGModules', ['messages'])
  }
}
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
  &>div{
    padding:10px;
  }
  .close {
    cursor: pointer;
    margin-left:20px;
    text-decoration:none;
    background:transparent;
    border:0;
    position:relative;
    top:0;
    right:0;
  }
}
</style>
