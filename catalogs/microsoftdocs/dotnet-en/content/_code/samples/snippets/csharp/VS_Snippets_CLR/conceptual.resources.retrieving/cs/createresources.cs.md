# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/createresources.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet4>
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Resources;

public class Example
{
   public static void Main()
   {
      Bitmap bmp = new Bitmap(@".\SplashScreen.jpg");
      MemoryStream imageStream = new MemoryStream();
      bmp.Save(imageStream, ImageFormat.Jpeg);

      ResXResourceWriter writer = new ResXResourceWriter("AppResources.resx");
      writer.AddResource("SplashScreen", imageStream);
      writer.Generate();
      writer.Close();
   }
}
// </Snippet4>
```
