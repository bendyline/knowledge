# Source code: aspnetcore/grpc/grpcweb/sample/8.x/GrpcGreeterClient/GrpcGreeterClient.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Google.Protobuf" Version="3.22.4" />
    <PackageReference Include="Grpc.Net.Client" Version="2.59.0" />
    <PackageReference Include="Grpc.Net.Client.Web" Version="2.59.0" />
    <PackageReference Include="Grpc.Tools" Version="2.54.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

  <ItemGroup>
	<Protobuf Include="Protos\greet.proto" GrpcServices="Client" />
  </ItemGroup>

</Project>

```
