# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Helpers/MyHtmlHelper.cs

Complete source file; linked examples may select a region or line range.

```
namespace ViewInjectSample.Helpers
{
    public class MyHtmlHelper
    {
        public MyHtmlHelper()
        {
            Value = "Hello from MyHtmlHelper";
        }
        public string Value { get; set; }
    }
}

```
