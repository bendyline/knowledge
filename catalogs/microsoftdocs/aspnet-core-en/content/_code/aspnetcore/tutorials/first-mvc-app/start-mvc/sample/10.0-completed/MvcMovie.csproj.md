# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/10.0-completed/MvcMovie.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
	<PackageReference Include="Microsoft.Extensions.Validation" Version="10.0.0" />
	<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.2" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="10.0.2">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="10.0.2" />
  </ItemGroup>

</Project>

```
