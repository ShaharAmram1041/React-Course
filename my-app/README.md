1. Starting Advanced 1 from commit 235ebcaa. API used: 'https://fakestoreapi.com/products'


2. The locales i used is English and Hebrew.


3. 
**Interpolation**
   - `fetchSuccess` → Used in `Home.tsx` toast notification after product fetch

**Pluralization**
   - `fetchSuccess` → Uses `count` to show singular/plural messages correctly

**<Trans /> usage**
   - `price.details` → Used in `ProductData.tsx` to format the price with `<strong>`



4. LocalStorage Key & Default Theme:

LocalStorage Key: theme
Default Theme: lara-light-blue from 


5. Nx affected outputs (A4):

Command:
```
npx nx affected -t lint,build,test
(npx nx affected --targets=lint --targets=build --targets=test --uncommitted --no-tui
) for my version
```
Output:
```
√  nx run i18n:build  [local cache]
   √  nx run ui:lint  [existing outputs match the cache, left as is]                            
   √  nx run i18n:lint  [existing outputs match the cache, left as is]                          
   √  nx run hooks:lint  [existing outputs match the cache, left as is]                         
   √  nx run my-app:test (787ms)
   √  nx run i18n:test (603μs)
   √  nx run ui:build  [local cache]                                                            
   √  nx run ui:test (657μs)                                                                    
   √  nx run hooks:build  [local cache]
   √  nx run hooks:test (629μs)                                                                 
   √  nx run my-app:lint (6s)
   √  nx run my-app:build (14s)

——————————————————————————————————————————————————————————————————————————————————————————————— 

 NX   Successfully ran targets lint, build, test for 4 projects (14s)

Nx read the output from the cache instead of running the command for 6 out of 12 tasks.
```

Command:
```
npx nx print-affected -t build
(npx nx show projects --affected --target build) for my version
```
Output:
```
my-app
hooks
i18n
ui
```
