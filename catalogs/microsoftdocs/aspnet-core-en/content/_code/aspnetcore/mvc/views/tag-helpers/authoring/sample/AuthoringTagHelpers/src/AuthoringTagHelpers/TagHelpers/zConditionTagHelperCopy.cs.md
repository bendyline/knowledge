# Source code: aspnetcore/mvc/views/tag-helpers/authoring/sample/AuthoringTagHelpers/src/AuthoringTagHelpers/TagHelpers/zConditionTagHelperCopy.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace TagH1p.TagHelpers
{
   [HtmlTargetElement(Attributes = nameof(Condition))]
    //   [HtmlTargetElement(Attributes = "condition")]
    public class ConditionTagHelper : TagHelper
   {
      public bool Condition { get; set; }

      public override void Process(TagHelperContext context, TagHelperOutput output)
      {
         if (!Condition)
         {
            output.SuppressOutput();
         }
      }
   }
}
```
