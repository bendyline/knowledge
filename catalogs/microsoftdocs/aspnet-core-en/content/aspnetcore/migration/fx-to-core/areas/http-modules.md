---
title: Migrate HTTP modules to ASP.NET Core middleware
description: Migrate HTTP modules to ASP.NET Core middleware
author: twsouthwick
ms.author: wpickett
ms.date: 07/17/2025
ms.reviewer: tasou
uid: migration/fx-to-core/areas/http-modules
---
# Migrate HTTP modules to ASP.NET Core middleware

This article shows how to migrate existing ASP.NET [HTTP modules from system.webserver](https://learn.microsoft.com/iis/configuration/system.webserver/) to ASP.NET Core [middleware](../../../fundamentals/middleware/index.md).

## Modules revisited

Before proceeding to ASP.NET Core middleware, let's first recap how HTTP modules work:

Modules Handler

**Modules are:**

* Classes that implement [System.Web.IHttpModule](https://learn.microsoft.com/search/?terms=System.Web.IHttpModule)

* Invoked for every request

* Able to short-circuit (stop further processing of a request)

* Able to add to the HTTP response, or create their own

* [Configured](https://learn.microsoft.com/iis/configuration/system.webserver/modules/) in *Web.config*

**The order in which modules process incoming requests is determined by:**

1. A series events fired by ASP.NET, such as [System.Web.HttpApplication.BeginRequest](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication.BeginRequest) and [System.Web.HttpApplication.AuthenticateRequest](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication.AuthenticateRequest). For a complete list, see [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication). Each module can create a handler for one or more events.

2. For the same event, the order in which they're configured in *Web.config*.

In addition to modules, you can add handlers for the life cycle events to your `Global.asax.cs` file. These handlers run after the handlers in the configured modules.

## From modules to middleware

**Middleware are simpler than HTTP modules:**

* Modules, `Global.asax.cs`, *Web.config* (except for IIS configuration) and the application life cycle are gone

* The roles of modules have been taken over by middleware

* Middleware are configured using code rather than in *Web.config*

**Applies to: \>= aspnetcore-3.0**

* [Pipeline branching](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23branch-the-middleware-pipeline) lets you send requests to specific middleware, based on not only the URL but also on request headers, query strings, etc.


**Applies to: < aspnetcore-3.0**

* [Pipeline branching](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23branch-the-middleware-pipeline) lets you send requests to specific middleware, based on not only the URL but also on request headers, query strings, etc.



**Middleware are very similar to modules:**

* Invoked in principle for every request

* Able to short-circuit a request, by [not passing the request to the next middleware](#http-modules-shortcircuiting-middleware)

* Able to create their own HTTP response

**Middleware and modules are processed in a different order:**

* Order of middleware is based on the order in which they're inserted into the request pipeline, while order of modules is mainly based on [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication) events.

* Order of middleware for responses is the reverse from that for requests, while order of modules is the same for requests and responses

* See [Create a middleware pipeline with IApplicationBuilder](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23create-a-middleware-pipeline-with-iapplicationbuilder)

Authorization middleware short-circuits a request for a user who isn't authorized. A request for the Index page is permitted and processed by MVC middleware. A request for a sales report is permitted and processed by a custom report middleware.

Note how in the image above, the authentication middleware short-circuited the request.

## Migrating module code to middleware

An existing HTTP module will look similar to this:

[Code example (complete source file; reference: ./sample/Asp.Net4/Asp.Net4/Modules/MyModule.cs?highlight=6,8,24,31)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net4/Asp.Net4/Modules/MyModule.cs.md)

As shown in the [Middleware](../../../fundamentals/middleware/index.md) page, an ASP.NET Core middleware is a class that exposes an `Invoke` method taking an `HttpContext` and returning a `Task`. Your new middleware will look like this:

<a name="http-modules-usemiddleware"></a>

[Code example (complete source file; reference: ./sample/Asp.Net.Core/Middleware/MyMiddleware.cs?highlight=9,13,20,24,28,30,32)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyMiddleware.cs.md)

The preceding middleware template was taken from the section on [writing middleware](../../../fundamentals/middleware/write.md).

The *MyMiddlewareExtensions* helper class makes it easier to configure your middleware in your `Startup` class. The `UseMyMiddleware` method adds your middleware class to the request pipeline. Services required by the middleware get injected in the middleware's constructor.

<a name="http-modules-shortcircuiting-middleware"></a>

Your module might terminate a request, for example if the user isn't authorized:

[Code example (complete source file; reference: ./sample/Asp.Net4/Asp.Net4/Modules/MyTerminatingModule.cs?highlight=9,10,11,12,13\&name=snippet_Terminate)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net4/Asp.Net4/Modules/MyTerminatingModule.cs.md)

A middleware handles this by not calling `Invoke` on the next middleware in the pipeline. Keep in mind that this doesn't fully terminate the request, because previous middlewares will still be invoked when the response makes its way back through the pipeline.

[Code example (complete source file; reference: ./sample/Asp.Net.Core/Middleware/MyTerminatingMiddleware.cs?highlight=7,8\&name=snippet_Terminate)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyTerminatingMiddleware.cs.md)

When you migrate your module's functionality to your new middleware, you may find that your code doesn't compile because the `HttpContext` class has significantly changed in ASP.NET Core. See [Migrate from ASP.NET Framework HttpContext to ASP.NET Core](http-context.md) to learn how to migrate to the new ASP.NET Core HttpContext.

## Migrating module insertion into the request pipeline

HTTP modules are typically added to the request pipeline using *Web.config*:

[Code example (complete source file; reference: ./sample/Asp.Net4/Asp.Net4/Web.config?highlight=6\&range=1-3,32-33,36,43,50,101)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net4/Asp.Net4/Web.config.md)

Convert this by [adding your new middleware](https://learn.microsoft.com/search/?terms=fundamentals%2Fmiddleware%2Findex%23create-a-middleware-pipeline-with-iapplicationbuilder) to the request pipeline in your `Startup` class:

[Code example (complete source file; reference: ./sample/Asp.Net.Core/Startup.cs?name=snippet_Configure\&highlight=16)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Startup.cs.md)

The exact spot in the pipeline where you insert your new middleware depends on the event that it handled as a module (`BeginRequest`, `EndRequest`, etc.) and its order in your list of modules in *Web.config*.

As previously stated, there's no application life cycle in ASP.NET Core and the order in which responses are processed by middleware differs from the order used by modules. This could make your ordering decision more challenging.

If ordering becomes a problem, you could split your module into multiple middleware components that can be ordered independently.

## Loading middleware options using the options pattern

Some modules have configuration options that are stored in *Web.config*. However, in ASP.NET Core a new configuration model is used in place of *Web.config*.

The new [configuration system](../../../fundamentals/configuration/index.md) gives you these options to solve this:

* Directly inject the options into the middleware, as shown in the [next section](#loading-middleware-options-through-direct-injection).

* Use the [options pattern](../../../fundamentals/configuration/options.md):

1. Create a class to hold your middleware options, for example:

   [Code example (complete source file; reference: sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs?name=snippet_Options)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs.md)

2. Store the option values

   The configuration system allows you to store option values anywhere you want. However, most sites use `appsettings.json`, so we'll take that approach:

   [Code example (complete source file; reference: sample/Asp.Net.Core/appsettings.json?range=1,14-18)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/appsettings.json.md)

   *MyMiddlewareOptionsSection* here is a section name. It doesn't have to be the same as the name of your options class.

3. Associate the option values with the options class

    The options pattern uses ASP.NET Core's dependency injection framework to associate the options type (such as `MyMiddlewareOptions`) with a `MyMiddlewareOptions` object that has the actual options.

    Update your `Startup` class:

   1. If you're using `appsettings.json`, add it to the configuration builder in the `Startup` constructor:

      [Code example (complete source file; reference: ./sample/Asp.Net.Core/Startup.cs?name=snippet_Ctor\&highlight=5-6)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Startup.cs.md)

   2. Configure the options service:

      [Code example (complete source file; reference: ./sample/Asp.Net.Core/Startup.cs?name=snippet_ConfigureServices\&highlight=4)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Startup.cs.md)

   3. Associate your options with your options class:

      [Code example (complete source file; reference: ./sample/Asp.Net.Core/Startup.cs?name=snippet_ConfigureServices\&highlight=6-8)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Startup.cs.md)

4. Inject the options into your middleware constructor. This is similar to injecting options into a controller.

   [Code example (complete source file; reference: ./sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs?name=snippet_MiddlewareWithParams\&highlight=4,7,10,15-16)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs.md)

   The [UseMiddleware](#http-modules-usemiddleware) extension method that adds your middleware to the `IApplicationBuilder` takes care of dependency injection.

   This isn't limited to `IOptions` objects. Any other object that your middleware requires can be injected this way.

## Loading middleware options through direct injection

The options pattern has the advantage that it creates loose coupling between options values and their consumers. Once you've associated an options class with the actual options values, any other class can get access to the options through the dependency injection framework. There's no need to pass around options values.

This breaks down though if you want to use the same middleware twice, with different options. For example an authorization middleware used in different branches allowing different roles. You can't associate two different options objects with the one options class.

The solution is to get the options objects with the actual options values in your `Startup` class and pass those directly to each instance of your middleware.

1. Add a second key to `appsettings.json`

   To add a second set of options to the `appsettings.json` file, use a new key to uniquely identify it:

   [Code example (complete source file; reference: sample/Asp.Net.Core/appsettings.json?range=1,10-18\&highlight=2-5)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/appsettings.json.md)

2. Retrieve options values and pass them to middleware. The `Use...` extension method (which adds your middleware to the pipeline) is a logical place to pass in the option values: 

   [Code example (complete source file; reference: sample/Asp.Net.Core/Startup.cs?name=snippet_Configure\&highlight=20-23)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Startup.cs.md)

3. Enable middleware to take an options parameter. Provide an overload of the `Use...` extension method (that takes the options parameter and passes it to `UseMiddleware`). When `UseMiddleware` is called with parameters, it passes the parameters to your middleware constructor when it instantiates the middleware object.

   [Code example (complete source file; reference: ./sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs?name=snippet_Extensions\&highlight=9-14)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample/Asp.Net.Core/Middleware/MyMiddlewareWithParams.cs.md)

   Note how this wraps the options object in an `OptionsWrapper` object. This implements `IOptions`, as expected by the middleware constructor.

## Incremental IHttpModule migration

There are times when converting modules to middleware cannot easily be done. In order to support migration scenarios in which modules are required and cannot be moved to middleware, System.Web adapters support adding them to ASP.NET Core.

### IHttpModule Example

In order to support modules, an instance of [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication) must be available. If no custom [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication) is used, a default one will be used to add the modules to. Events declared in a custom application (including `Application_Start`) will be registered and run accordingly.

[language="csharp" source="sample8/Program.cs" ::: (complete source file; reference: sample8/Program.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample8/Program.cs.md)

### Global.asax migration

This infrastructure can be used to migrate usage of `Global.asax` if needed. The source from `Global.asax` is a custom [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication) and the file can be included in an ASP.NET Core application. Since it is named `Global`, the following code can be used to register it:

[language="csharp" source="sample8/Snippets/GlobalSnippet.cs" id="snippet_AddGlobal" ::: (complete source file; reference: sample8/Snippets/GlobalSnippet.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample8/Snippets/GlobalSnippet.cs.md)

As long as the logic within it is available in ASP.NET Core, this approach can be used to incrementally migrate reliance on `Global.asax` to ASP.NET Core.

### Authentication/Authorization events

In order for the authentication and authorization events to run at the desired time, the following pattern should be used:

[language="csharp" source="sample8/Snippets/UseAuthenticationAndAuthorizationSnippet.cs" id="snippet_UseAuthenticationAndAuthorization" ::: (complete source file; reference: sample8/Snippets/UseAuthenticationAndAuthorizationSnippet.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample8/Snippets/UseAuthenticationAndAuthorizationSnippet.cs.md)

If this is not done, the events will still run. However, it will be during the call of `.UseSystemWebAdapters()`.

### HTTP Module pooling

Because modules and applications in ASP.NET Framework were assigned to a request, a new instance is needed for each request. However, since they can be expensive to create, they are pooled using [Microsoft.Extensions.ObjectPool.ObjectPool`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601). In order to customize the actual lifetime of the [System.Web.HttpApplication](https://learn.microsoft.com/search/?terms=System.Web.HttpApplication) instances, a custom pool can be used:

[language="csharp" source="sample8/Snippets/HttpModulePoolingSnippet.cs" id="snippet_ObjectPool" ::: (complete source file; reference: sample8/Snippets/HttpModulePoolingSnippet.cs)](../../../../_code/aspnetcore/migration/fx-to-core/areas/sample8/Snippets/HttpModulePoolingSnippet.cs.md)


## Additional resources

* [HTTP Handlers and HTTP Modules Overview](https://learn.microsoft.com/iis/configuration/system.webserver/)
* [Configuration](../../../fundamentals/configuration/index.md)
* [Application Startup](../../../fundamentals/startup.md)
* [Middleware](../../../fundamentals/middleware/index.md)
* [Migrate from ASP.NET Framework HttpContext to ASP.NET Core](http-context.md)
