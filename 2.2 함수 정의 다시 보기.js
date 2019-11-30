const _ = require('underscore');

// 2-13 일반적인 함수 정의
function add1(a, b) {
  return a + b;
}
var add2 = function(a, b) {
  return a + b;
};
var m = {
  add3: function(a, b) {
    return a + b;
  }
};

// 2-14 에러가 나는 상황이지만 호이스팅이다.
add1(10, 5);
// 15;
add2(10, 5);
// Uncaught TypeError: add2 is not a function(…)(anonymous function)
function add1(a, b) {
  return a + b;
}
var add2 = function(a, b) {
  return a + b;
};

// 2-15 선언한적 없는 함수 실행
// hi();
// Uncaught ReferenceError: hi is not defined

// 2-16 선언한적 없는 변수 참조하기
// var a = hi;
// Uncaught ReferenceError: hi is not defined

// 2-17 실행하지 않고 참조만 해보기
console.log(add1);
// function add1(a, b) { return a + b; }
console.log(add2); // 에러가 나지 않는다.
// undefined
function add1(a, b) {
  return a + b;
}
var add2 = function(a, b) {
  return a + b;
};

// 2-18 호이스팅을 이용하여 리턴문 아래에 함수 선언하기
function add(a, b) {
  return valid() ? a + b : new Error();
  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}
console.log(add(10, 5));
// 15;
// console.log(add(10, "a"));
// Error(...)

// 2-19 호이스팅을 이용해 코드의 순서를 이해하기 편하게 배치
/*
// (1) end가 먼저 정의되어 코드가 다소 복잡하게 읽힌다.
app.post('/login', function(req, res) {
  db.select("users", { where: { email: req.body.email } }, function(err, user) {
    function end(user) {
      req.session.user = user;
      res.redirect('/');
    }
    if (user && user.password === req.body.password) return end(user);
    db.insert("users", {
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      end(user);
    });
  });
});
// (2) 호이스팅 덕분에 end를 나중에 정의해도 잘 동작한다. 읽기 더 편하다.
app.post('/login', function(req, res) { // (3)
  db.select("users", { where: { email: req.body.email } }, function(err, user) {
    if (user && user.password === req.body.password) return end(user);
    db.insert("users", {
      email: req.body.email,
      password: req.body.password
    }, function(err, user) {
      end(user);
    });
    function end(user) {
      req.session.user = user;
      res.redirect('/');
    }
  });
});
*/

// 2-20 일반적인 즉시 실행 방식
(function(a) {
  console.log(a);
  // 100
})(100);

// 2-21 에러가 난 경우
/*
function(a) {
  console.log(a);
}(100);
Uncaught SyntaxError: Unexpected token (

2-22 선언만 시도해도 에러
function() {
}
Uncaught SyntaxError: Unexpected token (
*/

// 2-23 괄호 없이 정의했는데 에러가 나지 않는 경우
function f1() {
  return function() {};
}
f1();

// 2-24 괄호 없이 즉시 실행했는데 에러가 나지 않는 경우
function f1() {
  return (function(a) {
    console.log(a);
    // 1
  })(1);
}
f1();

// 2-25 괄호 없이 정의가 가능한(즉시 실행도 가능한) 다양한 상황
!(function(a) {
  console.log(a);
  // 1
})(1);
true &&
  (function(a) {
    console.log(a);
    // 1
  })(1);
1
  ? (function(a) {
      console.log(a);
      // 1
    })(1)
  : 5;
0,
  (function(a) {
    console.log(a);
    // 1
  })(1);
var b = (function(a) {
  console.log(a);
  // 1
})(1);
function f2() {}
f2(
  (function(a) {
    console.log(a);
    // 1
  })(1)
);
var f3 = (function c(a) {
  console.log(a);
  // 1
})(1);
new (function() {
  console.log(1);
  // 1
})();
// 개인적으로는 이 방법이 제일 재밌게 느껴진다. 괄호 없이도 익명 함수를 즉시 실행했다.

