// ChemicalTools JavaScript

format.extend(String.prototype, {})

var tran = new Translater();
function getTran(cn, en) {
  return tran.getLang() === 'cn' ? cn : en
}

var ChemicalTools = new Object({
  calculateMass: function (x) {
    var result = chemicaltools.calculateMass(x)
    if (result) {
      var output = "<b>{1}</b><br><b>{0}</b>={2}".format(getTran("相对分子质量", "Mass"), ChemicalTools.chemicalname(result.name), result.mass.toFixed(2))
      for (i = 0; i < result.peratom.length; i++) {
        output += getTran("<br><b>{0}</b>（符号：{2}），{3}个原子，原子量为{4}，质量分数为{5}%；", "<br><b>{1} (Symbol:{2})</b>: {3} atoms whose mass is {4}, mass fraction: {5}%;").format(result.peratom[i].name, result.peratom[i].iupac, result.peratom[i].symbol, result.peratom[i].atomnumber, parseFloat(result.peratom[i].mass).toFixed(2), result.peratom[i].massper.toFixed(2))
      }
      return output.substring(0, output.length - 1) + getTran("。", ".")
    } else {
      return getTran("输入出错！", "Wrong input.")
    }
  },
  outputelement: function (input) {
    var info = chemicaltools.searchElement(input)
    if (info) {
      var outputinfo = getTran({ "元素名称": info.name, "元素符号": info.symbol, "IUPAC名": info.iupac, "原子序数": info.number, "相对原子质量": info.mass, "元素名称含义": info.origin }, { "Symbol": info.symbol, "IUPAC name": info.iupac, "Atomic number": info.number, "Mass": info.mass, "Origin of the name": info.origin })
      var output = "<table><tr style='text-align:center;'><td colspan=2><b>{0}</b></td><td rowspan=6><img src='{1}'></td></tr>".format(getTran("元素信息", "Element Information"), info.url)
      for (var x in outputinfo) {
        output += "<tr><td><b>{0}</b></td><td>{1}</td></tr>".format(x, outputinfo[x])
      }
      output += "<tr style='text-align:center;'><td colspan=3>" + getTran("<a href='https://zh.wikipedia.org/wiki/{0}'>中文维基百科</a> · <a href='https://en.wikipedia.org/wiki/{1]'>英文维基百科</a></tr></td>", "<a href='https://en.wikipedia.org/wiki/{1}'>Visit Wikipedia</a>").format(info.name, info.iupac) + "</tr></td>"
      output += "</table>"
      return output
    } else return getTran("输入出错！", "Wrong input.")
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
              output += getTran("镧系", "Lanthanide")
            } else if (i == 9) {
              output += getTran("锕系", "Actinide")
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
            output += "<a href=\"javascript:$('#elementoutput').html(ChemicalTools.outputelement('{0}'))\"><sub>{0}</sub>{1}<br>{2}<br><small>{3}</small></a>".format(chemicaltools.elementinfo[n].number, chemicaltools.elementinfo[n].symbol, getTran(chemicaltools.elementinfo[n].name, chemicaltools.elementinfo[n].iupac), chemicaltools.elementinfo[n].mass);
            n++
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
    if (value == 0) return value
    var p = Math.floor(Math.log(Math.abs(value)) / Math.LN10)
    var n = value * Math.pow(10, -p)
    return n.toFixed(num) + (p == 0 ? "" : ("×10<sup>{0}</sup>".format(p)))
  },
  calculateDeviation: function (input) {
    if (!input) return getTran("请输入数据！", "Plese input data!")
    var x = input.split(/[\r\n\\s ,;]+/)
    var numnum = Infinity, pointnum = Infinity
    if (x.length > 1) {
      x.forEach(function (xi) {
        var len = xi.length
        var pointlen = 0
        if (xi.substr(0, 1) == "-") len--
        if (xi.indexOf(".") >= 0) {
          len--
          var pointlen = len - xi.indexOf(".")
          if (Math.abs(parseFloat(xi)) < 1) {
            var zeronum = Math.floor(Math.log((Math.abs(parseFloat(xi)))) / Math.LN10)
            len += zeronum
          }
        }
        numnum = Math.min(numnum, len)
        pointnum = Math.min(pointnum, pointlen)
      });
      result = chemicaltools.calculateDeviation(x.map(parseFloat))
      var outputinfo = [
        { name: getTran("您输入的数据", "Input data:"), value: x.join(", ") },
        { name: getTran("平均数", "Average"), value: result.average.toFixed(pointnum) },
        { name: getTran("平均偏差", "Average deviation"), value: result.average_deviation.toFixed(pointnum) },
        { name: getTran("相对平均偏差", "Relative average deviation"), value: ChemicalTools.sciconut(result.relative_average_deviation*1000, numnum - 1) + "‰" },
        { name: getTran("标准偏差", "Standard deviation"), value: ChemicalTools.sciconut(result.standard_deviation, numnum - 1) },
        { name: getTran("相对标准偏差", "Relative standard deviation"), value: ChemicalTools.sciconut(result.relative_standard_deviation*1000, numnum - 1) + "‰" },
      ]
      var output = "<table>"
      outputinfo.forEach(function (info) {
        output += "<tr><td><b>{0}</b></td><td>{1}</td></tr>".format(info.name, info.value)
      });
      output += "</table>"
      return output
    } else {
      return getTran("请输入多个数据。", "Please input multiple data.")
    }
  },
  calacid: function (c, strpKa, AorB, pKw = 14) {
    if (!strpKa || !c) return getTran("请输入数据！", "Please input data!")
    var strpKaArray = strpKa.split(/[\r\n\\s ,;]+/)
    var result = chemicaltools.calculateAcid(c, strpKaArray.map(parseFloat), AorB, pKw)
    var output = "<b>{0}</b>, c={1}mol/L, ".format((AorB ? "HA" : "BOH"), c)
    var i = 1;
    strpKaArray.forEach(function (pKa) {
      output += "pK<sub>{0}</sub>{1}={2}, ".format((AorB ? "a" : "b"), (strpKaArray.length > 1 ? "<sub>{0}</sub>".format(i++) : ''), pKa)
    });
    output += "<br>{0}{1}.".format(getTran("溶液的pH为", "pH is "), result.pH.toFixed(2))
    result.ion.forEach(function (ion) {
      output += "<br>c({0})={1}mol/L,".format(ChemicalTools.chemicalname(ion.name), ChemicalTools.sciconut(ion.c, 2))
    })
    output = output.substring(0, output.length - 1) + "."
    return output
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
    var result = chemicaltools.correctAnswer(question, answer, ChemicalTools.questionname(mode), ChemicalTools.answername(mode))
    var n = result.correct ? "correct" : "incorrect"
    var num = setdefault(parseInt(window.localStorage.getItem(n)), 0) + 1
    window.localStorage.setItem(n, num)
    updatescore()
    return result.correct ? getTran("回答正确！", "Answer correctly!") : (getTran("回答错误，正确答案为：{0}，题目为：{1}，您的答案为{2}", "The answer is wrong. The correct answer is {0} and the question is {1}, but your answer is {2}.").format(result.correct_answer, question, answer))
  },
  showquestion: function () {
    mode = setdefault(parseInt(window.localStorage.getItem("mode")), 2)
    max = setdefault(parseInt(window.localStorage.getItem("max")), 86)
    var questiondata = chemicaltools.makeQuestion(ChemicalTools.questionname(mode), ChemicalTools.answername(mode), max = max)
    var output = getTran("<h3>题目：{0}</h3><ul class='question'>", "<h3>Question: {0}</h3><ul class='question'>").format(questiondata.question)
    questiondata.options.forEach(function (option) {
      output += "<li><a href=\"javascript:ChemicalTools.answer('{0}','{1}',mode={2})\">{1}</a></li>".format(questiondata.question, option, mode)
    });
    output += "</ul>"
    $("#examquestion").html(output)
  },
  answer: function (question, answer, mode = 2) {
    $("#examoutput").html(ChemicalTools.correctanswer(question, answer, mode))
    ChemicalTools.showquestion()
  },
  chemicalname: function (name) {
    name = name.replace(/[\d]/g, function (num) { return '<sub>' + num + '</sub>' });
    name = name.replace(/(\+|-)/g, function (num) { return '<sup>' + num + '</sup>' });
    name = name.replace(/<sub>[\d]<\/sub><sup>(\+|-)<\/sup>/g, function (num) { return '<sup>' + num.replace(/<\/?su(b|p)>/g, "") + '</sup>' });
    return name;
  }
});

