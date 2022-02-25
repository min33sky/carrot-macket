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
