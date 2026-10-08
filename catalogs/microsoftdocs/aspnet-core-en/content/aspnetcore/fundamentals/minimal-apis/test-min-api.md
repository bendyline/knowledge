---
title: Test Minimal API apps
author: wadepickett
description: Unit and integration tests in Minimal API apps
ms.author: wpickett
ms.date: 09/15/2025
monikerRange: '>= aspnetcore-7.0'
uid: fundamentals/minimal-apis/test-min-api
---

# Unit and integration tests in Minimal API apps

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


By [Fiyaz Bin Hasan](https://github.com/fiyazbinhasan), and [Rick Anderson](https://twitter.com/RickAndMSFT)

## Introduction to integration tests

Integration tests evaluate an app's components on a broader level than [unit tests](https://learn.microsoft.com/dotnet/core/testing/). Unit tests are used to test isolated software components, such as individual class methods. Integration tests confirm that two or more app components work together to produce an expected result, possibly including every component required to fully process a request.

These broader tests are used to test the app's infrastructure and whole framework, often including the following components:

* Database
* File system
* Network appliances
* Request-response pipeline

Unit tests use fabricated components, known as [*fakes* or *mock objects*](https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices#lets-speak-the-same-language), in place of infrastructure components.

In contrast to unit tests, integration tests:

* Use the actual components that the app uses in production.
* Require more code and data processing.
* Take longer to run.

Therefore, limit the use of integration tests to the most important infrastructure scenarios. If a behavior can be tested using either a unit test or an integration test, choose the unit test.

In discussions of integration tests, the tested project is frequently called the ***System Under Test***, or "**SUT**" for short. "SUT" is used throughout this article to refer to the ASP.NET Core app being tested.

***Don't write integration tests for every permutation*** of data and file access with databases and file systems. Regardless of how many places across an app interact with databases and file systems, a focused set of read, write, update, and delete integration tests are usually capable of adequately testing database and file system components. Use unit tests for routine tests of method logic that interact with these components. In unit tests, the use of infrastructure fakes or mocks result in faster test execution.

## ASP.NET Core integration tests

Integration tests in ASP.NET Core require the following:

* A test project is used to contain and execute the tests. The test project has a reference to the SUT.
* The test project creates a test web host for the SUT and uses a test server client to handle requests and responses with the SUT.
* A test runner is used to execute the tests and report the test results.

Integration tests follow a sequence of events that include the usual *Arrange*, *Act*, and *Assert* test steps:

1. The SUT's web host is configured.
1. A test server client is created to submit requests to the app.
1. The *Arrange* test step is executed: The test app prepares a request.
1. The *Act* test step is executed: The client submits the request and receives the response.
1. The *Assert* test step is executed: The *actual* response is validated as a *pass* or *fail* based on an *expected* response.
1. The process continues until all of the tests are executed.
1. The test results are reported.

Usually, the test web host is configured differently than the app's normal web host for the test runs. For example, a different database or different app settings might be used for the tests.

Infrastructure components, such as the test web host and in-memory test server ([Microsoft.AspNetCore.TestHost.TestServer](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.TestHost.TestServer)), are provided or managed by the [Microsoft.AspNetCore.Mvc.Testing](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.Testing) package. Use of this package streamlines test creation and execution.

The `Microsoft.AspNetCore.Mvc.Testing` package handles the following tasks:

* Copies the dependencies file (`.deps`) from the SUT into the test project's `bin` directory.
* Sets the [content root](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23content-root) to the SUT's project root so that static files and pages/views are found when the tests are executed.
* Provides the [WebApplicationFactory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory%25601) class to streamline bootstrapping the SUT with `TestServer`.

The [unit tests](https://learn.microsoft.com/dotnet/articles/core/testing/unit-testing-with-dotnet-test) documentation describes how to set up a test project and test runner, along with detailed instructions on how to run tests and recommendations for how to name tests and test classes.

**Separate unit tests from integration tests into different projects**. Separating the tests:

* Helps ensure that infrastructure testing components aren't accidentally included in the unit tests.
* Allows control over which set of tests are run.


The [sample code on GitHub](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample) provides an example of unit and integration tests on a Minimal API app.

<a name="iit7"></a>

## Unit test IResult implementation types

The following example shows how to unit test minimal route handlers that return [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) using the [xUnit](https://github.com/xunit/xunit/) testing framework. The external database is replaced with an in-memory database during testing, the implementation of the `MockDb` can be found in the [sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/blob/main/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/Helpers/MockDb.cs).

Public [Microsoft.AspNetCore.Http.IResult](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.IResult) implementation types in the [Microsoft.AspNetCore.Http.HttpResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults) namespace can be used to unit test minimal route handlers when using named methods instead of lambdas.

The following code uses the [Microsoft.AspNetCore.Http.HttpResults.NotFound%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.NotFound%25601) class:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/test-min-api.md)

The following code uses the [Microsoft.AspNetCore.Http.HttpResults.Ok%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601) class:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/test-min-api.md)

In the previous examples, the result is cast to a concrete type because the endpoint under test can return multiple types (a [Microsoft.AspNetCore.Http.HttpResults.NotFound%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.NotFound%25601) or [Microsoft.AspNetCore.Http.HttpResults.Ok%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpResults.Ok%25601)) result.
However, if the endpoint returns a single [Microsoft.AspNetCore.Http.TypedResults](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults) type, then the result is automatically inferred to that type and no casting is required.

The following code uses the [Microsoft.AspNetCore.Http.TypedResults.Ok%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.TypedResults.Ok%252A) class, and the value's type is a collection of `Todo`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MinApiTestsSample/UnitTests/TodoInMemoryTests.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/fundamentals/minimal-apis/test-min-api.md)

## Additional Resources

* [Basic authentication tests](https://github.com/blowdart/idunno.Authentication/tree/dev/test/idunno.Authentication.Basic.Test) is not a .NET repository but was written by a member of the .NET team. It provides examples of basic authentication testing.
* [View or download sample code](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/fundamentals/minimal-apis/samples/MinApiTestsSample)
* [fundamentals/minimal-apis/security](security.md)
* [Use port tunneling Visual Studio to debug web APIs](https://learn.microsoft.com/connectors/custom-connectors/port-tunneling)
* [mvc/controllers/testing](../../mvc/controllers/testing.md)
* [test/razor-pages-tests](../../test/razor-pages-tests.md)
