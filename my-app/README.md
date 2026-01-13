# My App (Nx)

## How to run
- Serve: `npx nx serve my-app`
- Build: `npx nx build my-app`
- Lint: `npx nx lint my-app`
- Test: `npx nx test my-app`

## Workspace structure
- App: `my-app` (React app at repo root)
- Libs: `libs/ui` (shared UI), `libs/hooks` (React Query hooks), `libs/i18n` (i18next init + helpers)

## Architecture rules (module boundaries)
- Apps can depend on all libs.
- `type:ui` can depend on `type:hooks` and `type:i18n`.
- `type:hooks` can depend on `type:i18n`.
- Libs cannot import from apps.

## Affected demo (A4)
Command:
```
npx nx affected --targets=lint --targets=build --targets=test --uncommitted
```
Output:
```
NX   Running targets lint, build, test for 4 projects:
- my-app
- hooks
- i18n
- ui
NX   Successfully ran targets lint, build, test for 4 projects
```

Command:
```
npx nx show projects --affected --target build
```
Output:
```
my-app
hooks
i18n
ui
```

## CI command
```
nx affected -t lint,test,build --base=origin/main --head=HEAD
```
