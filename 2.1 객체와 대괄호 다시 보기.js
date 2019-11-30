// 2-1 다양한 key/value 정의 방법
var obj = { a: 1, b: 2 }; // (1)
obj.c = 3;
obj["d"] = 4; // (2)
var e = "e";
obj[e] = 5;
function f() {
  return "f";
}
obj[f()] = 6;
console.log(obj);
// { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

// 2-2 띄어쓰기, 특수문자, 숫자
// 띄어쓰기를 써도 key로 만들 수 있다.
var obj2 = { " a a a ": 1 };
obj2[" b b b "] = 2;
console.log(obj2);
// { " a a a ": 1, " b b b ": 2 }
// 특수문자를 써도 key로 만들 수 있다.
var obj3 = { "margin-top": 5 };
obj3["padding-bottom"] = 20;
console.log(obj3);
// { margin-top: 5, padding-bottom: 20 }
// 숫자도 key로 쓸 수 있다.
var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4);
// { 1: 10, 2: 20 }

// 2-3 코드가 실행되지 않는 key 영역
// var obj5 = { (true ? "a" : "b"): 1 };
// Uncaught SyntaxError: Unexpected token (

// 2-4 코드가 실행되는 key 영역
var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6);
// { a: 1 }

// 2-5 ES6에서 동작하는 {} 안쪽에서 대괄호 사용하기
var obj5 = { [true ? "a" : "b"]: 1 };
// { a: 1 }

// 2-6 함수를 객체로 사용
function obj8() {}
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a);
// 1
console.log(obj8.b);
// 2

// 2-7 호이스팅
obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b);
// 3
function obj9() {}

// 2-8 배열에 숫자가 아닌 key 사용하기
var obj10 = [];
obj10.a = 1;
console.log(obj10);
// [a: 1]
console.log(obj10.length);
// 0

// 2-9 배열에 숫자로 key 사용하기
var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11);
// [1, 2]
console.log(obj11.length);
// 2

// 2-10 한 번에 length 올리기
var obj12 = [];
obj12.length = 5;
console.log(obj12);
// Array[5]
var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13);
// [1, 2, 5: 5]
console.log(obj13.length);
// 6
obj13.push(6);
console.log(obj13);
// [1, 2, 5: 5, 6: 6]
console.log(obj13.length);
// 7

var l = 100000;
var list = [];
for (var i = 0; i < l; i++) {
  list.push(i);
}
// 3ms ~ 4.8ms
var l = 100000;
var list = [];
for (var i = 0; i < l; i++) {
  list[list.length] = i;
}
// 2.3ms ~ 3.4ms
var l = 100000;
var list = [];
list.length = l;
for (var i = 0; i < l; i++) {
  list[i] = i;
}
// 1.6ms ~ 2.2ms
var l = 100000;
var list = Array(l);
for (var i = 0; i < l; i++) {
  list[i] = i;
}
// 1.5ms ~ 1.97ms

// 2-11
console.log(obj13["len" + "gth"]);
// 7
obj13["len" + "gth"] = 10;
console.log(obj13.length);
// 10
obj13.push(11);
console.log(obj13);
// [1, 2, 5: 5, 6: 6, 10: 11]

// 2-12 기본 객체의 메서드 지우기
var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj["b"];
delete obj["C".toLowerCase()];
console.log(obj);
// {};
delete Array.prototype.push;
var arr1 = [1, 2, 3];
arr1.push(4);
// Uncaught TypeError: arr1.push is not a function
