# Endpoint Test Matrix (Implemented)

Base URL: `https://fakestoreapi.com`

## Coverage by Endpoint

| Area | Endpoint | Method | Scenarios Covered |
|---|---|---|---|
| Products | `/products` | GET | status and shape, fields, limit, sort, invalid limit |
| Products | `/products/:id` | GET | valid ID, schema for selected product, unknown ID edge case |
| Products | `/products/categories` | GET | status + non-empty categories |
| Products | `/products/category/:name` | GET | valid category, encoded category (`men's clothing`), invalid category edge case |
| Carts | `/carts` | GET | status and shape, limit, sort, date range, invalid sort |
| Carts | `/carts/:id` | GET | valid ID and product line structure, unknown ID edge case |
| Carts | `/carts/user/:userId` | GET | valid user filter and unknown user edge case |
| Auth | `/auth/login` | POST | valid login token, missing username/password, wrong password, empty body |
| Platform | `/invalid-endpoint` | GET | 404 not found validation |
| Platform | `/products/:id` | DELETE | negative behavior / non-standard API behavior handling |

## Test Files and Test Count

| File | Focus | Number of Tests |
|---|---|---|
| `tests/specs/products.spec.js` | Products positive/negative/edge + schema | 12 |
| `tests/specs/carts.spec.js` | Carts positive/negative/edge + schema | 11 |
| `tests/specs/auth.spec.js` | Auth login positive/negative | 5 |
| `tests/specs/platform.spec.js` | Platform-level negative/edge checks | 5 |
| **Total** |  | **33** |

## Mandatory Requirement Mapping

- Minimum 25 tests: **Met** (`33` tests)
- Reusable client/service layer: **Met** (`src/client/apiClient.js`, `src/services/*`)
- Logging: **Met** (`src/utils/logger.js`)
- Assertions: **Met** (`tests/helpers/assertions.js`)
- Schema validation for at least 2 endpoints: **Met** (`productSchema`, `cartSchema`)
- Report generation: **Met** (HTML + CSV in `reports/`)

## Run Commands

```bash
npm test
npm run test:report
```
