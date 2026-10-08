# Source code: docs/standard/io/snippets/pipelines_2/ConsoleApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <None Remove="lorem-ipsum.txt" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="lorem-ipsum.txt">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </Content>
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="System.IO.Pipelines" Version="10.0.12" />
  </ItemGroup>

</Project>

```
