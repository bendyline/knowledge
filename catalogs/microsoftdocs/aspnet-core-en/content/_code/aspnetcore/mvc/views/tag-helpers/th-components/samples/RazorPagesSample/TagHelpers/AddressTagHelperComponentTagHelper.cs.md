# Source code: aspnetcore/mvc/views/tag-helpers/th-components/samples/RazorPagesSample/TagHelpers/AddressTagHelperComponentTagHelper.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Logging;

namespace RazorPagesSample.TagHelpers
{
    [HtmlTargetElement("address")]
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class AddressTagHelperComponentTagHelper : TagHelperComponentTagHelper
    {
        public AddressTagHelperComponentTagHelper(
            ITagHelperComponentManager componentManager, 
            ILoggerFactory loggerFactory) : base(componentManager, loggerFactory)
        {
        }
    }
}

```
