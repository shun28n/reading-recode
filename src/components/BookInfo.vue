<template>
  <div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image"><img :src="book.image" /></div>
    <div class="details"></div>
    <ul>
      <li v-if="index">{{ index }}</li>
      <li>{{ book.title }} ({{ book.price }}円)</li>
      <li>{{ book.author }} 著</li>
      <li>{{ book.publisher }} /刊</li>
      <li>{{ book.publiched }} /発売</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { UPDATE_CURRENT } from "@/mutation_types";
export default {
  name: "book-info",
  props: {
    index: { type: Number },
    linkable: { type: Boolean, default: false },
    book: { type: Object },
  },
  methods: {
    // UPDATE_CURREMTアクションを同名のメソッドに紐付け
    ...mapActions([UPDATE_CURRENT]),
    // クリック時に現在の書籍情報をステートに保存＆フォームに移動
    onclick() {
      console.log(this.book);
      if (this.linkable) {
        this[UPDATE_CURRENT](this.book);
        this.$router.push("/form");
      }
    },
  },
};
</script>

<style scoped>
.linkable:hover {
  cursor: ponter;
  background-color: #ff9;
}
ul {
  list-style-type: none;
}
</style>