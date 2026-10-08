# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.1/TodoApi.NSwag/TodoApi.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.1</TargetFramework>
    <ProjectUISubcaption>NSwag - ASP.NET Core 2.1</ProjectUISubcaption>
  </PropertyGroup>

  <!-- <snippet_DocumentationFileElement> -->
  <PropertyGroup>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <NoWarn>$(NoWarn);1591</NoWarn>
  </PropertyGroup>
  <!-- </snippet_DocumentationFileElement> -->

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="NSwag.AspNetCore" Version="13.0.1" />
  </ItemGroup>

</Project>

```
