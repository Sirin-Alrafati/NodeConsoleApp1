# JavaScript Automation Folder Structure

Implemented structure for this Fake Store API automation project:

```text
project-root/
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
├─ docs/
│  ├─ folder-structure.md
│  └─ test-matrix.md
├─ .github/workflows/
│  └─ api-tests.yml
├─ .env.example
├─ jest.config.js
├─ package.json
└─ README.md
```

## Why This Structure

- `src/client`: centralizes HTTP handling and avoids raw requests in tests
- `src/services`: groups endpoint logic by domain (products/carts/auth)
- `src/validation`: keeps JSON schema checks reusable and isolated
- `tests/specs`: keeps scenarios clear by API area
- `tests/reporters`: supports assignment requirement for CSV + HTML reporting
