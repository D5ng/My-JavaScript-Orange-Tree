## 콜백 함수(Callback Function)

콜백 함수란, 다른 함수의 매개변수로 전달되는 함수를 말한다. 콜백 함수가 가능한 이유는 자바스크립트의 함수는 일급 객체이기 때문이다. 일급 객체는, 다음과 같은 조건을 만족해야 한다.

- 변수에 할당할 수 있어야 한다.
- 매개변수로 함수를 전달할 수 있어야 한다.
- 함수의 반환 값으로 사용할 수 있다.

콜백 함수에서의 this는 왜 전역 객체를 바라보게 될까? 이를 이해하기 위해선 this가 어떻게 동작하는지 알아야한다.

### this

this는 함수가 일반 함수로 호출되는지, 메서드로 호출되는지에 따라 동적으로 결정된다. 일반 함수로 호출될 경우, strict mode가 아닐 때는 전역 객체(window 또는 global)를 가리키지만, strict mode에서는 undefined가 된다. 반면, 메서드로 호출되면 this는 해당 메서드를 호출한 객체에 바인딩된다.

특히, `addEventListener`와 같은 메서드는 내부적으로 this가 이벤트를 등록한 요소를 가리키도록 구현되어 있다.
이러한 this의 동작 방식 때문에 콜백 함수 내부에서의 this는 기본적으로 전역 객체를 가리키게 된다.

자바스크립트의 일부 메서드는 this를 바인딩할 수 있도록 매개변수로 this 값을 전달받도록 구현되어 있다. 또한, `Function.prototype.apply, call, bind` 메서드로 명시적인 this 바인딩도 가능하다.

> [!NOTE]
> 화살표 함수에서는 this 바인딩이 없기 때문에, 상위 스코프(호출된 함수가 선언될 당시의 Lexical Environment)를 참조하도록 되어있다.

### 확장성

콜백 함수는 다른 함수에게 제어권을 넘긴다는 특징을 가진다. 즉, 콜백 함수의 실행 시점은 직접 호출하는 것이 아니라, 호출된 함수가 결정한다. 이러한 특징은 확장성과도 밀접한 관련이 있다. 확장성이 높다는 것은 기존 코드를 크게 수정하지 않고도 새로운 기능을 쉽게 추가할 수 있는 것을 의미한다. 따라서, 직접 함수를 호출하는 방식보다 제어권을 다른 함수에 위임하는 방식이 확장성을 높이는 데 유리하다.

### 콜백 지옥

콜백 지옥은 특히 비동기 코드에서 더욱 두드러지게 나타난다. 가독성 문제도 있지만, 더 중요한 것은 에러 처리를 위해 각 콜백마다 개별적으로 처리해야 하는 번거로움이 있다는 점이다. 이로 인해 중복 코드가 발생하여, DRY 원칙을 위반하는 문제도 생긴다. 이런 부분들이 점차 커지다보면 유지보수에도 영향을 끼치게 된다.

이러한 구조를 개선한 것이 바로 `Promise`이다. Promise는 에러 전파 기능을 활용하여 단 하나의 catch문으로 모든 에러를 처리할 수 있도록 개선되었다.

```js
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 완료");
    callback(null, "Step 1 결과");
  }, 1000);
}

function step2(data, callback) {
  setTimeout(() => {
    console.log("Step 2 완료");
    callback(null, "Step 2 결과");
  }, 1000);
}

function step3(data, callback) {
  setTimeout(() => {
    console.log("Step 3 완료");
    callback(null, "Step 3 결과");
  }, 1000);
}

step1((err, result1) => {
  if (err) return console.error(err);
  step2(result1, (err, result2) => {
    if (err) return console.error(err);
    step3(result2, (err, result3) => {
      if (err) return console.error(err);
      console.log("모든 작업 완료!", result3);
    });
  });
});
```
