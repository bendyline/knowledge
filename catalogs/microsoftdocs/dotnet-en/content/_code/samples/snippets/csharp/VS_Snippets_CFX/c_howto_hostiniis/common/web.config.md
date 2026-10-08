# Source code: samples/snippets/csharp/VS_Snippets_CFX/c_howto_hostiniis/common/web.config

Complete source file; linked examples may select a region or line range.

```
<!-- <snippet100> -->
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.serviceModel>
    <services>
      <service name="Microsoft.ServiceModel.Samples.CalculatorService" behaviorConfiguration="CalculatorServiceBehaviors">

        <!-- This endpoint is exposed at the base address provided by host: http://localhost/servicemodelsamples/service.svc -->
        <endpoint address=""
                  binding="wsHttpBinding"
                  contract="Microsoft.ServiceModel.Samples.ICalculator" />

        <!-- The mex endpoint is exposed at http://localhost/servicemodelsamples/service.svc/mex -->
        <endpoint address="mex"
                  binding="mexHttpBinding"
                  contract="IMetadataExchange" />
      </service>
    </services>

    <behaviors>
      <serviceBehaviors>
        <behavior name="CalculatorServiceBehaviors">
          <!-- Add the following element to your service behavior configuration. -->
          <serviceMetadata httpGetEnabled="true" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>

</configuration>
<!-- </snippet100> -->

```
