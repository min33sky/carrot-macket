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
