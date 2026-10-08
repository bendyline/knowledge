---
title: Policy-based authorization in ASP.NET Core Razor Pages
ai-usage: ai-assisted
author: wadepickett
description: Learn how to create and use authorization policy handlers for enforcing authorization requirements in an ASP.NET Core Razor Pages app.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.custom: mvc
ms.date: 07/21/2026
uid: razor-pages/security/authorization/policies
---
# Policy-based authorization in ASP.NET Core Razor Pages

This article provides additional Razor Pages policy-based authorization scenarios following [security/authorization/policies](../../../security/authorization/policies.md), which should be read before this article when learning about policy-based authorization.

## Apply policies to Razor Pages

Apply policies to Razor Pages using the `[Authorize]` attribute with the policy name:

**Applies to: \>= aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Pages/AtLeast21.cshtml.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/policies.md)



**Applies to: < aspnetcore-6.0**

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/policies/PoliciesAuthApp2/Pages/AlcoholPurchase.cshtml.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/razor-pages/security/authorization/policies.md)



Policies can't be applied at the page handler level, they must be applied to the [Microsoft.AspNetCore.Mvc.RazorPages.PageModel](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.RazorPages.PageModel) class.

Policies can also be applied to pages using an [authorization convention](conventions.md).
