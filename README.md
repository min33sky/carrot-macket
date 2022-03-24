# Carrot Macket

> 당근 마켓 클론

## Stacks

- nextjs
- tailwindcss
- prisma
- planetscale (mysql)

## Coding Note

### react-hook-form

1. `register`는 `input` 태그에서만 적용이 가능하므로 별도의 Input 컴포넌트로
   래핑했을 때는 register를 props로 넘겨줘야 한다.

```ts
// home.tsx
import { useForm } from 'react-hook-form';

const { register } = useForm();

return <Input register={register('name')} />;

// Input.tsx
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
  register: UseFormRegisterReturn;
}

export function Input({ register }: IInput) {
  return <input {...register} />;
}
```

2. `setError`로 생성한 에러를 초기화하기

- useForm의 `clearErrors` 함수를 `register`의 onChange 콜백으로 설정하면 에러가 초기화된다.

```ts
const {
  register,
  handleSubmit,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
} = useForm<IEditForm>();

<InputWithLabel
  register={register('phone', { onChange: () => clearErrors('formErrors') })}
  name="phone"
  method="phone"
  label="Phone"
  placeholder="전화번호를 입력해주세요."
/>;
```

### Prisma

1. TypeError: Do not know how to serialize a BigInt 해결하기

```ts
declare global {
  interface BigInt {
    toJSON: () => void;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};
```

2. `npx prisma db seed` 명령어 호출 시 **SyntaxError: Cannot use import statement outside a module** 에러 발생

- prisma/seed.ts가 `NextJS`의 외부에 위치해 있기 때문에 발생하는 에러
- ts-node의 옵션을 아래와 같이 지정하면 해결된다.

```json
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
```

3. `Prisma Studio`에서 **length** 관련 에러가 발생하는 경우

- `F12`를 눌러 애플리케이션 탭에 들어가서 indexedDB를 초기화해주면 해결된다.

### Typescript

1. 인덱스 시그니처를 사용할 때 발생하는 에러 해결하기

- 인덱스 시그니처는 객체가 <Key,Value> 형식이며, Key&Value의 타입을 정확히 명시해야 사용 가능
- key의 type은 `string`, `number`, `symbol`, `template literal`만 가능

```ts
type KindType = 'favorites' | 'sales' | 'purchases';

// ERROR!!!
interface ITemp {
  [key: KindType]: IProductsList[]; // key type이 인덱스 시그니처로 사용할 수 없는 타입
}

// OK!!!! :)
type IProductResponse = {
  [key in KindType]: IProductsList[]; // template literal로 선언해 해결
};
```

### NextJS

1. [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 오류

- 서버에서 클라이언트로 둘 이상의 응답을 보낼경우 발생한다.
- 중간에 클라이언트로 응답을 보낼경우 (예를 들면, DB를 변경할 때 에러가 발생할 경우) `return res.status(400)` 으로 처리

### Planetscale

1. `pscale connect DB_NAME` 명령 시 다음 에러가 발생한다면 `pscale auth login`을 입력해서 로그인을 하자.

```
Error: internal error, response body doesn't match error type signature with the following output:
{"error":"invalid_token","error_description":"The access token is invalid","state":"unauthorized"}
```
