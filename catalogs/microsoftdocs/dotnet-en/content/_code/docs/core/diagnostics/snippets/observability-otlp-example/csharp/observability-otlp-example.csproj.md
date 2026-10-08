# Source code: docs/core/diagnostics/snippets/observability-otlp-example/csharp/observability-otlp-example.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <!-- <PackageReferences> -->
  <ItemGroup>
    <PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.19.1" />
    <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.19.1" />
    <PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.19.0" />
    <PackageReference Include="OpenTelemetry.Instrumentation.Http" Version="1.19.0" />
  </ItemGroup>
  <!-- </PackageReferences> -->

</Project>

```
