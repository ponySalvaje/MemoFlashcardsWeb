# Despliegue continuo en S3 y CloudFront

El workflow `.github/workflows/deploy-production.yml` compila y prueba cada push a `main`. El despliegue se habilita cuando están definidas todas las variables del repositorio. La autenticación usa GitHub OIDC y credenciales temporales de AWS; no requiere access keys permanentes.

## 1. Identificar los recursos existentes

En CloudFront, abre la distribución cuyo dominio alternativo incluye `memoflashcards.com` y anota:

- El ID de distribución.
- El bucket S3 configurado como origen.
- La región del bucket.
- El ID de la cuenta AWS.

La distribución debe tener `index.html` como Default root object, redirección de HTTP a HTTPS y respuestas de error `403` y `404` que devuelvan `/index.html` con código `200`. Esto permite abrir rutas de React directamente.

Para un bucket privado, usa Origin Access Control (OAC) y permite lectura únicamente a esa distribución. No habilites acceso público al bucket.

## 2. Crear la confianza OIDC

En IAM, agrega una vez el proveedor OpenID Connect:

- Provider URL: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

Crea un rol, por ejemplo `MemoFlashcardsWebProductionDeploy`, y usa como política de confianza el archivo `deploy/aws/github-oidc-trust-policy.json.example`, reemplazando `<AWS_ACCOUNT_ID>`. La condición limita el acceso al branch `main` de `ponySalvaje/MemoFlashcardsWeb`.

Adjunta al rol una política basada en `deploy/aws/github-deploy-permissions-policy.json.example`, reemplazando los tres marcadores. No agregues permisos administrativos ni acceso a otros buckets.

## 3. Configurar GitHub

En `Settings > Secrets and variables > Actions > Variables`, crea:

- `AWS_ACCOUNT_ID`
- `AWS_REGION`
- `AWS_ROLE_ARN`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `REACT_APP_API_BASE_URL` con `https://mobile.memoflashcards.com` (opcional; ese valor ya es el predeterminado)

Estos identificadores no son contraseñas. Con OIDC no debes crear `AWS_ACCESS_KEY_ID` ni `AWS_SECRET_ACCESS_KEY` en GitHub.

## 4. Validar el primer despliegue

En GitHub abre `Actions > Deploy production` y ejecuta `Run workflow`, o realiza un push a `main`. El job debe aprobar tests, generar `build/`, sincronizar S3 e invalidar CloudFront. Al finalizar, comprueba `https://memoflashcards.com` y una ruta interna abierta directamente en una pestaña nueva.
