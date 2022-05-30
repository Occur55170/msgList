# 新聞留言板  [Demo](https://occur55170.github.io/msgList/#/)  

## 這是一份以 Vue.js 為框架的前端練習作品，無任何商業用途


### 畫面展示

#### 文章列表
![新聞留言板 文章列表](https://i.imgur.com/Y6o3fwR.jpg)

#### 文章內頁
![新聞留言板 文章內頁](https://i.imgur.com/osl6XXe.jpg)

#### 登入畫面)
![新聞留言板 會員資料](https://i.imgur.com/ql5hFZ9.jpg)

#### 會員資料
![新聞留言板 登入畫面](https://i.imgur.com/VfY0uqP.jpg)



## 作品簡介

功能包含：
 - 文章列表：列出全部文章，也可以使用搜尋關鍵字&類別的方式找到想搜尋的文章
 - 文章內頁：將完整文章內容呈現給使用者，使用者也可以透過會員功能留言、按讚或者收藏該文章
 - 登入功能：有註冊和登入兩種功能，讓每個使用者可以對自己喜歡的文章留言、按讚or收藏
 - 會員資料：可以查看當初註冊所填寫的資料並修改，也可以查詢自己收藏的文章有哪些
  
## 使用技術

使用Vue前端框架，讓協作開發與日後擴充修改更容易，並提供更平順的瀏覽體驗

* 程式相關
  * Vue CLI 3 : 整合 Vue 生態系的開發環境
  * Vue Component: 將 Web 應用元件化，方便管理、協作
  * Vue Router: 管理前端路由
  * Vuex: 管理網站狀態，跨組件溝通更方便
  * axios: 方便 API 串接
  * ES6: 使用現代主流瀏覽器支援的 JavaScript 語法
  * Google Apps Script: 使用google開發的腳本工具將google sheet用來充當後台資料庫

* 切版相關
  * CSS3: 使用現代主流瀏覽器支援的 CSS 
  * SCSS: 巢嵌 CSS，開發樣式更方便
  * Bootstrap4: 格線系統、顏色管理、元件
  * RWD: 設計不同斷點變化，讓使用者在不同裝置上都可以有好的體驗
  
* 工具相關
  * Github: 控管程式碼版本
  * VSCode: 編譯工具
  
* 其他
  * 使用 vue-router 處理商品分類的網址

## Plugins | 使用插件
* [@fontawesome] | icon 圖示
* [axios] | 方便串接 API
* [bootstrap] | CSS library
* [jquery] | 搭配 BS4
* [popper] | 搭配 BS4
* [vee-validate] | 驗證表單
* [vue] | 前端框架
* [vue-loading-overlay] | 全畫面 loading 狀態
* [vue-router] | 管理 vue 前端路由
* [vuex] | 管理 vue 網站狀態
* [gh-pages] | 將編譯後的程式碼佈署到 gh-pages
* [jQuery] | 處理網站版面的相關功能以及ajax串接


## 環境建構
```
npm install   # 安裝相依套件
npm run serve # 建立開發環境
npm run build # 編譯出能放到生產環境的程式碼
```
