# Source code: samples/snippets/csharp/VS_Snippets_CFX/s_duplexclients/cs/client.exe.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.serviceModel>
    <client>
      <endpoint name=""
                address="http://localhost:8080/SampleService" 
                binding="wsDualHttpBinding" 
                contract="ICalculatorDuplex" />
    </client>
  </system.serviceModel>
</configuration>


```
