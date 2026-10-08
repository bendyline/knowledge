---
title: gRPC health checks in ASP.NET Core
author: jamesnk
description: Learn how to use gRPC health checks in ASP.NET Core.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 05/27/2024
uid: grpc/health-checks
---
# gRPC health checks in ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-6.0**

By [James Newton-King](https://twitter.com/jamesnk)

The [gRPC health checking protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md) is a standard for reporting the health of gRPC server apps.

Health checks are exposed by an app as a gRPC service. They're typically used with an external monitoring service to check the status of an app. The service can be configured for various real-time monitoring scenarios:

* Health probes can be used by container orchestrators and load balancers to check an app's status. For example, Kubernetes supports [gRPC liveness, readiness and startup probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-grpc-liveness-probe). Kubernetes can be configured to reroute traffic or restart unhealthy containers based on gRPC health check results.
* Use of memory, disk, and other physical server resources can be monitored for healthy status.
* Health checks can test an app's dependencies, such as databases and external service endpoints, to confirm availability and normal functioning.

## Set up gRPC health checks

gRPC ASP.NET Core has built-in support for gRPC health checks with the [`Grpc.AspNetCore.HealthChecks`](https://www.nuget.org/packages/Grpc.AspNetCore.HealthChecks) package. Results from [.NET health checks](../host-and-deploy/health-checks.md) are reported to callers.

To set up gRPC health checks in an app:

* Add a `Grpc.AspNetCore.HealthChecks` package reference.
* Register gRPC health checks service:
  * `AddGrpcHealthChecks` to register services that enable health checks.
  * `MapGrpcHealthChecksService` to add a health checks service endpoint.
* Add health checks by implementing [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck) or using the [Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck%252A) method.

[Code example (complete source file; reference: \~/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs?name=snippet\&highlight=2,7-8,13)](../../_code/aspnetcore/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs.md)

When health checks is set up:

* The health checks service is added to the server app.
* .NET health checks registered with the app are periodically executed for health results. By default, there's a 5-second delay after app startup, and then health checks are executed every 30 seconds. Health check execution interval [can be customized with `HealthCheckPublisherOptions`](#configure-health-checks-execution-interval).
* Health results determine what the gRPC service reports:
  * `Unknown` is reported when there are no health results.
  * `NotServing` is reported when there are any health results of [Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy).
  * Otherwise, `Serving` is reported.

### Health checks service security

gRPC health checks returns health status about an app, which could be sensitive information. Care should be taken to limit access to the gRPC health checks service.

Access to the service can be controlled through standard ASP.NET Core authorization extension methods, such as [`AllowAnonymous`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authorizationendpointconventionbuilderextensions.allowanonymous) and [`RequireAuthorization`](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.authorizationendpointconventionbuilderextensions.requireauthorization).

For example, if an app has been configured to require authorization by default, configure the gRPC health checks endpoint with `AllowAnonymous` to skip authentication and authorization.

```csharp
app.MapGrpcHealthChecksService().AllowAnonymous();
```

### Configure `Grpc.AspNetCore.HealthChecks`

By default, the gRPC health checks service uses all registered health checks to determine health status. gRPC health checks can be customized when registered to use a subset of health checks. The `MapService` method is used to map health results to service names, along with a predicate for filtering health results:

[Code example (complete source file; reference: \~/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs?name=snippet2\&highlight=4-7)](../../_code/aspnetcore/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs.md)
The preceding code overrides the default service (`""`) to only use health results with the "public" tag.

gRPC health checks supports the client specifying a service name argument when checking health. Multiple services are supported by providing a service name to `MapService`:

[Code example (complete source file; reference: \~/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs?name=snippet3\&highlight=4-8)](../../_code/aspnetcore/grpc/health-checks/samples-6/GrpcServiceHC/Program.cs.md)

The service name specified by the client is usually the default (`""`) or a package-qualified name of a service in your app. However, nothing prevents the client using arbitrary values to check app health.

### Configure health checks execution interval

Health checks are run immediately when `Check` is called. `Watch` is a streaming method and has a different behavior than `Check`: The long running stream reports health checks results over time by periodically executing [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher) to gather health results. By default, the publisher:

* Waits 5 seconds after app startup before running health checks.
* Runs health checks every 30 seconds.

Publisher intervals can be configured using [Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions) at startup:

```csharp
builder.Services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.Zero;
    options.Period = TimeSpan.FromSeconds(10);
});
```

## Call gRPC health checks service

The [`Grpc.HealthCheck`](https://www.nuget.org/packages/Grpc.HealthCheck) package includes a client for gRPC health checks:

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new Health.HealthClient(channel);

var response = await client.CheckAsync(new HealthCheckRequest());
var status = response.Status;
```

There are two methods on the `Health` service:

* `Check` is a unary method for getting the current health status. Health checks are executed immediately when `Check` is called. The server returns a `NOT_FOUND` error response if the client requests an unknown service name. This can happen at app startup if health results haven't been published yet.
* `Watch` is a streaming method that reports changes in health status over time. [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher) is periodically executed to gather health results. The server returns an `Unknown` status if the client requests an unknown service name.

The `Grpc.HealthCheck` client can be used in a client factory approach:

```csharp
builder.Services
    .AddGrpcClient<Health.HealthClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    });
```
In the previous example, a client factory for `Health.HealthClient` instances is registered with the dependency injection system. Then, these instances are injected into services for executing health check calls.

For more information, see [grpc/clientfactory](clientfactory.md).

## Additional resources

* [host-and-deploy/health-checks](../host-and-deploy/health-checks.md)
* [gRPC health checking protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md)
* [`Grpc.AspNetCore.HealthChecks`](https://www.nuget.org/packages/Grpc.AspNetCore.HealthChecks)
* [`Grpc.HealthCheck`](https://www.nuget.org/packages/Grpc.HealthCheck)



**Applies to: < aspnetcore-6.0**

By [James Newton-King](https://twitter.com/jamesnk)

The [gRPC health checking protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md) is a standard for reporting the health of gRPC server apps.

Health checks are exposed by an app as a gRPC service. They are typically used with an external monitoring service to check the status of an app. The service can be configured for various real-time monitoring scenarios:

* Health probes can be used by container orchestrators and load balancers to check an app's status. For example, Kubernetes supports [gRPC liveness, readiness and startup probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-grpc-liveness-probe). Kubernetes can be configured to reroute traffic or restart unhealthy containers based on gRPC health check results.
* Use of memory, disk, and other physical server resources can be monitored for healthy status.
* Health checks can test an app's dependencies, such as databases and external service endpoints, to confirm availability and normal functioning.

## Set up gRPC health checks

gRPC ASP.NET Core has built-in support for gRPC health checks with the [`Grpc.AspNetCore.HealthChecks`](https://www.nuget.org/packages/Grpc.AspNetCore.HealthChecks) package. Results from [.NET health checks](../host-and-deploy/health-checks.md) are reported to callers.

To set up gRPC health checks in an app:

* Add a `Grpc.AspNetCore.HealthChecks` package reference.
* Register gRPC health checks service in `Startup.cs`:
  * `AddGrpcHealthChecks` to register services that enable health checks.
  * `MapGrpcHealthChecksService` to add a health checks service endpoint.
* Add health checks by implementing [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck) or using the [Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HealthChecksBuilderAddCheckExtensions.AddCheck%252A) method.

[Code example (complete source file; reference: \~/grpc/health-checks/Startup.cs?highlight=4-6,16)](../../_code/aspnetcore/grpc/health-checks/Startup.cs.md)

When health checks is set up:

* The health checks service is added to the server app.
* .NET health checks registered with the app are periodically executed for health results. By default, there is a 5 second delay after app startup, and then health checks are executed every 30 seconds. Health check execution interval [can be customized with `HealthCheckPublisherOptions`](#configure-health-checks-execution-interval).
* Health results determine what the gRPC service reports:
  * `Unknown` is reported when there are no health results.
  * `NotServing` is reported when there are any health results of [Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy).
  * Otherwise, `Serving` is reported.

### Configure `Grpc.AspNetCore.HealthChecks`

By default, the gRPC health checks service uses all registered health checks to determine health status. gRPC health checks can be customized when registered to use a subset of health checks. The `MapService` method is used to map health results to service names, along with a predicate for filtering health results:

```csharp
services.AddGrpcHealthChecks(o =>
{
    o.Services.MapService("", r => r.Tags.Contains("public"));
});
```

The preceding code overrides the default service (`""`) to only use health results with the "public" tag.

gRPC health checks supports the client specifying a service name argument when checking health. Multiple services are supported by providing a service name to `MapService`:

```csharp
services.AddGrpcHealthChecks(o =>
{
    o.Services.MapService("greet.Greeter", r => r.Tags.Contains("greeter"));
    o.Services.MapService("count.Counter", r => r.Tags.Contains("counter"));
});
```

The service name specified by the client is usually the default (`""`) or a package-qualified name of a service in your app. However, nothing prevents the client using arbitrary values to check app health.

### Configure health checks execution interval

Health checks are run immediately when `Check` is called. `Watch` is a streaming method and has a different behavior than `Check`: The long running stream reports health checks results over time by periodically executing [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher) to gather health results. By default, the publisher:

* Waits 5 seconds after app startup before running health checks.
* Runs health checks every 30 seconds.

Publisher intervals can be configured using [Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckPublisherOptions) at startup:

```csharp
services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.Zero;
    options.Period = TimeSpan.FromSeconds(10);
});
```

## Call gRPC health checks service

The [`Grpc.HealthCheck`](https://www.nuget.org/packages/Grpc.HealthCheck) package includes a client for gRPC health checks:

```csharp
var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = new Health.HealthClient(channel);

var response = client.CheckAsync(new HealthCheckRequest());
var status = response.Status;
```

There are two methods on the `Health` service:

* `Check` is a unary method for getting the current health status. Health checks are executed immediately when `Check` is called. The server returns a `NOT_FOUND` error response if the client requests an unknown service name. This can happen at app startup if health results haven't been published yet.
* `Watch` is a streaming method that reports changes in health status over time. [Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheckPublisher) is periodically executed to gather health results. The server returns an `Unknown` status if the client requests an unknown service name.

## Additional resources

* [host-and-deploy/health-checks](../host-and-deploy/health-checks.md)
* [gRPC health checking protocol](https://github.com/grpc/grpc/blob/master/doc/health-checking.md)
* [`Grpc.AspNetCore.HealthChecks`](https://www.nuget.org/packages/Grpc.AspNetCore.HealthChecks)
* [`Grpc.HealthCheck`](https://www.nuget.org/packages/Grpc.HealthCheck)
