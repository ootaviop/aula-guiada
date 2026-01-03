>> Notei que será necessário criar uma interface compartilhada por todos os componentes da página para que eu consiga passar o parâmetro ativado ou não.
    >> Isso servirá na hora que o vídeo entrar.

------------------------ *** ------------------------
# Quando eu tenho uma estrutura como:

```tsx
<Page>
     <PageHeader />
     <PageBody /> 
</Page>
```

## Para definir o tipo de 'children' do componente <Page /> fazemos a importação do tipo ReactNode do react.

    >> import type { ReactNode } from 'react';

## Depois adicionamos um tipo de nome ComponenteProps e definimos o valor de 'children' com o tipo importado, 'ReactNode'.

    >> type PageProps = {
    >>  children: ReactNode;
    >> };

## E então nas props do componente evidenciamos que children é do tipo 'ComponentProps' instanciado no arquivo do próprio componente. 

    >> export default function Page({ children }: PageProps){}
------------------------ *** ------------------------

     