// 1-5 for문으로 필터링하기
var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 }
];
// (1)
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
// 4
// (2)
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);
// [25, 28, 27, 24]
// (3)
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length);
// 3
// (4)
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]

// 1-6 filter
// 기존 코드
/*
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4
*/
// 바꾼 코드
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}

// 1-7 filter 사용
// predicate
var users_under_30 = filter(users, function(user) {
  return user.age < 30;
});
console.log(users_under_30.length);
// 4
var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);
// [25, 28, 27, 24]
// predicate
var users_over_30 = filter(users, function(user) {
  return user.age >= 30;
});
console.log(users_over_30.length);
// 3
var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]

// 1-8 map
// 기존 코드
/*
var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages);
var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names);
 */
// 바꾼 코드
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}

// 1-9 map 사용
var users_under_30 = filter(users, function(user) {
  return user.age < 30;
});
console.log(users_under_30.length);
// 4
// iteratee
var ages = map(users_under_30, function(user) {
  return user.age;
});
console.log(ages);
// [25, 28, 27, 24]
var users_over_30 = filter(users, function(user) {
  return user.age >= 30;
});
console.log(users_over_30.length);
// 3
// iteratee
var names = map(users_over_30, function(user) {
  return user.name;
});
console.log(names);
// ["ID", "BJ", "JM"]

// 1-10 함수 중첩
var ages = map(
  filter(users, function(user) {
    return user.age < 30;
  }),
  function(user) {
    return user.age;
  }
);
console.log(ages.length);
// 4
console.log(ages);
// [25, 28, 27, 24]
var names = map(
  filter(users, function(user) {
    return user.age >= 30;
  }),
  function(user) {
    return user.name;
  }
);
console.log(names.length);
// 3
console.log(names);
// ["ID", "BJ", "JM"]

// 1-11 함수 중첩2
function log_length(value) {
  console.log(value.length);
  return value;
}
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age < 30;
      }),
      function(user) {
        return user.age;
      }
    )
  )
);
// 4
// [25, 28, 27, 24]
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age >= 30;
      }),
      function(user) {
        return user.name;
      }
    )
  )
);
// 3
// ["ID", "BJ", "JM"]

// 1-12 filter, map
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}
function log_length(value) {
  console.log(value.length);
  return value;
}
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age < 30;
      }),
      function(user) {
        return user.age;
      }
    )
  )
);
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age >= 30;
      }),
      function(user) {
        return user.name;
      }
    )
  )
);

// 1-13 함수를 리턴하는 함수 bvalue
// 1.1의 addMaker
function addMaker(a) {
  return function(b) {
    return a + b;
  };
}
function bvalue(key) {
  return function(obj) {
    return obj[key];
  };
}

bvalue("a")({ a: "hi", b: "hello" }); // hi

// 1-14 bvalue로 map의 iteratee 만들기
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age < 30;
      }),
      bvalue("age")
    )
  )
);
console.log(
  log_length(
    map(
      filter(users, function(user) {
        return user.age >= 30;
      }),
      bvalue("name")
    )
  )
);

// 1-15 화살표 함수와 함께
// ES6
console.log(
  log_length(
    map(
      filter(users, u => u.age < 30),
      u => u.age
    )
  )
);
console.log(
  log_length(
    map(
      filter(users, u => u.age >= 30),
      u => u.name
    )
  )
);
// 아니면 이것도 괜찮다.
var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;
console.log(log_length(map(filter(users, under_30), u => u.age)));
console.log(log_length(map(filter(users, over_30), u => u.name)));
// 아니면 이것도
var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);
console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));
// 마지막으로 한 번만
var bvalues = key => list => map(list, v => v[key]);
var ages = bvalues("age");
var names = bvalues("name");
// bvalues 정도가 있으면 화살표 함수가 아니어도 충분히 간결해진다.
function bvalues(key) {
  return function(list) {
    return map(list, function(v) {
      return v[key];
    });
  };
}
var ages = bvalues("age");
var names = bvalues("name");
var under_30 = function(u) {
  return u.age < 30;
};
var over_30 = function(u) {
  return u.age >= 30;
};
console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));
// bvalues는 이렇게도 할 수 있다. (진짜 마지막)
function bvalues(key) {
  var value = bvalue(key);
  return function(list) {
    return map(list, value);
  };
}
