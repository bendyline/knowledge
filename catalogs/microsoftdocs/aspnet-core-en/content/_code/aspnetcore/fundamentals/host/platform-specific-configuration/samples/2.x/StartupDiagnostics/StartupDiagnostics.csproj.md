# Source code: aspnetcore/fundamentals/host/platform-specific-configuration/samples/2.x/StartupDiagnostics/StartupDiagnostics.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
    <SharedFrameworkVersion>2.2.0</SharedFrameworkVersion>
    <StartupDiagnosticsVersion>1.0.0</StartupDiagnosticsVersion>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <PackageTags>aspnetcore;StartupDiagnostics</PackageTags>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Hosting" Version="$(SharedFrameworkVersion)" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="$(SharedFrameworkVersion)" />
    <PackageReference Include="Microsoft.AspNetCore.Hosting.Abstractions" Version="$(SharedFrameworkVersion)" />
  </ItemGroup>

</Project>

```
