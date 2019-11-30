// 2-61
// if (var a = 0) console.log(a);
// Uncaught SyntaxError: Unexpected token var

// 2-62
if (function f1() {}) console.log('hi');
// hi
// f1();
// Uncaught ReferenceError: f1 is not defined


// 2-63 이미 선언되어 있는 변수의 값 재할당
var a;
if (a = 5) console.log(a); // (1)
// 5
if (a = 0) console.log(1); // (2)
else console.log(a);
// 0
if (!(a = false)) console.log(a); // (3)
// false
if (a = 5 - 5); // (4)
else console.log(a);
// 0


// 2-64
var obj = {};
if (obj.a = 5) console.log(obj.a);
// 5
if (obj.b = false) console.log(obj.b); // (2)
else console.log('hi');
// hi
var c;
if (c = obj.c = true) console.log(c); // (3)
// true



// 2-65
function add(a, b) {
  return a + b;
}
if (add(1, 2)) console.log('hi1');
var a;
if (a = add(1, 2)) console.log(a);
// 3
if (function() { return true; }()) console.log('hi');
// hi


// 2-66
var a = true;
var b = false;
var v1 = a || b;
console.log(v1);
// true
var v2 = b || a;
console.log(v2);
// true
var v3 = a && b;
console.log(v3);
// false
var v4 = b && a;
console.log(v4);
// false


// 2-67
var a = "hi";
var b = "";
var v1 = a || b; // (1) `a`가 긍정적인 값이면 `||` 이후를 확인하지 않아 `a` 값이 `v1`에 담긴다.
console.log(v1);
// "hi"
var v2 = b || a; // (2) `b`가 부정적이여서 `a`를 확인 했고 `a`의 값이 담겼다.
console.log(v2);
// "hi"
var v3 = a && b; // (3) `a`가 긍적적인 값이어서 `&&` 이후를 확인하게 되고 `b` 값이 담긴다.
console.log(v3);
// ""
var v4 = b && a; // (4) `b`가 부정적인 값이어서 `&&` 이후를 확인할 필요 없이 `b` 값이 담긴다.
console.log(v4);
// ""


// 2-68
console.log(0 && 1);
// 0
console.log(1 && 0);
// 0
console.log([] || {});
// []
console.log([] && {});
// {}
console.log([] && {} || 0);
// {}
console.log(0 || 0 || 0 || 1 || null);
// 1
console.log(add(10, -10) || add(10, -10));
// 0
console.log(add(10, -10) || add(10, 10));
// 20
var v;
console.log((v = add(10, -10)) || v++ && 20);
// 0
var v;
console.log((v = add(10, -10)) || ++v && 20);
// 20


// 2-69 if else 대체 하기
/*
function addFriend(u1, u2) {
  if (u1.friends.indexOf(u2) == -1) {
    if (confirm("친구로 추가할까요?")) {
      u1.friends.push(u2);
      alert('추가 되었습니다.');
    }
  } else {
    alert('이미 친구입니다.')
  }
}
var pj = { name: "PJ", friends: [] };
var ha = { name: "HA", friends: [] };
console.log(addFriend(pj, ha));
// 친구로 추가할까요? -> 확인 -> 추가 되었습니다.
console.log(addFriend(pj, ha));
// 이미 친구입니다.
function addFriend2(u1, u2) {
  (u1.friends.indexOf(u2) == -1 || alert('이미 친구입니다.')) &&
  confirm("친구로 추가할까요?") && u1.friends.push(u2) && alert('추가 되었습니다.');
}
var pj = { name: "PJ", friends: [] };
var ha = { name: "HA", friends: [] };
console.log(addFriend2(pj, ha));
// 친구로 추가할까요? -> 확인 -> 추가 되었습니다.
console.log(addFriend2(pj, ha));
// 이미 친구입니다.
*/


// 2-70
var a = false;
var b = a ? 10 : 30;
console.log(b);
// 30


// 2-71
var a = false;
var c = a ? 10 : function f(arr, v) {
  if (!arr.length) return v;
  v += arr.shift();
  return f(arr, v);
} ([1, 2, 3], 0); // <--- 즉시 실행
console.log(c);
// 6


// 2-72
var c = a ? 10 : function f(arr, v) {
  return arr.length ? f(arr, v + arr.shift()) : v;
} ([1, 2, 3], 0);
console.log(c);
// 6


