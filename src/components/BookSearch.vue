<template>
  <div id="search">
    <!-- 検索フォームを定義 -->
    <el-form :inline="true">
      <el-form-item label="キーワード">
        <el-input
          type="text"
          @keyup.enter="onclick"
          size="large"
          v-model="keyword"
          placeholder="書籍名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onclick">検索</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <!-- マッチした書籍情報をリスト表示 -->
    <BookInfo
      v-for="(book, i) of books"
      :linkable="true"
      :book="book"
      :index="i + 1"
      :key="book.id"
    ></BookInfo>
  </div>
</template>

<script>
import BookInfo from "@/components/BookInfo.vue";
export default {
  name: "book-search",
  // ローカルコンポーネントを登録
  components: {
    BookInfo,
  },
  data() {
    return {
      keyword: "", //検索キーワード
      books: [], //検索結果
    };
  },
  methods: {
    // [検索]ボタンで書籍情報を検索
    onclick: function () {
      console.log("実行されました");
      this.$http(
        "https://www.googleapis.com/books/v1/volumes?q=" + this.keyword
      )
        // 応答データをJSONデータとして取得
        .then((response) => {
          return response.json();
        })
        // JSON文字列の内容をbooksプロパティ（配列）に詰め替え
        .then((data) => {
          this.books = [];
          console.log(data);
          for (let book of data.items) {
            let authors = book.volumeInfo.authors;
            let price = book.saleInfo.listPrice;
            let img = book.volumeInfo.imageLinks;

            this.books.push({
              id: book.id, // id
              title: book.volumeInfo.title,
              author: authors ? authors.join(",") : "",
              price: price ? price.amount : "-",
              publisher: book.volumeInfo.publisher,
              published: book.volumeInfo.publishedDate,
              image: img ? img.smallThumbnail : "",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
#search form {
  margin-top: 15px;
}
</style>>
