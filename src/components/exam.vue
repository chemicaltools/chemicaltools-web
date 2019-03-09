<template>
  <v-container>
    <h2>
      <strong>{{$t("message.question")}}:</strong>
      {{question}}
    </h2>
    <v-list>
      <v-list-tile
        v-for="(option, i) in options"
        :key="i"
        @click="answer(question, option, mode=mode)"
      >
        <v-list-tile-action v-text="i+1"></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="option"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div>{{result}}</div>
    <div>{{score}}</div>
  </v-container>
</template>
<script>
const chemicaltools = require("chemicaltools");
const format = require("string-format");
format.extend(String.prototype, {});
export default {
  data: () => ({
    mode: 2,
    options: [],
    question: "",
    result: "",
    score: ""
  }),
  mounted: function() {
    this.showquestion();
    this.updatescore();
  },
  methods: {
    questionname: function(mode) {
      switch (mode) {
        case 0:
        case 1:
        case 2:
          return "name";
        case 3:
        case 4:
        case 5:
          return "symbol";
        case 6:
        case 7:
        case 8:
          return "number";
        case 9:
        case 10:
        case 11:
          return "iupac";
      }
    },
    answername: function(mode) {
      switch (mode) {
        case 3:
        case 6:
        case 9:
          return "name";
        case 0:
        case 7:
        case 10:
          return "symbol";
        case 1:
        case 4:
        case 11:
          return "number";
        case 2:
        case 5:
        case 8:
          return "iupac";
      }
    },
    correctanswer: function(question, answer, mode = 2) {
      var result = chemicaltools.correctAnswer(
        question,
        answer,
        this.questionname(mode),
        this.answername(mode)
      );
      var n = result.correct ? "correct" : "incorrect";
      var num = this.$storage.get(n, 0) + 1;
      this.$storage.set(n, num);
      this.updatescore();
      return result.correct
        ? "Answer correctly!"
        : "The answer is wrong. The correct answer is {0} and the question is {1}, but your answer is {2}.".format(
            result.correct_answer,
            question,
            answer
          );
    },
    showquestion: function() {
      var mode = parseInt(this.$storage.get("mode", 2));
      var max = parseInt(this.$storage.get("max", 86));
      var questiondata = chemicaltools.makeQuestion(
        this.questionname(mode),
        this.answername(mode),
        (max = max)
      );
      this.mode = mode;
      this.question = questiondata.question;
      this.options = questiondata.options;
    },
    answer: function(question, answer, mode = 2) {
      this.result = this.correctanswer(question, answer, mode);
      this.showquestion();
    },
    updatescore: function() {
      var that = this;
      var value = {};
      var keys = ["correct", "incorrect"];
      keys.forEach(function(key) {
        var num = parseInt(that.$storage.get(key, 0));
        if (!num) that.$storage.set(key, 0);
        value[key] = num ? num : 0;
      });
      this.score = "Answer {0} questions correctly and {1} questions incorrectly.".format(
        value.correct,
        value.incorrect
      );
    }
  }
};
</script>
