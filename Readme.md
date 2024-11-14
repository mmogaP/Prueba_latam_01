# Formato de creación node.js

## Inicializar proyecto

```
npm init -y
```

## Crear carpetas con archivos

```
mkdir src
mkdir dist
```

## Instalar dependencias

```
npm install -D typescript @types/node
npm i -D tsx
npm i -D pkgroll
```

## Configurar tsconfig.json

```
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "rootDir": "./src",
        "outDir": "./dist",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```

## Configurar package.json

```
{
    "name": "01",
    "version": "1.0.0",
    "main": "index.js",
    "exports": "./dist/index.js",
    "type": "module",
    "scripts": {
        "build": "pkgroll",
        "dev": "tsx watch src/index.ts",
        "start": "node dist/index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "devDependencies": {
        "@types/express": "^5.0.0",
        "@types/node": "^22.9.0",
        "pkgroll": "^2.5.1",
        "tsx": "^4.19.2",
        "typescript": "^5.6.3"
    },
    "dependencies": {
        "express": "^4.21.1"
    }
}
```
