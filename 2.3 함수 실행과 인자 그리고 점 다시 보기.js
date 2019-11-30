// 2-44 인자, this, arguments 출력
function test(a, b, c) {
  console.log("a b c: ", a, b, c);
  console.log('this:', this);
  console.log('arguments:', arguments);
}

// 2-45 실행하면서 넘긴 인자와 출력 된 정보들
test(10); // (1)
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10]
test(10, undefined); // (2)
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10, undefined]
test(10, 20, 30); // (3)
// a b c: 10 20 30
// this: Window {...}
// arguments: [10, 20, 30]


// 2-46 이게 맞아?
function test2(a, b) {
  b = 10;
  console.log(arguments);
}
test2(1); // (1)
// [1]
test2(1, 2); // (2)
// [1, 10]


// 2-47 객체의 값과 변수의 값
var obj1 = {
  0: 1,
  1: 2
};
console.log(obj1);
// { 0: 1, 1: 2 }
var a = obj1[0];
var b = obj1[1];
b = 10;
console.log(obj1);
// { 0: 1, 1: 2 } <------- 바뀌지 않음
console.log(obj1[1]);
// 2
console.log(b);
// 10             <------- b 만 바뀜


// 2-48 반대로 해보기
function test3(a, b) {
  arguments[1] = 10;
  console.log(b);
}
test3(1, 2);
// 10


// 2-49
test(10); // (1)
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10]
test(10, undefined); // (2)
// a b c: 10 undefined undefined
// this: Window {...}
// arguments: [10, undefined]
test(10, 20, 30); // (3)
// a b c: 10 20 30
// this: Window {...}
// arguments: [10, 20, 30]


// 2-50 메서드로 만들기
var o1 = { name: "obj1" };
o1.test = test;          // test 함수를 o1의 메서드로 할당
o1.test(3, 2, 1);
// a b c: 3 2 1
// this: Object {name: "obj1"}
// arguments: [3, 2, 1]
var a1 = [1, 2, 3];
a1.test = test;          // test 함수를 a1의 메서드로 할당
a1.test(3, 3, 3);
// a b c: 3 3 3
// this: Array [1, 2, 3]
// arguments: [3, 3, 3]


// 2-51
var o1_test = o1.test;
o1_test(5, 6, 7);
// a b c: 5 6 7
// this: Window {...}
// arguments: [5, 6, 7]


// 2-52
(a1.test)(8, 9, 10);
// a b c: 8 9 10
// this: Array [1, 2, 3]
// arguments: [8, 9, 10]
a1['test'](8, 9, 10);
// a b c: 8 9 10
// this: Array [1, 2, 3]
// arguments: [8, 9, 10]


// 2-53
console.log(test == o1.test && o1.test == a1.test);
// true


// 2-54
test.call(undefined, 1, 2, 3);
test.call(null, 1, 2, 3);
test.call(void 0, 1, 2, 3);
// a b c: 1 2 3
// this: Window {...}
// arguments: [1, 2, 3]


// 2-55
test.call(o1, 3, 2, 1);
// a b c: 3 2 1
// this: Object {name: "obj1"}
// arguments: [3, 2, 1]
test.call(1000, 3, 2, 1);
// a b c: 3 2 1
// this: Number 1000
// arguments: [3, 2, 1]


// 2-56
o1.test.call(undefined, 3, 2, 1);
// a b c: 3 2 1
// this: Window {...}
// arguments: [3, 2, 1]
o1.test.call([50], 3, 2, 1);
// a b c: 3 2 1
// this: Array [50]
// arguments: [3, 2, 1]


// 2-57
test.apply(o1, [3, 2, 1]);
// a b c: 3 2 1
// this: Object {name: "obj1"}
// arguments: [3, 2, 1]
test.apply(1000, [3, 2, 1]);
// a b c: 3 2 1
// this: Number 1000
// arguments: [3, 2, 1]
o1.test.apply(undefined, [3, 2, 1]);
// a b c: 3 2 1
// this: Window {...}
// arguments: [3, 2, 1]
o1.test.apply([50], [3, 2, 1]);
// a b c: 3 2 1
// this: Array [50]
// arguments: [3, 2, 1]


// 2-58
test.apply(o1, { 0: 3, 1: 2, 2: 1, length: 3 }); // Array가 아님
// a b c: 3 2 1
// this: Object {name: "obj1"}
// arguments: [3, 2, 1]
(function() {
  test.apply(1000, arguments);  // arguments 객체 역시 Array가 아님
})(3, 2, 1);
// a b c: 3 2 1
// this: Number 1000
// arguments: [3, 2, 1]


// 2-59
(function() {
  arguments.length--;
  test.apply(1000, arguments);
})(3, 2, 1);
// a b c: 3 2 undefined
// this: Number 1000
// arguments: [3, 2]
test.apply(1000, [1].concat([2, 3]));
// a b c: 1 2 3
// this: Number 1000
// arguments: [1, 2, 3]


// 2-60 네이티브 코드 활용하기
var slice = Array.prototype.slice;
function toArray(data) {
  return slice.call(data);
}
function rest(data, n) {
  return slice.call(data, n || 1);
}
var arr1 = toArray({ 0: 1, 1: 2, length: 2 });
// [1, 2]
arr1.push(3);
console.log(arr1);
// [1, 2, 3];
rest([1, 2, 3]);
// [2, 3];
rest([1, 2, 3], 2);
// [3]