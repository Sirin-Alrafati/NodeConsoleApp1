# QA Automation Assignment - Fake Store API

Automated API testing framework for `https://fakestoreapi.com` focused on Products, Carts, and Auth endpoints.

## Assignment Scope Covered

- Test design and coverage with positive, negative, and edge scenarios
- Clean automation framework with reusable API client and service layer
- Logging, assertions, and schema validation
- Report generation in HTML and CSV formats
- CI workflow for automated execution in GitHub Actions

## Tech Stack

- Language: JavaScript (Node.js)
- Test Framework: Jest
- HTTP Client: Axios
- Schema Validation: Ajv
- Logging: Winston
- Reports: `jest-html-reporters` + custom CSV reporter

## Prerequisites

- Node.js `>=18` (LTS recommended)
- npm
- Internet access (tests call public Fake Store API)

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Default values:

```env
BASE_URL=https://fakestoreapi.com
REQUEST_TIMEOUT_MS=15000
LOG_LEVEL=info
```

## Project Structure

```text
.
├─ src/
│  ├─ client/
│  │  └─ apiClient.js
│  ├─ config/
│  │  └─ env.js
│  ├─ services/
│  │  ├─ authService.js
│  │  ├─ cartsService.js
│  │  └─ productsService.js
│  ├─ utils/
│  │  └─ logger.js
│  └─ validation/
│     ├─ schemas.js
│     └─ validator.js
├─ tests/
│  ├─ helpers/
│  │  └─ assertions.js
│  ├─ reporters/
│  │  └─ csvReporter.js
│  ├─ setup/
│  │  └─ jest.setup.js
│  └─ specs/
│     ├─ auth.spec.js
│     ├─ carts.spec.js
│     ├─ platform.spec.js
│     └─ products.spec.js
├─ reports/
├─ logs/
└─ .github/workflows/api-tests.yml
```

## Endpoints Under Test

- Products:
  - `GET /products`
  - `GET /products/categories`
  - `GET /products/category/:name`
  - filtering/sorting with query params (`limit`, `sort`)
- Carts:
  - `GET /carts`
  - `GET /carts/:id`
  - `GET /carts/user/:userId`
  - date range and limit/sort queries
- Auth:
  - `POST /auth/login` (returns token)

## Test Suite Details

- Total tests: **33**
- Includes:
  - Positive scenarios
  - Negative scenarios
  - Edge cases
- Includes schema validation for at least 2 endpoints:
  - Product schema (`/products`)
  - Cart schema (`/carts`)

## How To Run Tests

Run all tests:

```bash
npm test
```

Run tests in CI mode:

```bash
npm run test:ci
```

Run tests with coverage:

```bash
npm run test:report
```

## Report Generation / Viewing

After test execution:

- HTML report: `reports/html/report.html`
- CSV report: `reports/results.csv`
- Coverage report: `reports/coverage/`

To view HTML report locally, open:

`reports/html/report.html`

## Logging

- Logs are generated in:
  - `logs/automation.log`
- Request and response status logging is handled in `src/client/apiClient.js`.

## CI Information

GitHub Actions workflow file:

- `.github/workflows/api-tests.yml`

Workflow actions:

- Installs dependencies with `npm ci`
- Executes test suite
- Uploads HTML and CSV reports as artifacts

## Notes

- Fake Store API is a public external service; occasional transient failures may happen due to network or upstream instability.
