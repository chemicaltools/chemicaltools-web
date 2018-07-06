// ChemicalTools JavaScript

var ChemicalTools=new Object({
	searchelement:function(input) {
		var i = elementinfo.length
		while (i--) {
		  if (elementinfo[i].name == input || elementinfo[i].number == input || elementinfo[i].symbol.toLowerCase() == String(input).toLowerCase() || elementinfo[i].iupac.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin.toLowerCase() == String(input).toLowerCase() || elementinfo[i].pinyin == pinyin(String(input)).toLowerCase()) {
			return elementinfo[i]
		  }
		}
	  },
  calAsc: function (x) {
    var c = x.substr(0, 1)
    var n = c.charCodeAt()
    if (n > 64 & n < 91)
      return 1
    else if (n > 96 & n < 123)
      return 2
    else if (n > 47 & n < 58)
      return 3
    else if (n == 40 | n == 91 | n == -23640)
      return 4
    else if (n == 41 | n == 93 | n == -23639)
      return 5
    else
      return 0
  },
  ElementChoose: function (x) {
    var i = elementinfo.length
    while (i--) {
      if (elementinfo[i].symbol == x) {
        return i
      }
    }
    return -1
  },
  calculateMass: function (x) {
    var that = this
    var output
    var l = x.length
    var i = 0
    var s = 0
    var m = 0
    var massPer = new Array()
    var y1 = ""
    var y2 = ""
    var y3 = ""
    var y4 = ""
    var T = ""
    var AtomNumber = new Int8Array(118)
    var MulNumber = new Array()
    var MulIf = new Array()
    var MulLeft = new Array()
    var MulRight = new Array()
    var MulNum = new Array()
    var n, i2, i3, c
    if (l > 0) {
      while (i < l) {
        i++
        MulNumber[i] = 1
        y1 = x.substr(i - 1, 1)
        if (that.calAsc(y1) == 4)
          MulIf[i] = 1
        else if (that.calAsc(y1) == 5)
          MulIf[i] = -1
        else
          MulIf[i] = 0
        s = s + MulIf[i]
      }
      if (s == 0) {
        i = 1
        var n = 0
        while (i < l) {
          if (MulIf[i] == 1) {
            n++
            var c = 1
            var i2 = i + 1
            MulLeft[n] = i
            while (c > 0) {
              c = c + MulIf[i2]
              i2++
            }
            i2 = i2 - 1
            MulRight[n] = i2
            if (i2 + 1 > l)
              y3 = "a"
            else
              y3 = x.substr(i2, 1)
            if (that.calAsc(y3) == 3) {
              if (i2 + 2 > l)
                y4 = "a"
              else
                y4 = x.substr(i2 + 1, 1)
              if (that.calAsc(y4) == 3)
                MulNum[n] = parseInt(y3 + y4)
              else
                MulNum[n] = parseInt(y3)
            } else {
              MulNum[n] = 1
            }
          }
          i++
        }
        i = 0
        while (i < n) {
          i++
          for (var i2 = MulLeft[i]; i2 <= MulRight[i]; i2++)
            MulNumber[i2] = MulNumber[i2] * MulNum[i]
        }
        i = 0
        while (i < l) {
          i++
          y1 = x.substr(i - 1, 1)
          if (that.calAsc(y1) == 1) {
            if (i >= l)
              y2 = "1"
            else
              y2 = x.substr(i, 1)
            if (that.calAsc(y2) == 2) {
              T = y1 + y2
              n = that.ElementChoose(T)
              if (n >= 0) {
                if (i + 1 >= l)
                  y3 = "1"
                else
                  y3 = x.substr(i + 1, 1)
                if (that.calAsc(y3) == 3) {
                  if (i + 2 >= l)
                    y4 = "a"
                  else
                    y4 = x.substr(i + 2, 1)
                  if (that.calAsc(y4) == 3) {
                    AtomNumber[n] = AtomNumber[n] + parseInt(y3 + y4) * MulNumber[i]
                    i = i + 3
                  } else {
                    AtomNumber[n] = AtomNumber[n] + parseInt(y3) * MulNumber[i]
                    i = i + 2
                  }
                } else {
                  AtomNumber[n] = AtomNumber[n] + MulNumber[i]
                  i++
                }
              }
            } else if (that.calAsc(y2) == 3) {
              n = that.ElementChoose(y1)
              if (n >= 0) {
                if (i + 1 >= l)
                  y3 = "a"
                else
                  y3 = x.substr(i + 1, 1)
                if (that.calAsc(y3) == 3) {
                  AtomNumber[n] = AtomNumber[n] + parseInt(y2 + y3) * MulNumber[i]
                  i = i + 2
                } else {
                  AtomNumber[n] = AtomNumber[n] + parseInt(y2) * MulNumber[i]
                }
              }
            } else {
              n = that.ElementChoose(y1)
              if (n >= 0)
                AtomNumber[n] = AtomNumber[n] + MulNumber[i]
            }
          } else if (that.calAsc(y1) == 4) {
          } else if (that.calAsc(y1) == 5) {
            if (i >= l)
              y2 = "a"
            else
              y2 = x.substr(i, 1)
            if (that.calAsc(y2) == 3) {
              if (i + 1 >= l)
                y2 = "a"
              else
                y3 = x.substr(i + 1, 1)
              if (that.calAsc(y3) == 3) i++
              i++
            }
          }
        }
        for (i = 0; i < 118; i++) {
          if (AtomNumber[i] > 0) {
            m = m + AtomNumber[i] * parseFloat(elementinfo[i].mass)
          }
        }
      }
    }
    if (m > 0) {
      var xHtml = ""
      for (var i3 = 0; i3 < l; i3++) {
        if (x.substr(i3, 1).charCodeAt() >= 48 && x.substr(i3, 1).charCodeAt() <= 57) {
          xHtml = xHtml + "<sub>" + x.substr(i3, 1) + "</sub>"
        } else {
          xHtml = xHtml + x.substr(i3, 1)
        }
      }
      output = "<b>"+xHtml + "</b><br><b>"+(tran.getLang()==='cn'?"相对分子质量":"Mass")+"</b>=" + m.toFixed(2)
      for (i = 0; i < 118; i++) {
        if (AtomNumber[i] > 0) {
          massPer[i] = parseFloat(AtomNumber[i]) * (parseFloat(elementinfo[i].mass)) / parseFloat(m) * 100
          output = output + "<br><b>" + (tran.getLang()==='cn'?elementinfo[i].name:elementinfo[i].iupac) + "</b>"+(tran.getLang()==='cn'?"（符号：" :" (Symbol: ")+ elementinfo[i].symbol + (tran.getLang()==='cn'?"），":"): ")+ AtomNumber[i] + (tran.getLang()==='cn'?"个原子，原子量为":" atoms whose mass is ") + parseFloat(elementinfo[i].mass).toFixed(2) + (tran.getLang()==='cn'?"，质量分数为":", mass fraction: ") + massPer[i].toFixed(2) + "%"+(tran.getLang()==='cn'?"；":";")
        }
      }
      output = output.substring(0, output.length - 1) + (tran.getLang()==='cn'?"。":".")
    } else {
      output = tran.getLang()==='cn'?"输入出错！":"Wrong input."
    }
    return output
  },
	outputelement:function(input){ 
		var info=this.searchelement(input)
		var outputinfo=tran.getLang()==='cn'?{"元素名称":info.name,"元素符号":info.symbol,"IUPAC名":info.iupac,"原子序数":info.number,"相对原子质量":info.mass,"元素名称含义":info.origin}:{"Symbol":info.symbol,"IUPAC name":info.iupac,"Atomic number":info.number,"Mass":info.mass,"Origin of the name":info.origin}
		var output="<table><tr style='text-align:center;'><td colspan=2><b>"+(tran.getLang()==='cn'?"元素信息":"Element Information")+"</b></td><td rowspan=6><img src='"+info.url+"'></td></tr>"
		for(var x in outputinfo){
			output+="<tr><td><b>"+x+"</b></td><td>"+outputinfo[x]+"</td></tr>"
		}
		output+="<tr style='text-align:center;'><td colspan=3>"+(tran.getLang()==='cn'?"<a href='https://zh.wikipedia.org/wiki/"+info.name+"'>中文维基百科</a> · <a href='https://en.wikipedia.org/wiki/"+info.iupac+"'>英文维基百科</a>":"<a href='https://en.wikipedia.org/wiki/"+info.iupac+"'>Visit Wikipedia</a>")+"</tr></td>"
		output+="</table>"
		return output
	},
	makeelementtable:function(){
		var n=0
		var output="<table style='text-align:center;'>"
		for(var i=0;i<=9;i++){
			output+="<tr>";
			for(var j=0;j<=18;j++){
				if((i==1&&j>=2&&j<=17)||((i==2||i==3)&&j>=3&&j<=12)||((i==8||i==9)&&j>15)){
					if(i==1&&j==2){
						output+="<td colspan=16></td>"
					}else if((i==2||i==3)&&j==3){
						output+="<td colspan=10></td>"
					}
				}else{
					output+="<td style='border:1px solid;border-collapse:collapse'>"
					if(i==0&&j>0){
						output+=j;
					}else if(i>0&&j==0){
						if(i<8){
							output+=i;
						}else if(i==8){
							output+=tran.getLang()==='cn'?"镧系":"Lanthanide"
						}else if(i==9){
							output+=tran.getLang()==='cn'?"锕系":"Actinide"
						}
					}else if(i>0){
						if(i==6&&j==4){
							n=71
						}else if(i==7&&j==4){
							n=103
						}else if(i==8&&j==1){
							n=56
						}else if(i==9&&j==1){
							n=88
						}
						output+="<a href=\"javascript:$('#elementoutput').html(ChemicalTools.outputelement('"+elementinfo[n].number+"'))\"><sub>"+elementinfo[n].number+"</sub>"+elementinfo[n].symbol+"<br>"+(tran.getLang()==='cn'?elementinfo[n].name:elementinfo[n].iupac)+"<br><small>"+elementinfo[n].mass+"</small></a>";
						n+=1

					}
					output+="</td>"
				}
			}
		output+="</tr>"
		}
		output+="</table>"
		return output
	},
	sciconut: function (value, num) {
		var p = Math.floor(Math.log(value) / Math.LN10)
		var n = value * Math.pow(10, -p)
		if (n == 0) {
		  return n.toFixed(num)
		} else {
		  return n.toFixed(num) + "×10<sup>" + p + "</sup>"
		}
	},
	calculateDeviation: function (input) {
		var that=this
		if (x = "") return (tran.getLang()==='cn'?"请输入数据！":"Plese input data!")
		var x = input.split("\n")
		var t = x.length
		if (t == 1) {
		  x = input.split(" ")
		  t = x.count
		}
		var sum = 0
		if (t > 1) {
		  for (var i = 0; i < t; i++) {
			x[i] = x[i].replace(/\s+/g, "")
			sum = sum + parseFloat(x[i])
			var len = x[i].length
			if (x[i].substr(0, 1) == "-") len = len - 1
			if (x[i].indexOf(".")>=0) {
			  len = len - 1
			  var pointlen = len - x[i].indexOf(".")
			  if (Math.abs(parseFloat(x[i])) < 1) {
				var zeronum = Math.floor(Math.log((Math.abs(parseFloat(x[i])))) / Math.LN10)
				len = len + zeronum
			  }
			} else {
			  var pointlen = 0
			}
			if (i > 0) {
			  if (len < numnum) numnum = len
			  if (pointlen < pointnum) pointnum = pointlen
			} else {
			  var numnum = len
			  var pointnum = pointlen
			}
		  }
		  var average = sum / t
		  var abssum = 0
		  var squrasum = 0
		  for (i = 0; i < t; i++) {
			var xabs = Math.abs(parseFloat(x[i]) - average)
			var xsqure = Math.pow(parseFloat(x[i]) - average, 2)
			var abssum = abssum + xabs
			var squresum = squrasum + xsqure
		  }
		  var deviation = abssum / t
		  var deviation_relatibe = deviation / average * 1000
		  var s = Math.sqrt(squresum / (t - 1))
		  var s_relatibe = s / deviation * 1000
		  var outputinfo=[
			  { name: (tran.getLang()==='cn'?"您输入的数据":"Input data:"), value: x.join("，") },
			  { name: (tran.getLang()==='cn'?"平均数":"Average"), value: average.toFixed(pointnum) },
			  { name: (tran.getLang()==='cn'?"平均偏差":"Average deviation"), value: deviation.toFixed(pointnum) },
			  { name: (tran.getLang()==='cn'?"相对平均偏差":"Relative average deviation"), value: this.sciconut(deviation_relatibe, numnum -1 ) },
			  { name: (tran.getLang()==='cn'?"标准偏差":"Standard deviation"), value: this.sciconut(s, numnum -1 ) },
			  { name: (tran.getLang()==='cn'?"相对标准偏差":"Relative standard deviation"), value: this.sciconut(s_relatibe, numnum -1 ) + "‰" },
			]
			var output="<table>"
			for(var x in outputinfo){
				output+="<tr><td><b>"+outputinfo[x].name+"</b></td><td>"+outputinfo[x].value+"</td></tr>"
			}
			output+="</table>"
			return output
		} else {
		  return (tran.getLang()==='cn'?"请输入多个数据。":"Please input multiple data.")
		}
	},
 calpH: function (pKa, c, pKw) {
    var Ka1 = Math.pow(10, -pKa[0])
    var Kw = Math.pow(10, -pKw)
    var cH = (Math.sqrt(Ka1 * Ka1 + 4 * Ka1 * c + Kw) - Ka1) * 0.5
    if (cH > 0) return -Math.log(cH) / Math.LN10
    else return 1024
  },
  calpHtoc: function (pKa, c, pH) {
    var D = 0
    var E = 1
    var G = new Array()
    var Ka = new Array()
    var pHtoc = new Array()
    var H = Math.pow(10, -pH)
    var F = Math.pow(H, pKa.length + 1)
    for (var i = 0; i < pKa.length; i++) {
      Ka[i] = Math.pow(10, -pKa[i])
    }
    for (var i = 0; i < pKa.length + 1; i++) {
      G[i] = F * E
      D = D + G[i]
      F = F / H
      E = E * Ka[i]
    }
    for (var i = 0; i < pKa.length + 1; i++) {
      pHtoc[i] = c * G[i] / D
    }
    return pHtoc
  },
  calacid: function (c, strpKa, AorB, pKw = 14, acidName = "HA") {
    const liquidpKa = -1.74
    if (!strpKa||!c) return (tran.getLang()==='cn'?"请输入数据！":"Please input data!")
    if (AorB) {
      var ABname = "A"
      var ABnameall = "HA"
    } else {
      var ABname = "B"
      var ABnameall = "BOH"
    }
    var strpKaArray = strpKa.split(" ")
    var valpKa = new Array()
    for (var i = 0; i < strpKaArray.length; i++) {
      valpKa[i] = parseFloat(strpKaArray[i])
      if (valpKa[i] < liquidpKa) valpKa[i] = liquidpKa
    }
    var pH = this.calpH(valpKa, c, pKw)
    var cAB = this.calpHtoc(valpKa, c, pH)
    if (!AorB) pH = pKw - pH
    var H = Math.pow(10, -pH)
    var acidOutput = " ,c=" + c + "mol/L, "
    for (var i = 0; i < valpKa.length; i++) {
      if (AorB) acidOutput = acidOutput + "pK<sub>a</sub>"
      else acidOutput = acidOutput + "pK<sub>b</sub>"
      if (valpKa.length > 1) acidOutput = acidOutput + "<sub>" + (i + 1) + "</sub>"
      acidOutput = acidOutput + "=" + strpKaArray[i] + ", "
    }
    acidOutput = acidOutput + "<br>"+(tran.getLang()==='cn'?"溶液的pH为":"pH is ") + pH.toFixed(2) + "."
    acidOutput = acidOutput + "<br>" + "c(H<sup>+</sup>)=" + this.sciconut(H, 2) + "mol/L,"
    for (var i = 0; i < cAB.length; i++) {
      var cABoutput = "c("
      if (AorB) {
        if (i < cAB.length - 1) {
          cABoutput = cABoutput + "H"
          if (cAB.length - i > 2) cABoutput = cABoutput + "<sub>" + (cAB.length - i - 1) + "</sub>"
        }
        cABoutput = cABoutput + ABname
        if (i > 0) {
          if (i > 1) cABoutput = cABoutput + "<sup>" + (i) + "</sup>"
          cABoutput = cABoutput + "<sup>-</sup>"
        }
      } else {
        cABoutput = cABoutput + ABname
        if (cAB.length - i > 2) {
          cABoutput = cABoutput + "(OH)<sub>" + (cAB.length - i - 1) + "</sub>"
        } else if (cAB.length - i == 2) {
          cABoutput = cABoutput + "OH"
        }
        if (i > 0) {
          if (i > 1) cABoutput = cABoutput + "<sup>" + (i) + "</sup>"
          cABoutput = cABoutput + "<sup>+</sup>"
        }
      }
      cABoutput = cABoutput + ")="
      acidOutput = acidOutput + "<br>" + cABoutput + this.sciconut(cAB[i], 2) + "mol/L,"
    }
    acidOutput = acidOutput.substring(0, acidOutput.length - 1) + "."
    var acidOutputhtml = "<b>"+ABnameall +"</b>"+ acidOutput
    return acidOutputhtml
  },
  getgas: function (mode,p,V,n,T,R=8.314) {
    if (mode == "p") {
      p = (n * R * T / V).toFixed(3)
    } else if (mode == "V") {
      V = (n * R * T / p).toFixed(3)
    } else if (mode == "n") {
      n = (p * V / R / T).toFixed(3)
    } else if (mode == "T") {
      T = (p * V / n / R).toFixed(3)
    }
	return {mode:mode,p:p,V:V,n:n,T:T}
  },
  searchforkind: function (kind, x) {
    var i = elementinfo.length
    switch (kind) {
      case "ElementName":
        while (i--) {
          if (elementinfo[i].name == x) {
            return i
          }
        }
        break;
      case "ElementAbbr":
        while (i--) {
          if (elementinfo[i].symbol == x) {
            return i
          }
        }
        break;
      case "ElementNumber":
        while (i--) {
          if (elementinfo[i].number == x) {
            return i
          }
        }
        break;
      case "ElementIUPACname":
        while (i--) {
          if (elementinfo[i].iupac == x) {
            return i
          }
        }
        break;
    }
    return -1
  },
  correctanswer: function (question, answer, mode = 2) {
    var i, correct_answer
    var page = this
    switch (mode) {
      case 0: case 1: case 2:
        i = this.searchforkind("ElementName", question)
        break;
      case 3: case 4: case 5:
        i = this.searchforkind("ElementAbbr", question)
        break;
      case 6: case 7: case 8:
        i = this.searchforkind("ElementNumber", question)
        break;
      case 9: case 10: case 11:
        i = this.searchforkind("ElementIUPACname", question)
        break;
    }
    switch (mode) {
      case 3: case 6: case 9:
        correct_answer = elementinfo[i].name
        break;
      case 0: case 7: case 10:
        correct_answer = elementinfo[i].symbol
        break;
      case 1: case 4: case 11:
        correct_answer = elementinfo[i].number
        break;
      case 2: case 5: case 8:
        correct_answer = elementinfo[i].iupac
        break;
    }
    if (correct_answer == answer) {
		correct=parseInt(window.localStorage.getItem("correct"))
		correct=correct?correct+1:1
		window.localStorage.setItem("correct",correct)
		updatescore()
      return (tran.getLang()==='cn'?"回答正确！":"Answer correctly!")
    } else {
		incorrect=parseInt(window.localStorage.getItem("incorrect"))
		incorrect=incorrect?incorrect+1:1
		window.localStorage.setItem("incorrect",incorrect)
		updatescore()
      return (tran.getLang()==='cn'?"回答错误，正确答案为：" + correct_answer + "，题目为：" + question + "，您的答案为：" + answer:"The answer is wrong. The correct answer is "+ correct_answer +" and the question is "+question+", but your answer is "+answer+".")
    }
  },
  makequestion: function (mode = 2, max = 86) {
    var n = this.rand(0, max)
    var Question
    switch (mode) {
      case 0: case 1: case 2:
        Question = elementinfo[n].name
        break;
      case 3: case 4: case 5:
        Question = elementinfo[n].symbol
        break;
      case 6: case 7: case 8:
        Question = elementinfo[n].number
        break;
      case 9: case 10: case 11:
        Question = elementinfo[n].iupac
        break;
    }
    var output = [Question]
    var numbers = new Array();
    numbers.push(n)
    for (var i2 = 1; i2 < 4; i2++) {
      numbers.push(this.rand(0, max))
      for (var i3 = 0; i3 < i2; i3++) {
        while (numbers[i2] == numbers[i3]) numbers[i2] = this.rand(0, max)
      }
    }
    for (var i = 0, k = numbers.length; i < k; i++) {
      for (var j = i + 1; j < k; j++) {
        if (numbers[i] < numbers[j]) {
          var temp = numbers[j]
          numbers[j] = numbers[i]
          numbers[i] = temp
        }
      }
    }
    var option
    for (var i2 = 0; i2 < 4; i2++) {
      switch (mode) {
        case 3: case 6: case 9:
          option = elementinfo[numbers[i2]].name
          break
        case 0: case 7: case 10:
          option = elementinfo[numbers[i2]].symbol
          break
        case 1: case 4: case 11:
          option = elementinfo[numbers[i2]].number
          break
        case 2: case 5: case 8:
          option = elementinfo[numbers[i2]].iupac
          break
      }
      output.push(option)
    }
    return output
  },
  rand: function (start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  },
  showquestion:function(){
	mode=parseInt(window.localStorage.getItem("mode"))
	if(!mode){mode=2}
	max=parseInt(window.localStorage.getItem("max"))
	if(!max){max=86}
	var questiondata=this.makequestion(mode=mode,max=max)
	for(i in questiondata){
		if(i==0){
			var output=(tran.getLang()==='cn'?"<h3>题目："+questiondata[i]+"</h3><ul class='question'>":"<h3>Question: "+questiondata[i]+"</h3><ul class='question'>")
		}else{
			output+="<li><a href=\"javascript:ChemicalTools.answer('"+questiondata[0]+"','"+questiondata[i]+"',mode="+mode+")\">"+questiondata[i]+"</a></li>"
		}
	}
	output+="</ul>"
	$("#examquestion").html(output)
  },
  answer:function(question,answer,mode=2){
	 $("#examoutput").html(this.correctanswer(question,answer,mode))
	 this.showquestion()
  }
});

