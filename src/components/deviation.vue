<template>
  <v-container>
    <v-textarea
      name="input"
      :label="$t('message.data')"
      :hint="$t('message.dataline')"
      v-model="input"
    ></v-textarea>
    <v-btn color="success" v-on:click="calculateDeviation(input)">{{$t("message.calculate")}}</v-btn>
    <v-row wrap>
      <v-flex>
        <div class="pt-3" v-html="$t(output)"></div>
        <v-data-table
          :items="results"
          v-show="results"
          sort-by
          hide-default-footer
          hide-default-header
        >
          <template v-slot:item="result">
            <tr>
              <td>{{ $t(result.item.name) }}</td>
              <td class="text-xs-right" v-html="result.item.value"></td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-row>
  </v-container>
</template>
<script>
import { scicount } from '../chem.js'
const chemicaltools = require('chemicaltools')
const format = require('string-format')
format.extend(String.prototype, {})

export default {
  data: () => ({
    output: 'message.inputdata',
    results: [],
    input: ''
  }),
  methods: {
    calculateDeviation: function (input) {
      if (!input) {
        this.output = 'message.inputdata'
        return
      }
      const x = input.split(/[\r\n\\s ,;]+/)
      let numnum = Infinity
      let pointnum = Infinity
      if (x.length > 1) {
        x.forEach(function (xi) {
          let len = xi.length
          let pointlen = 0
          if (xi.substr(0, 1) === '-') len--
          if (xi.indexOf('.') >= 0) {
            len--
            pointlen = len - xi.indexOf('.')
            if (Math.abs(parseFloat(xi)) < 1) {
              const zeronum = Math.floor(
                Math.log(Math.abs(parseFloat(xi))) / Math.LN10
              )
              len += zeronum
            }
          }
          numnum = Math.min(numnum, len)
          pointnum = Math.min(pointnum, pointlen)
        })
        numnum -= 1
        const result = chemicaltools.calculateDeviation(x.map(parseFloat))
        const outputinfo = [
          { name: 'deviation.input', value: x.join(', ') },
          {
            name: 'deviation.average',
            value: result.average.toFixed(pointnum)
          },
          {
            name: 'deviation.ad',
            value: result.average_deviation.toFixed(pointnum)
          },
          {
            name: 'deviation.rad',
            value:
              scicount(result.relative_average_deviation * 1000, numnum) + '‰'
          },
          {
            name: 'deviation.sd',
            value: scicount(result.standard_deviation, numnum)
          },
          {
            name: 'deviation.rsd',
            value:
              scicount(result.relative_standard_deviation * 1000, numnum) + '‰'
          }
        ]
        this.results = outputinfo
        this.output = ''
      } else {
        this.results = []
        this.output = 'message.multpledata'
      }
    }
  }
}
</script>
