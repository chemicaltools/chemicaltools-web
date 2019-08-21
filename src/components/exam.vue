<template>
  <v-container>
    <h2>
      <strong>{{$t("message.question")}}:</strong>
      {{question}}
    </h2>
    <v-list>
      <v-list-item
        v-for="(option, i) in options"
        :key="i"
        @click="answer(question, option, mode=mode)"
      >
        <v-list-item-action v-text="i+1"></v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="option"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div>{{$t(result, {question:oldquestion, answer:oldanswer, correctanswer:correct_answer})}}</div>
    <div>{{$t("message.score",{correct:correct, incorrect:incorrect})}}</div>
  </v-container>
</template>
<script>
const chemicaltools = require('chemicaltools')
const format = require('string-format')
format.extend(String.prototype, {})
export default {
  data: () => ({
    mode: 2,
    options: [],
    question: '',
    result: '',
    oldquestion: '',
    oldanswer: '',
    correct_answer: '',
    correct: 0,
    incorrect: 0
  }),
  mounted: function () {
    this.showquestion()
    this.updatescore()
  },
  methods: {
    questionname: function (mode) {
      switch (mode) {
        case 0:
        case 1:
        case 2:
          return 'name'
        case 3:
        case 4:
        case 5:
          return 'symbol'
        case 6:
        case 7:
        case 8:
          return 'number'
        case 9:
        case 10:
        case 11:
          return 'iupac'
      }
    },
    answername: function (mode) {
      switch (mode) {
        case 3:
        case 6:
        case 9:
          return 'name'
        case 0:
        case 7:
        case 10:
          return 'symbol'
        case 1:
        case 4:
        case 11:
          return 'number'
        case 2:
        case 5:
        case 8:
          return 'iupac'
      }
    },
    correctanswer: function (question, answer, mode = 2) {
      var result = chemicaltools.correctAnswer(
        question,
        answer,
        this.questionname(mode),
        this.answername(mode)
      )
      var n = result.correct ? 'correct' : 'incorrect'
      var num = this.$storage.get(n, 0) + 1
      this.$storage.set(n, num)
      this.updatescore()
      this.result = result.correct ? 'message.correct' : 'message.incorrect'
      this.correct_answer = result.correct_answer
      this.oldquestion = question
      this.oldanswer = answer
    },
    showquestion: function () {
      var mode = parseInt(this.$storage.get('mode', 2))
      var max = parseInt(this.$storage.get('max', 86))
      var questiondata = chemicaltools.makeQuestion(
        this.questionname(mode),
        this.answername(mode),
        max
      )
      this.mode = mode
      this.question = questiondata.question
      this.options = questiondata.options
    },
    answer: function (question, answer, mode = 2) {
      this.correctanswer(question, answer, mode)
      this.showquestion()
    },
    updatescore: function () {
      var that = this
      var keys = ['correct', 'incorrect']
      keys.forEach(function (key) {
        var num = parseInt(that.$storage.get(key, 0))
        if (!num) that.$storage.set(key, 0)
        that[key] = num || 0
      })
    }
  }
}
</script>
