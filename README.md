# Payuguru Front End

Fron-end application


## RELEASE COMMANDS

### Patch Release: Small bug fixes

```bash
npm run release -- --release-as patch
```

### Minor Release: New features, backward compatible

```bash
npm run release -- --release-as minor
```

### Major Release: Breaking changes

```bash
npm run release -- --release-as major
```



## RUN APPLICATION

```bash

pm2 start npm --name payuguru --watch --ignore-watch="node_modules" -- -e .env start
```

## PRODUCTION SETUP

```bash
npm run build
```


```bash
npm i -g pm2

```

```bash
npm i -g serve

```
```bash
serve -s build

```
```bash
pm2 start "serve -s build" --name payuguru --watch
```

```bash
pm2 save
```

```bash
pm2 savestartup
```

## Docker Image Build

```bash

npm run docker:build
```

```bash
npm run 
```
# Note:

### Extra Tip Package Updates

```bash
npm install -g npm-check-updates
```
```bash
ncu
```
```bash
ncu -u
```
```bash
npm update --save
```
## OR

```bash
npm install
```







