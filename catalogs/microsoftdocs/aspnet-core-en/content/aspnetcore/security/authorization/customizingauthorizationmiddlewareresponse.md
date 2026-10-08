---
title: Customize the behavior of AuthorizationMiddleware
author: tdykstra
description: This article explains how to customize the result handling of AuthorizationMiddleware.
ms.author: tdykstra
monikerRange: '>= aspnetcore-5.0'
ms.date: 07/21/2026
uid: security/authorization/authorizationmiddlewareresulthandler
---
# Customize the behavior of authorization middleware

**Applies to: \>= aspnetcore-6.0**
  
Apps can register an [Microsoft.AspNetCore.Authorization.IAuthorizationMiddlewareResultHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationMiddlewareResultHandler) to customize how [Microsoft.AspNetCore.Authorization.AuthorizationMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationMiddleware) handles authorization results. Apps can use `IAuthorizationMiddlewareResultHandler` to:

* Return customized responses.
* Enhance the default challenge or forbid responses.

The following code shows an example implementation of `IAuthorizationMiddlewareResultHandler` that returns a custom response for specific authorization failures:

[language="csharp" source="customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/SampleAuthorizationMiddlewareResultHandler.cs"::: (complete source file; reference: customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/SampleAuthorizationMiddlewareResultHandler.cs)](../../../_code/aspnetcore/security/authorization/customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/SampleAuthorizationMiddlewareResultHandler.cs.md)

Register this implementation of `IAuthorizationMiddlewareResultHandler` in `Program.cs`:

[language="csharp" source="customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/Program.cs" id="snippet_Register"::: (complete source file; reference: customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/Program.cs)](../../../_code/aspnetcore/security/authorization/customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/Program.cs.md)



**Applies to: < aspnetcore-6.0**

Apps can register an [Microsoft.AspNetCore.Authorization.IAuthorizationMiddlewareResultHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationMiddlewareResultHandler) to customize how [Microsoft.AspNetCore.Authorization.AuthorizationMiddleware](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationMiddleware) handles authorization results. Apps can use the `IAuthorizationMiddlewareResultHandler` to:

* Return customized responses.
* Enhance the default challenge or forbid responses.

The following code shows an example implementation of `IAuthorizationMiddlewareResultHandler` that returns a custom response for specific authorization failures:

[language="csharp" source="customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/MyAuthorizationMiddlewareResultHandler.cs"::: (complete source file; reference: customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/MyAuthorizationMiddlewareResultHandler.cs)](../../../_code/aspnetcore/security/authorization/customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/MyAuthorizationMiddlewareResultHandler.cs.md)

Register `MyAuthorizationMiddlewareResultHandler` in `Startup.ConfigureServices`:

[language="csharp" source="customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/Startup.cs" id="snippet_ConfigureServices"::: (complete source file; reference: customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/Startup.cs)](../../../_code/aspnetcore/security/authorization/customizingauthorizationmiddlewareresponse/samples_snapshot/5.x/Startup.cs.md)
