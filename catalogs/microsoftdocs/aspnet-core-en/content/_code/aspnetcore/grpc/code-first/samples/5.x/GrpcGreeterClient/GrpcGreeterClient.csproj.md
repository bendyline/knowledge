# Source code: aspnetcore/grpc/code-first/samples/5.x/GrpcGreeterClient/GrpcGreeterClient.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Grpc.Net.Client" Version="2.37.0" />
    <PackageReference Include="protobuf-net.Grpc" Version="1.0.152" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Shared\Shared.Contracts.csproj" />
  </ItemGroup>
</Project>

```
