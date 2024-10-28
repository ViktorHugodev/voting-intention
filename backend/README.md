backend
├── .env
├── .eslintrc.js
├── .prettierrc
├── .vscode
│   └── settings.json
├── README.md
├── api.http
├── combined.json
├── combined.log
├── converter.ts
├── estimativa-2024.json
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations

│   └── schema.prisma
├── src
│   ├── P1.csv
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── assets
│   │   └── estimativa-2024.json
│   ├── estimativa-2024.json
│   ├── main.ts
│   ├── modules
│   │   ├── calculation
│   │   │   ├── calculation.controller.spec.ts
│   │   │   ├── calculation.controller.ts
│   │   │   ├── calculation.module.ts
│   │   │   ├── calculation.service.spec.ts
│   │   │   ├── calculation.service.ts
│   │   │   ├── dto
│   │   │   │   ├── create-calculation.dto.ts
│   │   │   │   └── update-calculation.dto.ts
│   │   │   └── entities
│   │   │       └── calculation.entity.ts
│   │   ├── import
│   │   │   ├── dto
│   │   │   │   ├── create-import.dto.ts
│   │   │   │   └── update-import.dto.ts
│   │   │   ├── entities
│   │   │   │   └── import.entity.ts
│   │   │   ├── import.controller.spec.ts
│   │   │   ├── import.controller.ts
│   │   │   ├── import.module.ts
│   │   │   ├── import.service.spec.ts
│   │   │   └── import.service.ts
│   │   ├── sync
│   │   │   ├── dto
│   │   │   │   ├── create-sync.dto.ts
│   │   │   │   └── update-sync.dto.ts
│   │   │   ├── entities
│   │   │   │   └── sync.entity.ts
│   │   │   ├── sync.controller.spec.ts
│   │   │   ├── sync.controller.ts
│   │   │   ├── sync.module.ts
│   │   │   ├── sync.service.spec.ts
│   │   │   └── sync.service.ts
│   │   └── voting-intention
│   │       ├── voting-intention.service.spec.ts
│   │       └── voting-intention.service.ts
│   ├── providers
│   │   └── prisma
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   └── types
│       └── express
│           └── index.d.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── uploads