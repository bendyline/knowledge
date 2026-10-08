---
title: About the Azure Static Web Apps CLI
description: Learn how to use the Azure Static Web Apps CLI
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic:  overview
ms.date: 02/06/2024
ms.author: jikunchen
---

# Azure Static Web Apps CLI overview


> **Important:**
> To improve the security of deployments from the [Static Web Apps CLI](https://www.npmjs.com/package/@azure/static-web-apps-cli), a breaking change was introduced that requires you to upgrade to the latest version (2.0.2) of the Static Web Apps CLI by Jan. 15th, 2025.


Azure Static Web Apps websites are hosted in the cloud and often connect together a collection of cloud services. During development, and any time you need to run your app locally, you need tools to mimic how your app runs in the cloud.

The Static Web Apps CLI (SWA CLI) includes a series of local services that approximate how your app would run on Azure, but instead they run exclusively on your machine.

The Azure Static Web Apps CLI provides the following services:

- A local static site server
- A proxy to the front-end framework development server
- A proxy to your API endpoints - available through Azure Functions Core Tools
- A mock authentication and authorization server
- Local routes and configuration settings enforcement


## How it works

The following chart shows how requests are handled locally.

Diagram showing the Azure Static Web App CLI request and response flow.

> **Important:**
> Go to `http://localhost:4280` to access the application served by the CLI.

- **Requests** made to port `4280` are forwarded to the appropriate server depending on the type of request.

- **Static content** requests, such as HTML or CSS,  are either handled by the internal CLI static content server, or by the front-end framework server for debugging.

- **Authentication and authorization** requests are handled by an emulator, which provides a fake identity profile to your app.

- **Functions Core Tools runtime**<sup>1</sup> handles requests to the site's API.

- **Responses** from all services are returned to the browser as if they were all a single application.

Once you start the UI and the Azure Functions API apps independently, then start the Static Web Apps CLI and point it to the running apps using the following command:

```console
swa start http://localhost:<DEV-SERVER-PORT-NUMBER> --api-location http://localhost:7071
```

Optionally, if you use the `swa init` command, the Static Web Apps CLI looks at your application code and build a _swa-cli.config.json_ configuration file for the CLI. When you use the _swa-cli.config.json_ file, you can run `swa start` to launch your application locally.

<sup>1</sup> The Azure Functions Core Tools are automatically installed by the CLI if they aren't already on your system.


## Get started

Get started working with the Static Web Apps CLI with the following resources.

| Resource | Description |
| --- | --- |
| [Install the Static Web Apps CLI (SWA CLI)](static-web-apps-cli-install.md) | Install the Azure Static Web Apps CLI to your machine. |
| [Configure your environment](static-web-apps-cli-configuration.md) | Set up how your application reads configuration information. |
| [Start the website emulator](static-web-apps-cli-emulator.md) | Start the service to locally serve your website. |
| [Start the local API server](static-web-apps-cli-api-server.md) | Start the service to locally serve your API endpoints. |
| [Deploy to Azure](static-web-apps-cli-deploy.md) | Deploy your application to production on Azure. |

> **Note:**
> Often sites built with a front-end framework require a proxy configuration setting to correctly handle requests under the `api` route. When using the Azure Static Web Apps CLI the proxy location value is `/api`, and without the CLI the value is `http://localhost:7071/api`.

## Next steps

> 
> [Install the CII](static-web-apps-cli-install.md)
