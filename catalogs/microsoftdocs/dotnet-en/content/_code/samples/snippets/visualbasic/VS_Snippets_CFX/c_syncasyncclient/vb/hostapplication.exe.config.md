# Source code: samples/snippets/visualbasic/VS_Snippets_CFX/c_syncasyncclient/vb/hostapplication.exe.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.serviceModel>
    <services>
      <service 
        name="Microsoft.WCF.Documentation.SampleService"
        behaviorConfiguration="metadataAndDebug">
        <host>
          <baseAddresses>
            <add baseAddress="http://localhost:8080/SyncAsyncService"/>
          </baseAddresses>
        </host>
        <endpoint
          address=""
          binding="wsHttpBinding"
          contract="Microsoft.WCF.Documentation.ISampleService"
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
        <behavior name="metadataAndDebug">
          <serviceDebug includeExceptionDetailInFaults="true"/>
          <serviceMetadata httpGetEnabled="true" httpGetUrl=""/>
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
```
