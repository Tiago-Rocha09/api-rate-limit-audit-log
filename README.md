# API – Rate Limit & Audit Log (Fastify + TDD)

API backend em **Node.js + Fastify**, desenvolvida com foco em **qualidade de código** e **arquitetura**.

O projeto resolve dois problemas comuns em APIs:

* **Rate limit** para evitar abuso de requisições
* **Audit log** para rastreabilidade de ações

Tudo foi desenvolvido seguindo **Test-Driven Development (TDD)**.

---

## 🧠 Principais Conceitos

* **TDD**: regras de negócio escritas primeiro nos testes (RED → GREEN → REFACTOR)
* **Separação de responsabilidades**: domínio desacoplado de HTTP e Fastify
* **TypeScript forte**: interfaces como limites do sistema, types para dados

---

## 🏗️ Estrutura

```
src/
 ├── rate-limit/     # regra de rate limit
 ├── audit/          # regra de audit log
 └── infra
        └── fastify/  # camada HTTP
        └── redis/    # camada de persistência

tests/
 ├── unit/           # testes de domínio
 └── integration/    # testes HTTP
```

---

## 🔐 Rate Limit

* Limite configurável de requisições por chave
* Aplicado via hook `onRequest`
* Retorna **429 Too Many Requests** ao exceder o limite

---

## 🧾 Audit Log

* Registra: ação, IP, rota, método HTTP e status
* Executado no hook `onResponse`
* Garante auditoria baseada no resultado final da requisição

---

## 🧪 Testes

* **Unitários**: regras de negócio isoladas
* **Integração**: Fastify + hooks + domínio (Jest + Supertest)

---

## ▶️ Executando

```bash
npm install
npm run dev
```

Endpoint de teste:

```bash
curl http://localhost:3000/health
```

---

## 🚀 Possíveis Evoluções

* Janela de tempo (TTL) no rate limit
* Redis como persistência
* Autenticação e identificação de usuário
* Observabilidade e métricas

---

## 📌 Observação

Este projeto foi criado com foco em **clareza técnica** e **boas práticas**, não em volume de funcionalidades.
