# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/2.0/TodoApi.NSwag/TodoApi.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.0</TargetFramework>
    <ProjectUISubcaption>NSwag - ASP.NET Core 2.0</ProjectUISubcaption>
  </PropertyGroup>

  <!-- <snippet_NoDocumentGeneration> -->
  <PropertyGroup>
    <OpenApiGenerateDocuments>false</OpenApiGenerateDocuments>
  </PropertyGroup>
  <!-- </snippet_NoDocumentGeneration> -->

  <!-- <snippet_DocumentationFileElement> -->
  <PropertyGroup>
    <DocumentationFile>bin\$(Configuration)\$(TargetFramework)\$(AssemblyName).xml</DocumentationFile>
    <NoWarn>$(NoWarn);1591</NoWarn>
  </PropertyGroup>
  <!-- </snippet_DocumentationFileElement> -->

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.All" Version="2.0.9" />
    <PackageReference Include="NSwag.AspNetCore" Version="13.0.1" />
  </ItemGroup>

</Project>

```
