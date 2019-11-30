const _ = require('underscore');

// 1-39
// (1)
function f1() {}
var a = typeof f1 == "function" ? f1 : function() {};
// (2)
function f2() {
  return function() {};
}
// (3)
(function(a, b) {
  return a + b;
})(10, 5);
// 15
// (4)
function callAndAdd(a, b) {
  return a() + b();
}
callAndAdd(
  function() {
    return 10;
  },
  function() {
    return 5;
  }
);
// 15

// 1-40
function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
  //... 생략
}
// 혹은
function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
    //... 생략
  }
  //... 생략
}

// 1-41
var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1();
// 30

// 1-42
function f2() {
  var a = 10;
  var b = 20;
  function f3(c, d) {
    return c + d;
  }
  return f3;
}
var f4 = f2();
f4(5, 7);
// 12

// 1-43
function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5();
}
f4();
// 30

// 1-44
function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}
var f8 = f6();
f8(20);
// 30
f8(10);
// 20

// 1-45
function f9() {
  var a = 10;
  var f10 = function(c) {
    return a + b + c;
  };
  var b = 20;
  return f10;
}
var f11 = f9();
f11(30);
// 60

// 1-46 팔로잉 버튼
/*
<div class="user-list"></div>

<script>
var users = [
  { id: 1, name: "HA", age: 25 },
  { id: 2, name: "PJ", age: 28 },
  { id: 3, name: "JE", age: 27 }
];
$('.user-list').append(
  _.map(users, function(user) { // (1) 이 함수는 클로저가 아니다.
    var button = $('<button>').text(user.name); // (2)
    button.click(function() { // (3) 계속 유지되는 클로저 (내부에서 user를 사용했다.)
      if (confirm(user.name + "님을 팔로잉 하시겠습니까?")) follow(user); // (4)
    });
    return button; // (5)
  }));
function follow(user) {
  $.post('/follow', { user_id: user.id }, function() { // (6) 클로저가 되었다가 없어지는 클로저
    alert("이제 " + user.name + "님의 소식을 보실 수 있습니다.");
  });
}
*/

// 1-47
// 1. 흔한 클로저 실수 - 어떤 버튼을 클릭해도 JE
// var buttons = [];
// for (var i = 0; i < users.length; i++) {
//   var user = users[i];
//   buttons.push(
//     $("<button>")
//       .text(user.name)
//       .click(function() {
//         console.log(user.name);
//       })
//   );
// }
// $(".user-list").append(buttons);
// // 2. 절차지향적 해결 - 어차피 함수의 도움을 받아야 함, 각각 다른 이름이 잘 나옴
// var buttons = [];
// for (var i = 0; i < users.length; i++) {
//   (function(user) {
//     buttons.push(
//       $("<button>")
//         .text(user.name)
//         .click(function() {
//           console.log(user.name);
//         })
//     );
//   })(users[i]);
// }
// $(".user-list").append(buttons);
// // 3. 함수적 해결 - 깔끔한 코드는 덤
// $(".user-list").append(
//   _.map(users, function(user) {
//     return $("<button>")
//       .text(user.name)
//       .click(function() {
//         console.log(user.name);
//       });
//   })
// );



