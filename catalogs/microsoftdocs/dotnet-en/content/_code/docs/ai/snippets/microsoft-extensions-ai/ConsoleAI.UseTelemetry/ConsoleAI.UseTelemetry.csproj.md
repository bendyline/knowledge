# Source code: docs/ai/snippets/microsoft-extensions-ai/ConsoleAI.UseTelemetry/ConsoleAI.UseTelemetry.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="OllamaSharp" Version="5.4.30" />
    <PackageReference Include="OpenTelemetry.Exporter.Console" Version="1.19.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\AI.Shared\AI.Shared.csproj" />
  </ItemGroup>

</Project>

```
