# Source code: aspnetcore/tutorials/grpc/grpc-start/sample/sample3-5/GrpcGreeterClient/GrpcGreeterClient.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Google.Protobuf" Version="3.11.4" />
    <PackageReference Include="Grpc.Net.Client" Version="2.52.0" />
    <PackageReference Include="Grpc.Tools" Version="2.28.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
    <Protobuf Include="Protos\greet.proto" GrpcServices="Client" />
  </ItemGroup>

</Project>

```
