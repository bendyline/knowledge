# Source code: aspnetcore/fundamentals/url-rewriting/samples/6.x/SampleApp/IISUrlRewrite.xml

Complete source file; linked examples may select a region or line range.

```
<rewrite>
  <rules>
    <rule name="Rewrite segment to id querystring" stopProcessing="true">
      <match url="^iis-rules-rewrite/(.*)$" />
      <action type="Rewrite" url="rewritten?id={R:1}" appendQueryString="false"/>
    </rule>
  </rules>
</rewrite>

```
