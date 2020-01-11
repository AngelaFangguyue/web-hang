// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $last = $(".last"); //定义hashData数据;

var a = localStorage.getItem("hashDa");
var hashL = JSON.parse(localStorage.getItem("hashDa"));
console.log("a hashL", a, hashL);

if (a === null) {
  window.hashData = [{
    logo: "A",
    img: "aa",
    urll: "acfun.cn",
    href: "https://www.acfun.cn/"
  }, {
    logo: "B",
    img: "bb",
    urll: "bilibili.com",
    href: "https://www.bilibili.com/"
  }];
} else {
  window.hashData = hashL;
} //定义一个简化url的函数


function simpUrl(url) {
  return url.replace("http://", "").replace("https://", "").replace("www.", "").replace(/\/.*/, "");
} //定义生成页面中元素的render方法


function render() {
  $last.siblings().remove();
  var $newA;
  hashData.forEach(function (node, index) {
    $newA = $("<a href='".concat(node.href, "'>\n    <div class=\"con\">\n      <div class=\"logo\">").concat(node.logo, "</div>\n      <div class=\"urll\">").concat(node.urll, "</div>\n      <div class=\"close\">\n        <svg class=\"icon\" aria-hidden=\"true\">\n            <use xlink:href=", "#icon-close", "></use>\n        </svg></div>\n    </div>\n    </a>"));
    $newA.insertBefore($last); //添加删除功能：

    $newA.on("click", ".close", function (e) {
      //阻止冒泡
      e.stopPropagation();
      e.preventDefault();
      hashData.splice(index, 1);
      render();
    });
  });
}

render();
$last.on("click", function () {
  //提醒用户输入要添加的网址
  var url = window.prompt("请输入你想要添加的网址：");

  if (url.indexOf("http") !== 0) {
    url = ("https://" + url).toLowerCase();
  }

  hashData.push({
    logo: simpUrl(url)[0].toUpperCase(),
    img: simpUrl(url)[0].toUpperCase(),
    urll: simpUrl(url),
    href: url
  });
  render();
});

window.onbeforeunload = function () {
  //将hash数据存储在本地localStorage里
  localStorage.setItem("hashDa", JSON.stringify(hashData));
};

$(document).on("keypress", function (e) {
  //console.log(e);
  var code = e.key.toUpperCase();

  for (var d = 0; d < hashData.length; d++) {
    if (code == hashData[d].logo) {
      window.open(hashData[d].href);
      break;
    }
  }

  ha;
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e1b376b2.js.map