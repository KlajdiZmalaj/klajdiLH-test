## Hunger Net Version 1.0.0

## Features:

- React 18 + Typescript + Firebase
- CSS -> Scss and Ant Design (for modals and notifications etc...)
- ReduxJs , Redux Saga middleware

How to use:
There are 3 roles types that can be logged in : admin,manager,client
Admin is created from database, manger can be created by admin, client can be registred by itself

Each role has its own permissions (based on permission componets and functions are generated) :

- Admin => [*] (all)
- Manager => ["order.view","order.update","order.create","menu.view","menu.create","menu.update","menu_item.view","menu_item.create","menu_item.update"];
- Client => ["restaurant.view","order.view","order.create","order.delete"];

Role admin and manager has view Dashboard as its route and client has view ClientView as its route.

Firebase Users :

- Admin => username:root , password:12345
- Manager => username:mondi , password:123
- Client => username:kz7 , password:123

## Improvements todo:

- Project is 90% typed, there are some more types to add in future
- Login can be improved AuthToken or any backend tools (right now we get all users on firebase database and we check for password and username === :p)
- Css responsive media queries
- Jest test to be done

## Folder structure >

Entry folder is **src** (Even if you are deep inside folder treee it searches first from **src**).

Folder Tree ( rectangular[] ->folder ) === (rhombus<> -> file with extension)

![enter image description here](https://raw.githubusercontent.com/KlajdiZmalaj/react-boilerplate/main/readmeAssets/mermaid-diagram-20210915152031.svg)

![enter image description here](https://raw.githubusercontent.com/KlajdiZmalaj/react-boilerplate/main/readmeAssets/mermaid-diagram-20210915152038.svg)

![enter image description here](https://raw.githubusercontent.com/KlajdiZmalaj/react-boilerplate/main/readmeAssets/mermaid-diagram-20210915152046.svg)