// 2-26
var pj = new (function() {
  this.name = "PJ";
  this.age = 28;
  this.constructor.prototype.hi = function() {
    console.log("hi");
  };
})();
console.log(pj);
// { name: "PJ", age: 28 }
pj.hi();
// hi

// 2-27 즉시 실행하며 this 할당하기
var a = function(a) {
  console.log(this, a);
  // [1], 1
}.call([1], 1);

// 2-28
var a = eval("10 + 5");
console.log(a);
// 15
var add = new Function("a, b", "return a + b;");
add(10, 5);
// 15

// 2-29 간단 버전 문자열 화살표 함수
function L(str) {
  var splitted = str.split("=>");
  return new Function(splitted[0], "return (" + splitted[1] + ");");
}
L("n => n * 10")(10);
// 100
L("n => n * 10")(20);
// 200
L("n => n * 10")(30);
// 300
L("a, b => a + b")(10, 20);
// 30
L("a, b => a + b")(10, 5);
// 15

// 2-30 10,000번 선언해보기
console.time("익명 함수");
for (var i = 0; i < 10000; i++) {
  (function(v) {
    return v;
  })(i);
}
console.timeEnd("익명 함수");
// 익명 함수: 0.9ms ~ 1.7ms
console.time("new Function");
for (var i = 0; i < 10000; i++) {
  L("v => v")(i); // new Function
}
console.timeEnd("new Function");
// new Function: 337ms ~ 420ms

// 2-31 익명 함수와 문자열 화살표 함수
console.time("1");
var arr = Array(10000);
_.map(arr, function(v, i) {
  return i * 2;
});
console.timeEnd("1");
// 1: 0.5ms ~ 0.7ms
console.time("2");
var arr = Array(10000);
_.map(arr, L("v, i => i * 2")); // new Function
console.timeEnd("2");
// 2: 0.5ms ~ 0.8ms

// 2-32 eval로 한 번 더 감싼 경우
console.time("3");
var arr = Array(10000);
_.map(arr, eval("L('v, i => i * 2')")); // eval + new Function
console.timeEnd("3");
// 3: 0.6ms ~ 0.9ms

// 2-33 1,000배의 성능 차이
// (1)
console.time("4");
var arr = Array(10000);
_.map(arr, function(v, i) {
  return (function(v, i) {
    // 안에서 익명 함수를 한번 더 만들어 즉시 실행
    return i * 2;
  })(v, i);
});
console.timeEnd("4");
// 4: 0.8ms ~ 1.8ms
console.time("5");
var arr = Array(10000);
_.map(arr, function(v, i) {
  return L("v, i => i * 2")(v, i); // 안에서 문자열 화살표 함수로 함수를 만들어 즉시 실행
});
console.timeEnd("5");
// 5: 362ms ~ 480ms


// 2-34 메모이제이션 기법
// 원래의 L
function L(str) {
  var splitted = str.split('=>');
  return new Function(splitted[0], 'return (' + splitted[1] + ');');
}
// 메모이제이션 기법
function L2(str) {
  if (L2[str]) return L2[str]; // (1) 혹시 이미 같은 `str`로 만든 함수가 있다면 즉시 리턴
  var splitted = str.split('=>');
  return L2[str] = new Function(splitted[0], 'return (' + splitted[1] + ');');
  // 함수를 만든 후 L2[str]에 캐시하면서 리턴
}


// 2-35 코드 구조는 그대로이지만 성능은 다시 좋아졌다.
console.time('6');
var arr = Array(10000);
_.map(arr, function(v, i) {
  return L2('v, i => i * 2')(v, i);
});
console.timeEnd('6');
// 6: 0.5ms ~ 1.2ms



