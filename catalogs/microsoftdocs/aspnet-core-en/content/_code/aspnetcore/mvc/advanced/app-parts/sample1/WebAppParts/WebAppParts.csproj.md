# Source code: aspnetcore/mvc/advanced/app-parts/sample1/WebAppParts/WebAppParts.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
    <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
  </PropertyGroup>


  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.AspNetCore.Razor.Design" Version="2.2.0" PrivateAssets="All" />
  </ItemGroup>


  <ItemGroup>
    <ProjectReference Include="..\MySharedApp\MySharedApp.csproj" />
  </ItemGroup>

</Project>

```
