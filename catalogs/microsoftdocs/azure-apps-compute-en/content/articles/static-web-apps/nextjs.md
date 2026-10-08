---
title: "Next.js support on Azure Static Web Apps"
description: "An overview of the support of Next.js on Azure Static Web Apps"
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic:  how-to
ms.date: 04/25/2024
ms.author: jikunchen
ms.custom: devx-track-js
---

# Deploy Next.js websites on Azure Static Web Apps

Next.js support on Azure Static Web Apps can be categorized as two deployment models:

- **Hybrid**: Hybrid Next.js sites, which include support for all Next.js features such as the [App Router](https://nextjs.org/docs/app), the [Pages Router](https://nextjs.org/docs/pages) and [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

- **Static**: Static Next.js sites, which use the [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export) option of Next.js.

## Hybrid Next.js applications (preview)

Static Web Apps supports deploying hybrid Next.js websites. This enables support for all Next.js features, such as the [App Router](https://nextjs.org/docs/app) and [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). 

Hybrid Next.js applications are hosted using the Static Web Apps globally distributed static content host and managed backend functions. Next.js backend functions are hosted on a dedicated App Service instance to ensure full feature compatibility.

With hybrid Next.js applications, pages and components can be dynamically rendered, statically rendered or incrementally rendered. Next.js automatically determines the best rendering and caching model based on your data fetching for optimal performance.

Key features that are available in the preview are:

- [App Router](https://nextjs.org/docs/app) and [Pages Router](https://nextjs.org/docs/pages)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Hybrid rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Image optimization](https://nextjs.org/docs/app/guides/self-hosting#image-optimization)
- [Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Middleware](https://nextjs.org/docs/advanced-features/middleware)
- [Authentication](https://nextjs.org/docs/pages/building-your-application/authentication)

Follow the [deploy hybrid Next.js applications](deploy-nextjs-hybrid.md) tutorial to learn how to deploy a hybrid Next.js application to Azure.


### Unsupported features in preview

The following features of Static Web Apps are unsupported for Next.js with hybrid rendering:

- **Select Azure services**: Linked APIs using Azure Functions, Azure App Service, Azure Container Apps, or Azure API Management.
- **SWA CLI features**: SWA CLI local emulation and deployment.
- **Partial features support**: The following properties in `staticwebapp.config.json` file aren't supported:
  - Navigation fallback is unsupported.
  - Route rewrites to routes within the Next.js application must be configured within `next.config.js`.
  - The configuration within the `staticwebapp.config.json` file takes precedence over the configuration within `next.config.js`.
  - Configuration for the Next.js site should be handled using `next.config.js` for full feature compatibility.
- **Build skipping**: For Next.js applications if `skip_api_build=true`, Static Web Apps does not remove dev dependencies or add the sharp package by default. If you want these optimizations, add them to your custom build steps before passing `skip_app_build=true`.
- **Incremental static regeneration (ISR)**: Image caching isn't supported.

> **Note:**
> The maximum app size for the hybrid Next.js application is 250 MB. Use [standalone](deploy-nextjs-hybrid.md#enable-standalone-feature) feature by Next.js for optimized app sizes. If this is not sufficient, consider using [Static HTML exported Next.js](deploy-nextjs-static-export.md) if your app size requirement is more than 250 MB.


## Server side rendering


The following steps show you how to associate a custom backend to your Standard plan and above static web apps.

> **Note:**
> Linked backends are only available for sites using the Standard plan or above.

1. Go to your static web app in the Azure portal.

1. Select **Settings** and then **APIs** from the side menu.

1. Select **Configure linked backend**.

1. Either create a new App Service Plan or select an existing App Service Plan.

    Your selected App Service Plan must use at least an **S1** SKU.

1. Click **Link**.


## Static HTML export

You can deploy a Next.js static site using the [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) feature of Next.js. This configuration generates static HTML files during the build, which are cached and reused for all requests. See the [supported features of Next.js static exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

Static Next.js sites are hosted on the Azure Static Web Apps globally distributed network for optimal performance. Additionally, you can add [linked backends for your APIs](apis-overview.md).

To enable static export of a Next.js application, add `output: 'export'` to the nextConfig in `next.config.js`.

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
 
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig
```

You must also specify the `output_location` in the GitHub Actions/Azure DevOps configuration. By default, this value is set to `out` as per Next.js defaults. If a custom output location is indicated in the Next.js configuration, the value provided for the build should match the one configured in Next.js' export.

If you're using custom build scripts, set `IS_STATIC_EXPORT` to `true` in the Static Web Apps task of the GitHub Actions/Azure DevOps YAML file.

The following example shows the GitHub Actions job that is enabled for static exports.

```yaml
      - name: Build And Deploy
        id: swa
        uses: azure/static-web-apps-deploy@latest
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for GitHub integrations (i.e. PR comments)
          action: "upload"
          app_location: "/" # App source code path
          api_location: "" # Api source code path - optional
          output_location: "out" # Built app content directory - optional
        env: # Add environment variables here
          IS_STATIC_EXPORT: true
```

Follow the [deploy static-rendered Next.js websites](deploy-nextjs-static-export.md) tutorial to learn how to deploy a statically exported Next.js application to Azure.