// 2-36 Partial.js의 문자열 화살표 함수
try { var has_lambda = true; eval('a=>a'); } catch (err) { var has_lambda = false; }
_.l = _.lambda = function f(str) {
  if (typeof str !== 'string') return str;
  if (f[str]) return f[str]; // (1)
  if (!str.match(/=>/)) return f[str] = new Function('$', 'return (' + str + ')'); // (2)
  if (has_lambda) return f[str] = eval(str); // (3) ES6
  var ex_par = str.split(/\s*=>\s*/);
  return f[str] = new Function( // (4)
    ex_par[0].replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*\s*:|this|arguments|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, '').match(/([a-z_$][a-z_$\d]*)/gi) || [],
    'return (' + ex_par[1] + ')');
};
console.log( _.l('(a, b) => a + b')(10, 10) );
// 20
console.log( _.l('a => a * 5')(10) );
// 50
console.log( _.l('$ => $ * 10')(10) );
// 100
// 사용하는 인자가 하나일 때 인자 선언부를 생략한 문자열 화살표 함수
console.log( _.l('$ * 10')(10) );
// 100
console.log( _.l('++$')(1) );
// 2





// 2-37 유명 함수 표현식
var f1 = function f() {
  console.log(f);
};


// 2-38 익명 함수에서 함수가 자신을 참조하는 법
var f1 = function() {
  console.log(f1);
};
f1();
// function() {
//   console.log(f1);
// }
// 위험 상황
var f2 = f1;
f1 = 'hi~~';
f2();
// hi~~;


// 2-39 익명 함수에서 함수가 자신을 참조하는 법2
var f1 = function() {
  console.log(arguments.callee);
};
f1();
// function() {
//   console.log(arguments.callee);
// }
var f2 = f1;
f1 = null;
f2();
// function() {
//   console.log(arguments.callee);
// }



// 2-40 유명 함수의 자기 참조
var f1 = function f() {
  console.log(f);
};
f1();
// function f() {
//   console.log(f);
// }
var f2 = f1;
f1 = null;
f2();
// function f() {
//   console.log(f);
// }



// 2-41 아주 안전하고 편한 자기 참조
var hi = 1;
var hello = function hi() {
  console.log(hi);
};
hello();
// function hi() {
//   console.log(hi);
// }
console.log(hi);
// 1
console.log(++hi);
// 2
hello();
// function hi() {
//   console.log(hi);
// }
console.log(hello.name == 'hi');
// true
var z1 = function z() {
  console.log(z, 1);
};
var z2 = function z() {
  console.log(z, 2);
};
z1();
// function z() {
//   console.log(z, 1);
// }
z2();
// function z() {
//   console.log(z, 2);
// }
console.log(z1.name == z2.name);
// true
// z;
// Uncaught ReferenceError: z is not defined



// 2-42 재귀를 이용한 `flatten`
function flatten(arr) {
  return function f(arr, new_arr) { // (1)
    arr.forEach(function(v) {
      Array.isArray(v) ? f(v, new_arr) : new_arr.push(v); // (3)
    });
    return new_arr;
  }(arr, []); // (2)
}
flatten([1, [2], [3, 4]]);
// [1, 2, 3, 4]
flatten([1, [2], [[3], 4]]);
// [1, 2, 3, 4]
flatten([1, [[2], [[3], [[4], 5]]]]);
// [1, 2, 3, 4, 5]




// 2-43 즉시 실행 + 유명 함수 기법이 아닌 경우
function flatten2(arr, new_arr) {
  arr.forEach(function(v) {
    Array.isArray(v) ? flatten2(v, new_arr) : new_arr.push(v); // (3)
  });
  return new_arr;
}
flatten2([1, [2], [3, 4]], []); // 항상 빈 Array를 추가로 넘겨야하는 복잡도 증가
function flatten3(arr, new_arr) {
  if (!new_arr) return flatten3(arr, []); // if 문이 생김
  arr.forEach(function(v) {
    Array.isArray(v) ? flatten3(v, new_arr) : new_arr.push(v); // (3)
  });
  return new_arr;
}
flatten3([1, [2], [3, 4]]); // 사용 부분은 [코드 2-42]과 동일해짐