// 1-48 함수를 인자로 받아 대신 실행하는 함수
function callWith10(val, func) {
  return func(10, val);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
callWith10(20, add);
// 30
callWith10(5, sub);
// 5



// 1-49 함수를 리턴하는 함수
function constant(val) {
  return function() {
    return val;
  }
}
var always10 = constant(10);
always10();
// 10
always10();
// 10
always10();
// 10



// 1-50 함수를 대신 실행하는 함수를 리턴하는 함수
function callWith(val1) {
  return function(val2, func) {
    return func(val1, val2);
  }
}
var callWith10 = callWith(10);
callWith10(20, add);
// 30
var callWith5 = callWith(5);
callWith5(5, sub);
// 0


// 1-51 괄호 두번
callWith(30)(20, add);
// 50
callWith(20)(20, sub);
// 0


// 1-52
callWith([1, 2, 3])(function(v) { return v * 10; }, _.map);
// [10, 20, 30]
_.get = function(list, idx) {
  return list[idx];
};
var callWithUsers = callWith([
  { id: 2, name: "HA", age: 25 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 }
]);
callWithUsers(2, _.get);
// { id: 5, name: "JE", age: 27 }
callWithUsers(function(user) {
  return user.age > 25;
}, _.find);
// { id: 4, name: "PJ", age: 28 }
callWithUsers(function(user) {
  return user.age > 25;
}, _.filter);
// [{ id: 4, name: "PJ", age: 28 },
//  { id: 5, name: "JE", age: 27 }];
callWithUsers(function(user) {
  return user.age > 25;
}, _.some);
// true
callWithUsers(function(user) {
  return user.age > 25;
}, _.every);
// false



// 1-53 bind
function add(a, b) {
  return a + b;
}
var add10 = add.bind(null, 10);
add10(20);
// 30

// 1-54 존 레식의 partial
Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments); // (1)
  return function() { // (2)
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) // (5)
      if (args[i] === undefined) args[i] = arguments[arg++]; // (6)
    return fn.apply(this, args);
  };
};
function abc(a, b, c) {
  console.log(a, b, c);
}
var ac = abc.partial(undefined, 'b', undefined); // (3)
ac('a', 'c'); // (4)
// a b c



// 1-55
var ac2 = abc.partial(undefined, 'b');
ac2('a', 'c');
// a c undefined


// 1-56
function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
add(1, 2, 3, 4, 5);
// 15
var add2 = add.partial(undefined, 2);
add2(1, 3, 4, 5);
// 3
var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
add3(1, 2, 4, 5);
// 15
add3(50, 50, 50, 50);
// 15 <--- 버그
add3(100, 100, 100, 100);
// 15 <--- 버그



// 1-57 실수 고치기
Function.prototype.partial = function() {
  var fn = this, _args = arguments; // (1) 클로저가 기억할 변수에는 원본을 남기기
  return function() {
    var args = Array.prototype.slice.call(_args); // (2) 리턴된 함수가 실행될 때마다 복사하여 원본 지키기
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++]; // 실행때마다 새로 들어온 인자 채우기
    return fn.apply(this, args);
  };
};
var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
add3(1, 2, 4, 5);
// 15
add3(50, 50, 50, 50);
// 203
add3(10, 20, 30, 40);
// 103



// 1-58 Underscore.js의 _.partial
var ac = _.partial(abc, _, 'b'); // a 가 올 자리를 비워두었고 c 자리는 생략
ac('a', 'c');
// a b c
var b = _.partial(abc, 'a', _, 'c'); // b가 올 자리를 비워둠
b('b');
// a b c
var ab = _.partial(abc, _, _, 'c'); // a, b 가 올 자리를 비워둠
ab('a', 'b');
// a b c
var add2 = _.partial(add, _, 2); // 1이 올자리를 비워둠
add2(1, 3, 4, 5); // 이후에 인자를 더 많이 넘겨도 모두 add에게 전달 됨
// 15
add2(3, 5);
// 10
function equal(a, b) {
  return a === b;
}
var isUndefined = _.partial(equal, undefined); // a 자리에 undefined를 적용해둠
isUndefined(undefined); // b 자리에 undefiend가 들어와 true를 리턴
// true
var bj = {
  name: "BJ",
  greet: _.partial(function(a, b) { // Underscore.js, Lodash의 _.partial은
    return a + this.name + b;       // 함수가 실행될 때 결정되는 this를 잘 연결 해줌
  }, "저는 ", " 입니다.")
};
bj.greet();
// 저는 BJ 입니다.
bj.greet.call({ name: "HA" }); // 이후에도 this를 바꿀 수 있음
// 저는 HA 입니다.
var greetPj = bj.greet.bind({ name: "PJ" }); // bind는 새로운 함수를 리턴
greetPj();
// 저는 PJ 입니다.
bj.greet(); // 여전히 잘 보존
// 저는 BJ 입니다.