function setdefault(input, def) {
  return input ? input : def
}

function showpage(hash) {
  pages = [
    { hash: ["", "#", "#/index/"], element: "#indexpage", title_cn: "首页", title_en: "Home Page" },
    { hash: "#/element/", element: "#elementpage", title_cn: "元素查询", title_en: "Element Search" },
    { hash: "#/mass/", element: "#masspage", title_cn: "质量计算", title_en: "Mass Calculator" },
    { hash: "#/acid/", element: "#acidpage", title_cn: "酸碱计算", title_en: "Acid-base Calculator" },
    { hash: "#/gas/", element: "#gaspage", title_cn: "气体计算", title_en: "Gas Calculator" },
    { hash: "#/exam/", element: "#exampage", title_cn: "元素记忆", title_en: "Element Memory" },
    { hash: "#/deviation/", element: "#deviationpage", title_cn: "偏差计算", title_en: "Deviation Calculator" },
    { hash: "#/about/", element: "#aboutpage", title_cn: "关于", title_en: "About" },
    { hash: "#/user/", element: "#userpage", title_cn: "个人中心", title_en: "User Center" },
  ]
  var title = "{0} -- " + getTran(" -- 化学e+", " -- Chemical Tools")
  pages.forEach(function (page) {
    if (typeof (page.hash) == "string" ? page.hash == hash : page.hash.indexOf(hash) != -1) {
      $(page.element).show()
      $("title").html(title.format(getTran(page.title_cn, page.title_en)))
    } else {
      $(page.element).hide()
    }
  })
  window.location.hash = hash
}
function frushuserbar() {
  var currentUser = AV.User.current();
  if (currentUser) {
    $("#userbar").html("<li><a href=\"javascript:showpage('#/user/')\">{1}{0}</a></li><li><a href=\"javascript:AV.User.logOut();frushuserbar();\">{2}</a></li>".format(currentUser.getUsername(), getTran("欢迎您，", "Welcome, "), getTran("注销", "Sign out")))
    $("#userusername").html(currentUser.getUsername())
    $("#usernickname").html(currentUser.get("nickName"))
  } else {
    $("#userbar").html("<li><a href=\"javascript:$('#loginpage').show()\">{0}</a></li>".format(getTran("登陆", "Sign in")));
    $("#userusername").html(getTran("游客", "Vistor"))
    $("#usernickname").html(getTran("游客", "Vistor"))
  }
}
function frushpage() {
  ChemicalTools.showquestion()
  showpage(window.location.hash)
  frushuserbar()
  updatescore()
}
function updatescore() {
  var value = {};
  var keys = ["correct", "incorrect"];
  keys.forEach(function (key) {
    num = parseInt(window.localStorage.getItem(key))
    if (!num) window.localStorage.setItem(key, 0)
    value[key] = num ? num : 0
  });
  $("#examscore").html(getTran("答对{0}题，答错{1}题。", "Answer {0} questions correctly and {1} questions incorrectly.").format(value.correct, value.incorrect))
}


