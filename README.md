#App

Gympass style app

##RFs

- [X] Deve ser possível se cadastrar;
- [X] " se autenticar;
- [X] " obter o perfil de um usuário; logado;
- [X] " obter o número de check-ins realizados pelo usuário logado;
- [X] " o usuário obter seu histório de check-ins;
- [X] " o usuário buscar academias próximas;
- [X] " o usuário buscar academias pelo nome;
- [X] " o usuário realizar check-in em uma academia;
- [X] " validar o check-in de um usuário;
- [X] " cadastrar uma academia;

##RNs

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

##RNFs

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token)