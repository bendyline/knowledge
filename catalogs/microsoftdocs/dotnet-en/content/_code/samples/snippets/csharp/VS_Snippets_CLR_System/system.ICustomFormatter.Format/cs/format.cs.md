# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.ICustomFormatter.Format/cs/format.cs

Complete source file; linked examples may select a region or line range.

```
using System;

public class CustomFormatter : IFormatProvider, ICustomFormatter
{
   public object GetFormat(Type formatType)
   {
      return this;
   }

   public string Format(string format, object arg, IFormatProvider formatProvider)
   {
      string s = null;

      // <Snippet1>
      if (arg is IFormattable)
         s = ((IFormattable)arg).ToString(format, formatProvider);
      else if (arg != null)
         s = arg.ToString();
      // </Snippet1>
      return s;
   }
}

```