$(function () {
  var APP_ID = 'oAhUyuu4qF7DlbNtPlzvFkB7-gzGzoHsz';
  var APP_KEY = 'VBjBASiTnt7xA9bNMC0bSmSX';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });

  var settings = [
    { name: "mode", element: "#usermode", default: 2 },
    { name: "max", element: "#usermax", default: 86 },
    { name: "pkw", element: "#userpkw", default: 14 },
  ]
  var forms = [
    { form: "#elementform", input: "#elementinput", output: "#elementoutput", func: ChemicalTools.outputelement },
    { form: "#massform", input: "#massinput", output: "#massoutput", func: ChemicalTools.calculateMass },
    { form: "#deviationform", input: "#deviationinput", output: "#deviationoutput", func: ChemicalTools.calculateDeviation },
    {
      form: "#acidform", costomfunc: function () {
        pkw = setdefault(parseInt(window.localStorage.getItem("pkw")), 14)
        $("#acidoutput").html(ChemicalTools.calacid($("#acidc").val(), $("#acidpKa").val(), $("#acidAorB").val() == "acid", pKw = pkw))
      }
    },
    {
      form: "#gasform", costomfunc: function () {
        $("#" + $("input[name='gastype']:checked").val()).val("")
        keys = ["p", "V", "n", "T"]
        gasoutput = chemicaltools.calculateGas(...keys.map(function (key) { return $("#" + key).val() }));
        keys.forEach(function (key) {
          $("#" + key).val(gasoutput[key]);
        })
      }
    },
    {
      form: "#loginform", costomfunc: function () {
        AV.User.logIn($("#loginusername").val(), $("#loginpassword").val()).then(function (loggedInUser) {
          $("#loginpage").hide()
          frushuserbar()
        }, function (error) {
          $("#loginoutput").html(error)
        });
      }
    },
    {
      form: "#signform", costomfunc: function () {
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
      }
    },
    {
      form: "#userform", costomfunc: function () {
        settings.forEach(function (setting) {
          window.localStorage.setItem(setting.name, $(setting.element).val())
        })
      }
    }
  ]
  forms.forEach(function (form) {
    $(form.form).submit(function (e) {
      if (form.costomfunc) form.costomfunc(); else $(form.output).html(form.func($(form.input).val()));
      return false
    });
  })

  $("#elementtable").html(ChemicalTools.makeelementtable())
  frushpage()
  settings.forEach(function (setting) {
    num = window.localStorage.getItem(setting.name)
    $(setting.element).val(setdefault(num, setting.default))
  })
});
