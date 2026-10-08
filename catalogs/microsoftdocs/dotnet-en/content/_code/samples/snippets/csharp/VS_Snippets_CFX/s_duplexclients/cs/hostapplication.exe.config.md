# Source code: samples/snippets/csharp/VS_Snippets_CFX/s_duplexclients/cs/hostapplication.exe.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.serviceModel>
    <services>
      <service 
        name="Microsoft.ServiceModel.Samples.CalculatorService"
        behaviorConfiguration="metadataSupport">
        <host>
          <baseAddresses>
            <add baseAddress="http://localhost:8080/SampleService" />
          </baseAddresses>
        </host>
        <endpoint
          address=""
          binding="wsDualHttpBinding"
          contract="Microsoft.ServiceModel.Samples.ICalculatorDuplex"
        />
        <endpoint
           address="mex"
           binding="mexHttpBinding"
           contract="IMetadataExchange"
        />
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior name="metadataSupport">
          <serviceMetadata httpGetEnabled="true" httpGetUrl=""/>
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
```
