# Source code: aspnetcore/tutorials/signalr-typescript-webpack/samples/3.x/SignalRWebPack.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <None Remove="src\index.ts" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.TypeScript.MSBuild" Version="3.7.4">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

</Project>

```
