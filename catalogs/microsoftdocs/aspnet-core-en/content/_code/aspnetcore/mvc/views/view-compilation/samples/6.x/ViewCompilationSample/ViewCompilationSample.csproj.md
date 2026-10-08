# Source code: aspnetcore/mvc/views/view-compilation/samples/6.x/ViewCompilationSample/ViewCompilationSample.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <Content Remove="Snippets\launchSettings.json" />
  </ItemGroup>

  <ItemGroup>
    <None Include="Snippets\launchSettings.json">
      <CopyToOutputDirectory>Never</CopyToOutputDirectory>
      <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
      <CopyToPublishDirectory>Never</CopyToPublishDirectory>
    </None>
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation" Version="6.0.1" />
  </ItemGroup>

</Project>

```
