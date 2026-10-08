---
title: Build a Blazor movie database app (Overview)
author: guardrex
description: This tutorial explains the basics of building a Blazor Web App with a database, Entity Framework (EF) Core, and user interactivity.
ms.author: wpickett
ms.date: 11/11/2025
monikerRange: '>= aspnetcore-8.0'
uid: blazor/tutorials/movie-database-app/index
---
# Build a Blazor movie database app (Overview)

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


This tutorial explains the basics of building a Blazor Web App with a database, Entity Framework (EF) Core, and user interactivity.

Parts of this series include:

1. [Create a Blazor Web App](part-1.md)
1. [Add and scaffold a model](part-2.md)
1. [Learn about Razor components](part-3.md)
1. [Work with a database](part-4.md)
1. [Add validation](part-5.md)
1. [Add search](part-6.md)
1. [Add a new field](part-7.md)
1. [Add interactivity](part-8.md)

At the end of the tutorial, you'll have a Blazor Web App that can display and manage movies in a movie database.

## Secure authentication flow required for production apps

This tutorial uses a local database that doesn't require user authentication. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production Blazor Web Apps, see [blazor/security/index](../../security/index.md) and the following articles in the *Server* security node:

* [blazor/security/blazor-web-app-oidc](../../security/blazor-web-app-with-oidc.md)
* [blazor/security/blazor-web-app-entra](../../security/blazor-web-app-with-entra.md)

For Microsoft Azure services, we recommend using *managed identities*. Managed identities securely authenticate to Azure services without storing credentials in app code. For more information, see the following resources:

* [What are managed identities for Azure resources? (Microsoft Entra documentation)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview)
* Azure services documentation
  * [Managed identities in Microsoft Entra for Azure SQL](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity)
  * [How to use managed identities for App Service and Azure Functions](https://learn.microsoft.com/azure/app-service/overview-managed-identity)

## Sample app

If you don't intend to create the demonstration app while reading the article, you can refer to the completed sample app in the [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples). Select the latest version folder in the repository. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

To run the sample locally, apply the pending migrations, which include a migration to create the database. Use the following instructions:

If the [`dotnet-ef` tool](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet) isn't installed, install the tool with the following command from either a command shell, the Developer PowerShell command shell in Visual Studio, or the **Terminal** PowerShell command shell in VS Code:

```dotnetcli
dotnet tool install --global dotnet-ef
```

From a command shell opened to the project's root folder (the project directory containing the `BlazorWebAppMovies.csproj` file), execute the following command:

```dotnetcli
dotnet ef database update
```

After executing the preceding command, run the sample using any of the following approaches:

* Visual Studio
  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press <kbd>F5</kbd>.
* .NET CLI command shell: Execute the `dotnet watch` (or `dotnet run`) command from the project's root folder.

## Article code examples

The line breaks of code examples shown in the ASP.NET Core documentation often don't match line breaks in scaffolded code generated by tooling for an app. This is due to an article publishing limitation. Lines of code in articles are generally limited to 85 characters in length, and we manually adjust the line length using line breaks to satisfy our publishing guidelines.

As you work through this tutorial or use any other ASP.NET Core article's code examples, you never need to adjust scaffolded code in your app to match the line breaks displayed in article code examples.

## Report a tutorial issue

To open a documentation GitHub issue for an article of the series, use the **Open a documentation issue** link at the bottom of the article. Using the link to create your issue adds important tracking metadata to the issue and automatically pings the author of the article.

## Support requests

We welcome feedback on the tutorial's articles, such as bug reports and comments on the article's text, but we're often unable to provide product support. If you run into a problem while following the tutorial, don't immediately open a documentation issue. Check the steps that you've taken against the article and compare your code to the [sample app](#sample-app) before opening an issue because many problems can be traced to missing a step or not following a step correctly.

For general questions about .NET and Blazor beyond the tutorial and reference documentation or to obtain assistance from the .NET community, converse with developers in [public forums](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23support-requests).

## Next steps

> 
> [Next: Create a Blazor Web App](part-1.md)
