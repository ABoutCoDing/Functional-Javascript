// 1-1 addMaker
function addMaker(a) {
  return function(b) {
    return a + b;
  };
}
addMaker(10)(5); // 15

// 1-2 addMaker로 만든 함수
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9

// 1-3 값으로서의 함수
var v1 = 100;
var v2 = function() {};
function f1() {
  return 100;
}
function f2() {
  return function() {};
}

// 1-4 addMaker 다시보기
function addMaker(a) {
  return function(b) {
    return a + b;
  };
}
addMaker(10)(5); // 15
var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9
var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7
