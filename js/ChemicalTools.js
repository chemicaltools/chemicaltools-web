// ChemicalTools JavaScript

var ChemicalTools = new Object({
  calculateMass: function (x) {
    var result = chemicaltools.calculateMass(x)
    if (result) {
      var output = "<b>" + this.chemicalname(result.name) + "</b><br><b>" + (tran.getLang() === 'cn' ? "相对分子质量" : "Mass") + "</b>=" + result.mass.toFixed(2)
      for (i = 0; i < result.peratom.length; i++) {
        output += "<br><b>" + (tran.getLang() === 'cn' ? result.peratom[i].name : result.peratom[i].iupac) + "</b>" + (tran.getLang() === 'cn' ? "（符号：" : " (Symbol: ") + result.peratom[i].symbol + (tran.getLang() === 'cn' ? "），" : "): ") + result.peratom[i].atomnumber + (tran.getLang() === 'cn' ? "个原子，原子量为" : " atoms whose mass is ") + parseFloat(result.peratom[i].mass).toFixed(2) + (tran.getLang() === 'cn' ? "，质量分数为" : ", mass fraction: ") + result.peratom[i].massper.toFixed(2) + "%" + (tran.getLang() === 'cn' ? "；" : ";")
      }
      output = output.substring(0, output.length - 1) + (tran.getLang() === 'cn' ? "。" : ".")
    } else {
      output = tran.getLang() === 'cn' ? "输入出错！" : "Wrong input."
    }
    return output
  },
  outputelement: function (input) {
    var info = chemicaltools.searchElement(input)
    var outputinfo = tran.getLang() === 'cn' ? { "元素名称": info.name, "元素符号": info.symbol, "IUPAC名": info.iupac, "原子序数": info.number, "相对原子质量": info.mass, "元素名称含义": info.origin } : { "Symbol": info.symbol, "IUPAC name": info.iupac, "Atomic number": info.number, "Mass": info.mass, "Origin of the name": info.origin }
    var output = "<table><tr style='text-align:center;'><td colspan=2><b>" + (tran.getLang() === 'cn' ? "元素信息" : "Element Information") + "</b></td><td rowspan=6><img src='" + info.url + "'></td></tr>"
    for (var x in outputinfo) {
      output += "<tr><td><b>" + x + "</b></td><td>" + outputinfo[x] + "</td></tr>"
    }
    output += "<tr style='text-align:center;'><td colspan=3>" + (tran.getLang() === 'cn' ? "<a href='https://zh.wikipedia.org/wiki/" + info.name + "'>中文维基百科</a> · <a href='https://en.wikipedia.org/wiki/" + info.iupac + "'>英文维基百科</a>" : "<a href='https://en.wikipedia.org/wiki/" + info.iupac + "'>Visit Wikipedia</a>") + "</tr></td>"
    output += "</table>"
    return output
  },
  makeelementtable: function () {
    var n = 0
    var output = "<table style='text-align:center;'>"
    for (var i = 0; i <= 9; i++) {
      output += "<tr>";
      for (var j = 0; j <= 18; j++) {
        if ((i == 1 && j >= 2 && j <= 17) || ((i == 2 || i == 3) && j >= 3 && j <= 12) || ((i == 8 || i == 9) && j > 15)) {
          if (i == 1 && j == 2) {
            output += "<td colspan=16></td>"
          } else if ((i == 2 || i == 3) && j == 3) {
            output += "<td colspan=10></td>"
          }
        } else {
          output += "<td style='border:1px solid;border-collapse:collapse'>"
          if (i == 0 && j > 0) {
            output += j;
          } else if (i > 0 && j == 0) {
            if (i < 8) {
              output += i;
            } else if (i == 8) {
              output += tran.getLang() === 'cn' ? "镧系" : "Lanthanide"
            } else if (i == 9) {
              output += tran.getLang() === 'cn' ? "锕系" : "Actinide"
            }
          } else if (i > 0) {
            if (i == 6 && j == 4) {
              n = 71
            } else if (i == 7 && j == 4) {
              n = 103
            } else if (i == 8 && j == 1) {
              n = 56
            } else if (i == 9 && j == 1) {
              n = 88
            }
            output += "<a href=\"javascript:$('#elementoutput').html(ChemicalTools.outputelement('" + chemicaltools.elementinfo[n].number + "'))\"><sub>" + chemicaltools.elementinfo[n].number + "</sub>" + chemicaltools.elementinfo[n].symbol + "<br>" + (tran.getLang() === 'cn' ? chemicaltools.elementinfo[n].name : chemicaltools.elementinfo[n].iupac) + "<br><small>" + chemicaltools.elementinfo[n].mass + "</small></a>";
            n ++

          }
          output += "</td>"
        }
      }
      output += "</tr>"
    }
    output += "</table>"
    return output
  },
  sciconut: function (value, num) {
    if (value <= 0) return value
    var p = Math.floor(Math.log(value) / Math.LN10)
    var n = value * Math.pow(10, -p)
    if (n == 0) {
      return n.toFixed(num)
    } else {
      return n.toFixed(num) + "×10<sup>" + p + "</sup>"
    }
  },
  calculateDeviation: function (input) {
    if (input == "") return (tran.getLang() === 'cn' ? "请输入数据！" : "Plese input data!")
    var x = input.split("\n")
    var t = x.length
    if (t == 1) {
      x = input.split(" ")
      t = x.length
    }
    if (t > 1) {
      for (var i = 0; i < t; i++) {
        x[i] = x[i].replace(/\s+/g, "")
        var len = x[i].length
        if (x[i].substr(0, 1) == "-") len--
        if (x[i].indexOf(".") >= 0) {
          len--
          var pointlen = len - x[i].indexOf(".")
          if (Math.abs(parseFloat(x[i])) < 1) {
            var zeronum = Math.floor(Math.log((Math.abs(parseFloat(x[i])))) / Math.LN10)
            len += zeronum
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
        x[i] = parseFloat(x[i])
      }
      result = chemicaltools.calculateDeviation(x)
      var outputinfo = [
        { name: (tran.getLang() === 'cn' ? "您输入的数据" : "Input data:"), value: x.join(", ") },
        { name: (tran.getLang() === 'cn' ? "平均数" : "Average"), value: result.average.toFixed(pointnum) },
        { name: (tran.getLang() === 'cn' ? "平均偏差" : "Average deviation"), value: result.average_deviation.toFixed(pointnum) },
        { name: (tran.getLang() === 'cn' ? "相对平均偏差" : "Relative average deviation"), value: this.sciconut(result.relative_average_deviation, numnum - 1) + "‰" },
        { name: (tran.getLang() === 'cn' ? "标准偏差" : "Standard deviation"), value: this.sciconut(result.standard_deviation, numnum - 1) },
        { name: (tran.getLang() === 'cn' ? "相对标准偏差" : "Relative standard deviation"), value: this.sciconut(result.relative_standard_deviation, numnum - 1) + "‰" },
      ]
      var output = "<table>"
      for (var x in outputinfo) {
        output += "<tr><td><b>" + outputinfo[x].name + "</b></td><td>" + outputinfo[x].value + "</td></tr>"
      }
      output += "</table>"
      return output
    } else {
      return (tran.getLang() === 'cn' ? "请输入多个数据。" : "Please input multiple data.")
    }
  },
  calacid: function (c, strpKa, AorB, pKw = 14) {
    if (!strpKa || !c) return (tran.getLang() === 'cn' ? "请输入数据！" : "Please input data!")
    var strpKaArray = strpKa.split(" ")
    var valpKa = new Array(strpKaArray.length)
    for (var i = 0; i < strpKaArray.length; i++) {
      valpKa[i] = parseFloat(strpKaArray[i])
    }
    result = chemicaltools.calculateAcid(c, valpKa, AorB, pKw)

    var acidOutput = "<b>" + (AorB ? "HA":"BOH") + "</b>, c=" + c + "mol/L, "
    for (var i = 0; i < valpKa.length; i++) {
      if (AorB) acidOutput = acidOutput + "pK<sub>a</sub>"
      else acidOutput = acidOutput + "pK<sub>b</sub>"
      if (valpKa.length > 1) acidOutput = acidOutput + "<sub>" + (i + 1) + "</sub>"
      acidOutput += "=" + strpKaArray[i] + ", "
    }
    acidOutput += "<br>" + (tran.getLang() === 'cn' ? "溶液的pH为" : "pH is ") + result.pH.toFixed(2) + "."
    for (var i = 0; i < result.ion.length; i++) {
      acidOutput += "<br>c(" + this.chemicalname(result.ion[i].name) + ")=" + this.sciconut(result.ion[i].c, 2) + "mol/L,"
    }
    acidOutput = acidOutput.substring(0, acidOutput.length - 1) + "."
    return acidOutput
  },
  questionname: function (mode) {
    switch (mode) {
      case 0: case 1: case 2:
        return "name"
      case 3: case 4: case 5:
        return "symbol"
      case 6: case 7: case 8:
        return "number"
      case 9: case 10: case 11:
        return "iupac"
    }
  },
  answername: function (mode) {
    switch (mode) {
      case 3: case 6: case 9:
        return "name"
      case 0: case 7: case 10:
        return "symbol"
      case 1: case 4: case 11:
        return "number"
      case 2: case 5: case 8:
        return "iupac"
    }
  },
  correctanswer: function (question, answer, mode = 2) {
    result = chemicaltools.correctAnswer(question, answer, this.questionname(mode), this.answername(mode))
    if (result.correct) {
      correct = parseInt(window.localStorage.getItem("correct"))
      correct = correct ? correct + 1 : 1
      window.localStorage.setItem("correct", correct)
      updatescore()
      return (tran.getLang() === 'cn' ? "回答正确！" : "Answer correctly!")
    } else {
      incorrect = parseInt(window.localStorage.getItem("incorrect"))
      incorrect = incorrect ? incorrect + 1 : 1
      window.localStorage.setItem("incorrect", incorrect)
      updatescore()
      return (tran.getLang() === 'cn' ? "回答错误，正确答案为：" + result.correct_answer + "，题目为：" + question + "，您的答案为：" + answer : "The answer is wrong. The correct answer is " + result.correct_answer + " and the question is " + question + ", but your answer is " + answer + ".")
    }
  },
  showquestion: function () {
    mode = parseInt(window.localStorage.getItem("mode"))
    if (!mode) { mode = 2 }
    max = parseInt(window.localStorage.getItem("max"))
    if (!max) { max = 86 }
    var questiondata = chemicaltools.makeQuestion(this.questionname(mode), this.answername(mode), max = max)
    var output = (tran.getLang() === 'cn' ? "<h3>题目：" + questiondata.question + "</h3><ul class='question'>" : "<h3>Question: " + questiondata.question + "</h3><ul class='question'>")
    for (var i in questiondata.options) {
      output += "<li><a href=\"javascript:ChemicalTools.answer('" + questiondata.question + "','" + questiondata.options[i] + "',mode=" + mode + ")\">" + questiondata.options[i] + "</a></li>"
    }
    output += "</ul>"
    $("#examquestion").html(output)
  },
  answer: function (question, answer, mode = 2) {
    $("#examoutput").html(this.correctanswer(question, answer, mode))
    this.showquestion()
  },
  chemicalname: function(name){
    name=name.replace(/[\d]/g, function(num) { return '<sub>' + num + '</sub>' });
    name=name.replace(/(\+|-)/g, function(num) { return '<sup>' + num + '</sup>' });
    name=name.replace(/<sub>[\d]<\/sub><sup>(\+|-)<\/sup>/g, function(num) { return '<sup>' + num.replace(/<\/?su(b|p)>/g,"")+ '</sup>' });
    return name
  }
});

function showpage(hash) {
  pages = ["#indexpage", "#elementpage", "#masspage", "#acidpage", "#gaspage", "#exampage", "#deviationpage", "#aboutpage", "#userpage", "#loginpage", "signpage"]
  for (var i in pages) {
    $(pages[i]).hide()
  }

  if (tran.getLang() === 'cn') var title = " -- 化学e+"; else var title = " -- Chemical Tools";

  if (hash == "" || hash == "#" || hash == "#/index/") {
    $("#indexpage").show()
    $("title").html((tran.getLang() === 'cn' ? "首页" : "Home Page") + title)
  } else if (hash == "#/element/") {
    $("#elementpage").show()
    $("title").html((tran.getLang() === 'cn' ? "元素查询" : "Element Search") + title)
  } else if (hash == "#/mass/") {
    $("#masspage").show()
    $("title").html((tran.getLang() === 'cn' ? "质量计算" : "Mass Calculator") + title)
  } else if (hash == "#/acid/") {
    $("#acidpage").show()
    $("title").html((tran.getLang() === 'cn' ? "酸碱计算" : "Acid-base Calculator") + title)
  } else if (hash == "#/gas/") {
    $("#gaspage").show()
    $("title").html((tran.getLang() === 'cn' ? "气体计算" : "Gas Calculator") + title)
  } else if (hash == "#/exam/") {
    $("#exampage").show()
    $("title").html((tran.getLang() === 'cn' ? "元素记忆" : "Element Memory") + title)
  } else if (hash == "#/deviation/") {
    $("#deviationpage").show()
    $("title").html((tran.getLang() === 'cn' ? "偏差计算" : "Deviation Calculator") + title)
  } else if (hash == "#/about/") {
    $("#aboutpage").show()
    $("title").html((tran.getLang() === 'cn' ? "关于" : "About") + title)
  } else if (hash == "#/user/") {
    $("#userpage").show()
    $("title").html((tran.getLang() === 'cn' ? "个人中心" : "User Center") + title)
  }

  window.location.hash = hash
}
function frushuserbar() {
  var currentUser = AV.User.current();
  if (currentUser) {
    $("#userbar").html("<li><a href=\"javascript:showpage('#/user/')\">" + (tran.getLang() === 'cn' ? "欢迎您，" : "Welcome, ") + currentUser.getUsername() + "</a></li><li><a href=\"javascript:AV.User.logOut();frushuserbar();\">" + (tran.getLang() === 'cn' ? "注销" : "Sign out") + "</a></li>")
    $("#userusername").html(currentUser.getUsername())
    $("#usernickname").html(currentUser.get("nickName"))
  } else {
    $("#userbar").html("<li><a href=\"javascript:$('#loginpage').show()\">" + (tran.getLang() === 'cn' ? "登陆" : "Sign in") + "</a></li>");
    $("#userusername").html((tran.getLang() === 'cn' ? "游客" : "Vistor"))
    $("#usernickname").html((tran.getLang() === 'cn' ? "游客" : "Vistor"))
  }
}
function frushpage() {
  ChemicalTools.showquestion()
  showpage(window.location.hash)
  frushuserbar()
  updatescore()
}
function updatescore() {
  correct = parseInt(window.localStorage.getItem("correct"))
  incorrect = parseInt(window.localStorage.getItem("incorrect"))
  if (!correct) window.localStorage.setItem("correct", 0)
  if (!incorrect) window.localStorage.setItem("incorrect", 0)
  correct = correct ? correct : 0
  incorrect = incorrect ? incorrect : 0
  $("#examscore").html((tran.getLang() === 'cn' ? "答对" + correct + "题，答错" + incorrect + "题。" : "Answer " + correct + " questions correctly and " + incorrect + " questions incorrectly."))
}
$(function () {
  var APP_ID = 'oAhUyuu4qF7DlbNtPlzvFkB7-gzGzoHsz';
  var APP_KEY = 'VBjBASiTnt7xA9bNMC0bSmSX';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });
  $("#elementform").submit(function (e) {
    $("#elementoutput").html(ChemicalTools.outputelement($("#elementinput").val()))
    return false
  });
  $("#massform").submit(function (e) {
    $("#massoutput").html(ChemicalTools.calculateMass($("#massinput").val()))
    return false
  });
  $("#deviationform").submit(function (e) {
    $("#deviationoutput").html(ChemicalTools.calculateDeviation($("#deviationinput").val()))
    return false
  });
  $("#acidform").submit(function (e) {
    pkw = parseInt(window.localStorage.getItem("pkw"))
    if (!pkw) { pkw = 14 }
    $("#acidoutput").html(ChemicalTools.calacid($("#acidc").val(), $("#acidpKa").val(), $("#acidAorB").val(), pKw = pkw))
    return false
  });
  $("#gasform").submit(function (e) {
    $("#" + $("input[name='gastype']:checked").val()).val("")
    gasoutput = chemicaltools.calculateGas($("#p").val(), $("#V").val(), $("#n").val(), $("#T").val());
    $("#p").val(gasoutput.p);
    $("#V").val(gasoutput.V);
    $("#n").val(gasoutput.n);
    $("#T").val(gasoutput.T);
    return false
  });

  $("#loginform").submit(function (e) {
    AV.User.logIn($("#loginusername").val(), $("#loginpassword").val()).then(function (loggedInUser) {
      $("#loginpage").hide()
      frushuserbar()
    }, function (error) {
      $("#loginoutput").html(error)
    });
    return false
  });
  $("#signform").submit(function (e) {
    var user = new AV.User();
    user.setUsername($("#signusername").val());
    user.setPassword($("#signpassword").val());
    user.signUp().then(function (loggedInUser) {
      $("#signpage").hide()
      frushuserbar()
    }, function (error) {
      $("#signoutput").html(error)
    });


    AV.User.logIn($("#loginusername").val(), $("#loginpassword").val()).then(function (loggedInUser) {
      $("#loginpage").hide()
      frushuserbar()
    }, function (error) {
      $("#loginoutput").html(error)
    });
    return false
  });
  $("#userform").submit(function (e) {
    window.localStorage.setItem("mode", $("#usermode").val())
    window.localStorage.setItem("max", $("#usermax").val())
    window.localStorage.setItem("pkw", $("#userpkw").val())
    return false
  });
  $("#elementtable").html(ChemicalTools.makeelementtable())
  frushpage()
  mode = window.localStorage.getItem("mode")
  max = window.localStorage.getItem("max")
  pkw = window.localStorage.getItem("pkw")
  $("#usermode").val(mode ? mode : "2")
  $("#usermax").val(max ? max : "86")
  $("#userpkw").val(pkw ? pkw : "14")
});
