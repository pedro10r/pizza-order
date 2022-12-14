## Pizza Order

### App construído com React Native (Expo bare workflow)

#### Como instalar:

Depois de clonar o repo na sua máquina, na pasta do projeto rode: `npm install --force`, depois disso, se estiver no mac rode: `npx pod-install ios` ou `cd ios && pod install && cd ..`.

#### Tecnologias:

_React Native_ • _Expo_ • _Typescript_ • _React Navigation => Stack e Bottom Tabs_ • _Styled Components_ • _Expo Fonts_ • _Babel Plugin Module Resolver (Para organizar as importações dos arquivos mais usados no projeto)_ • _Contexts e Hooks_ • _Firebase => Authentication; Firestore; Storage_ • _Async Storage_ • *Linear Gradient*...

#### O que foi feito?

Começando pela interface de login, o app faz a autenticação pelo firebase authentication, logIn, logOut e equeci minha senha, além de persistir a autenticação no dispositivo do user com Async Storage. O app tem 2 tipos de users, Admin e Garçom, o Admin pode cadastrar as pizzas e ver a lista de cadastro e a navegação é em stack, na interface do Garçom ele poderá anotar o pedido das mesas podendo acompanhar o status do pedido e conta com os 2 tipos de navegação, stack e bottom tabs. A bottom tab é totalmente personalizada.

#### Screenshots

<div>
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/login.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/admin_1.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/admin_2.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/admin_3.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/waiter_1.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/search.png">
  <img align="center" alt="1" height="380em" width="180em" src="https://github.com/pedro10r/pizza-order/blob/main/src/assets/screenshots/waiter_2.png">
</div>
