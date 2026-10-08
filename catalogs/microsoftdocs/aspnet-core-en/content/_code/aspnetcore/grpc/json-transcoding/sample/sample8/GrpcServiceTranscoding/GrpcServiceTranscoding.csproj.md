# Source code: aspnetcore/grpc/json-transcoding/sample/sample8/GrpcServiceTranscoding/GrpcServiceTranscoding.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
    <IncludeHttpRuleProtos>true</IncludeHttpRuleProtos>
  </PropertyGroup>

  <ItemGroup>
    <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.52.0" />
    <PackageReference Include="Microsoft.AspNetCore.Grpc.JsonTranscoding" Version="8.0.0-preview.3.23177.8" />
  </ItemGroup>

</Project>

```
