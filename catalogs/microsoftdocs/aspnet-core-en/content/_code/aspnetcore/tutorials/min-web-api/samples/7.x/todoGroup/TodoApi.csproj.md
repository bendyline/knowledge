# Source code: aspnetcore/tutorials/min-web-api/samples/7.x/todoGroup/TodoApi.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
	  <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
	  <PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
	  <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="7.0.0-rc.1.22427.2" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="7.0.0-rc.1.22426.7" />
  </ItemGroup>
</Project>

```
