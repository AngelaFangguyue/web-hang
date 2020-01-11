let $last = $(".last");

//定义hashData数据;
let a = localStorage.getItem("hashDa");
let hashL = JSON.parse(localStorage.getItem("hashDa"));
console.log("a hashL", a, hashL);
if (a === null) {
  window.hashData = [
    { logo: "A", img: "aa", urll: "acfun.cn", href: "https://www.acfun.cn/" },
    {
      logo: "B",
      img: "bb",
      urll: "bilibili.com",
      href: "https://www.bilibili.com/"
    }
  ];
} else {
  window.hashData = hashL;
}

//定义一个简化url的函数
function simpUrl(url) {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
}

//定义生成页面中元素的render方法
function render() {
  $last.siblings().remove();
  let $newA;
  hashData.forEach((node, index) => {
    $newA = $(`<a href='${node.href}'>
    <div class="con">
      <div class="logo">${node.logo}</div>
      <div class="urll">${node.urll}</div>
      <div class="close">
        <svg class="icon" aria-hidden="true">
            <use xlink:href=${"#icon-close"}></use>
        </svg></div>
    </div>
    </a>`);
    $newA.insertBefore($last);
    //添加删除功能：
    $newA.on("click", ".close", e => {
      //阻止冒泡
      e.stopPropagation();
      e.preventDefault();
      hashData.splice(index, 1);
      render();
    });
  });
}

render();

$last.on("click", () => {
  //提醒用户输入要添加的网址
  let url = window.prompt("请输入你想要添加的网址：");
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

window.onbeforeunload = function() {
  //将hash数据存储在本地localStorage里
  localStorage.setItem("hashDa", JSON.stringify(hashData));
};

$(document).on("keypress", e => {
  //console.log(e);
  let code = e.key.toUpperCase();
  for (let d = 0; d < hashData.length; d++) {
    if (code == hashData[d].logo) {
      window.open(hashData[d].href);
      break;
    }
  }
  ha;
});
