# Source code: aspnetcore/fundamentals/openapi/samples/10.x/aspnet-openapi-xml/api/Api.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.3" />
    <PackageReference Include="Scalar.AspNetCore" Version="2.0.30" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\models\Models.csproj" />
  </ItemGroup>

</Project>

```
