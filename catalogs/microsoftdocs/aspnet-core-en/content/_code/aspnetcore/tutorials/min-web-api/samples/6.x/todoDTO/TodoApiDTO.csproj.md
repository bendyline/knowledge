# Source code: aspnetcore/tutorials/min-web-api/samples/6.x/todoDTO/TodoApiDTO.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
	      <ImplicitUsings>enable</ImplicitUsings>
	    </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <DefineConstants>TRACE;FIRST</DefineConstants>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="6.0.0-rc.2.21480.10" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="6.0.0-rc.2.21480.5" />
  </ItemGroup>
</Project>
```
