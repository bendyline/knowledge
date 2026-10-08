# Source code: docs/ai/snippets/prompt-engineering/multi-turn-chat.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RootNamespace>MultiTurnChat</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.AI.OpenAI" Version="2.8.0-beta.1" />
    <PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.22.0" />
    <!--
    <PackageReference Include="Microsoft.Extensions.Configuration" Version="10.0.2" />
    <PackageReference Include="Microsoft.Extensions.Configuration.UserSecrets" Version="10.0.2" />
    -->
  </ItemGroup>

</Project>

```
