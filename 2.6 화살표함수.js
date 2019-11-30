// 2-84 익명 함수와 화살표 함수 비교
// 한 줄 짜리 함수
var add = function(a, b) { return a + b; };
var add = (a, b) => a + b;
// 두 줄 이상의 함수
var add2 = function(a, b) {
  var result = a + b;
  return result;
};
var add2 = (a, b) => {
  var result = a + b;
  return result;
}


// 2-85
// 인자가 없는 함수
var hi = function() {
  console.log('hi');
};
var hi = () => console.log('hi');
hi();
// 인자가 하나인 함수
var square = function(a) {
  return a * a;
};
var square = a => a * a;


// 2-86 identity와 constant
var identity = function(v) {
  return v;
};
var identity = v => v;
var constant = function(v) {
  return function() {
    return v;
  }
};
var constant = v => () => v;


// 2-87
var gte = (a, b) => a <= b;
var lte = (a, b) => a >= b;
gte(1, 1);
// true
gte(1, 2);
// true
lte(1, 1);
// true
lte(2, 1);
// true


// 2-88
(function() {
    console.log(this, arguments);
    // {hi: 1} [1, 2, 3]
    (()=> {
        console.log(this, arguments);
        // {hi: 1} [1, 2, 3]
        (()=> {
            console.log(this, arguments);
            // {hi: 1} [1, 2, 3]
        }) ();
    }) ();
}).call({ hi: 1 }, 1, 2, 3)


// 2-89
[1, 2, 3].map(function(v) {
    return v * 2;
});
// [2, 4, 6]
[1, 2, 3].map(v => v * 2);
// [2, 4, 6]
[1, 2, 3, 4, 5, 6].filter(function(v) {
    return v > 3;
});
// [4, 5, 6]
[1, 2, 3, 4, 5, 6].filter(v => v > 3);
// [4, 5, 6]
[1, 2, 3].reduce(function(a, b) {
    return a + b;
});
// 6
[1, 2, 3].reduce((a, b) => a + b);
// 6


// 2-90
function log(arg) {
  console.log(arg);
}
((a, b) => (f => f(f)) (f => log(a) || a++ == b || f(f)))(1, 5);
// 1 2 3 4 5


// 2-91
(function(a, b) {
  (function(f) {
    f(f);
  }) (function(f) {
    log(a) || a++ == b || f(f);
  });
})(6, 10);
// 6 7 8 9 10


// 2-92
((a, b) => (f => f(f)) (f => log(a) || a++ == b || f(f)))(1, 5);
/* 기억      재귀 시작                    ( 조건부 )     재귀    실행 */
// 1 2 3 4 5


// 2-93
var start = f => f(f);
var logger = (a, b) => start(f => log(a) || a++ == b || f(f));
logger(6, 10);
// 6 7 8 9 10
// 위와 동일한 코드를 function 키워드를 사용하여 확인
var start = function(f) {
  f(f);
};
var logger = function(a, b) {
  start(function(f) {
    log(a) || a++ == b || f(f);
  })
};
logger(1, 5);
// 1 2 3 4 5


// 2-94
((a) => start(f => log(a) || --a && f(f)))(5);
// 5 4 3 2 1


// 2-95

var each = (arr, iter, i=0) => start(f => iter(arr[i]) || ++i < arr.length && f(f));
each([5, 2, 4, 1], function(v) {
  console.log(v);
});
// 5 2 4 1
each(['a', 'b', 'c'], function(v) {
  console.log(v);
});
// a b c