function showpage(hash){
	pages=["#indexpage","#elementpage","#masspage","#acidpage","#gaspage","#exampage","#deviationpage","#aboutpage","#userpage","#loginpage","signpage"]
	for(var i in pages){
		$(pages[i]).hide()
	}
	
	if(tran.getLang()==='cn') var title=" -- 化学e+"; else var title=" -- Chemical Tools";
	
	if(hash==""||hash=="#"||hash=="#/index/"){
		$("#indexpage").show()
		$("title").html((tran.getLang()==='cn'?"首页":"Home Page")+title)
	}else if(hash=="#/element/"){
		$("#elementpage").show()
		$("title").html((tran.getLang()==='cn'?"元素查询":"Element Search")+title)
	}else if(hash=="#/mass/"){
		$("#masspage").show()
		$("title").html((tran.getLang()==='cn'?"质量计算":"Mass Calculator")+title)
	}else if(hash=="#/acid/"){
		$("#acidpage").show()
		$("title").html((tran.getLang()==='cn'?"酸碱计算":"Acid-base Calculator")+title)
	}else if(hash=="#/gas/"){
		$("#gaspage").show()
		$("title").html((tran.getLang()==='cn'?"气体计算":"Gas Calculator")+title)
	}else if(hash=="#/exam/"){
		$("#exampage").show()
		$("title").html((tran.getLang()==='cn'?"元素记忆":"Element Memory")+title)
	}else if(hash=="#/deviation/"){
		$("#deviationpage").show()
		$("title").html((tran.getLang()==='cn'?"偏差计算":"Deviation Calculator")+title)
	}else if(hash=="#/about/"){
		$("#aboutpage").show()
		$("title").html((tran.getLang()==='cn'?"关于":"About")+title)
	}else if(hash=="#/user/"){
		$("#userpage").show()
		$("title").html((tran.getLang()==='cn'?"个人中心":"User Center")+title)
	}
	
	window.location.hash=hash
}
function frushuserbar(){
	var currentUser = AV.User.current();
	if (currentUser) {
		$("#userbar").html("<li><a href=\"javascript:showpage('#/user/')\">"+(tran.getLang()==='cn'?"欢迎您，":"Welcome, ")+currentUser.getUsername()+"</a></li><li><a href=\"javascript:AV.User.logOut();frushuserbar();\">"+(tran.getLang()==='cn'?"注销":"Sign out")+"</a></li>")
		$("#userusername").html(currentUser.getUsername())
		$("#usernickname").html(currentUser.get("nickName"))
	  }else {
		$("#userbar").html("<li><a href=\"javascript:$('#loginpage').show()\">"+(tran.getLang()==='cn'?"登陆":"Sign in")+"</a></li>");
		$("#userusername").html((tran.getLang()==='cn'?"游客":"Vistor"))
		$("#usernickname").html((tran.getLang()==='cn'?"游客":"Vistor"))
	  }
}
function frushpage(){
	ChemicalTools.showquestion()
	showpage(window.location.hash)
	frushuserbar()
	updatescore()
}
function updatescore(){
	correct=parseInt(window.localStorage.getItem("correct"))
	incorrect=parseInt(window.localStorage.getItem("incorrect"))
	if(!correct)window.localStorage.setItem("correct",0)
	if(!incorrect)window.localStorage.setItem("incorrect",0)
	correct=correct?correct:0
	incorrect=incorrect?incorrect:0
	$("#examscore").html((tran.getLang()==='cn'?"答对"+correct+"题，答错"+incorrect+"题。":"Answer "+correct+" questions correctly and "+incorrect+" questions incorrectly."))
}
$(function(){
	var APP_ID = 'oAhUyuu4qF7DlbNtPlzvFkB7-gzGzoHsz';
	var APP_KEY = 'VBjBASiTnt7xA9bNMC0bSmSX';

	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});
	$("#elementform").submit(function(e) {
		$("#elementoutput").html(ChemicalTools.outputelement($("#elementinput").val()))
		return false
	});
	$("#massform").submit(function(e) {
		$("#massoutput").html(ChemicalTools.calculateMass($("#massinput").val()))
		return false
	});
	$("#deviationform").submit(function(e) {
		$("#deviationoutput").html(ChemicalTools.calculateDeviation($("#deviationinput").val()))
		return false
	});
	$("#acidform").submit(function(e) {
		pkw=parseInt(window.localStorage.getItem("pkw"))
		if(!pkw){pkw=14}
		$("#acidoutput").html(ChemicalTools.calacid($("#acidc").val(),$("#acidpKa").val(),$("#acidAorB").val(),pKw=pkw))
		return false
	});
	$("#gasform").submit(function(e) {
		gasoutput=ChemicalTools.getgas($("input[name='gastype']:checked").val(),$("#p").val(),$("#V").val(),$("#n").val(),$("#T").val());
		switch(gasoutput.mode){
				case "p":
					$("#p").val(gasoutput.p);
					break;
				case "V":
					$("#V").val(gasoutput.V);
					break;
				case "n":
					$("#n").val(gasoutput.n);
					break;
				case "T":
					$("#T").val(gasoutput.T);
					break;
			}
		return false;
	});
	
	$("#loginform").submit(function(e){
		AV.User.logIn($("#loginusername").val(),$("#loginpassword").val()).then(function (loggedInUser) {
			$("#loginpage").hide()
			frushuserbar()
		  }, function (error) {
			 $("#loginoutput").html(error)
		  });
		return false
	});
	$("#signform").submit(function(e){
		 var user = new AV.User();
		  user.setUsername($("#signusername").val());
		  user.setPassword($("#signpassword").val());
		  user.signUp().then(function (loggedInUser) {
			  $("#signpage").hide()
				frushuserbar()
		  }, function (error) {
			  $("#signoutput").html(error)
		  });
  
  
		AV.User.logIn($("#loginusername").val(),$("#loginpassword").val()).then(function (loggedInUser) {
			$("#loginpage").hide()
			frushuserbar()
		  }, function (error) {
			 $("#loginoutput").html(error)
		  });
		return false
	});	
	$("#userform").submit(function(e){
		window.localStorage.setItem("mode",$("#usermode").val())
		window.localStorage.setItem("max",$("#usermax").val())
		window.localStorage.setItem("pkw",$("#userpkw").val())
		return false
	});
	$("#elementtable").html(ChemicalTools.makeelementtable())
	frushpage()
	mode=window.localStorage.getItem("mode")
	max=window.localStorage.getItem("max")
	pkw=window.localStorage.getItem("pkw")
	$("#usermode").val(mode?mode:"2")
	$("#usermax").val(max?max:"86")
	$("#userpkw").val(pkw?pkw:"14")
});
