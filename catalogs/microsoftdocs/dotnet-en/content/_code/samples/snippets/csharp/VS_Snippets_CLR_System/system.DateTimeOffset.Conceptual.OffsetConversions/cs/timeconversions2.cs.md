# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.DateTimeOffset.Conceptual.OffsetConversions/cs/timeconversions2.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Globalization;

public class TimeConversions
{
   public static void Main()
   {
      TimeConversions tc = new TimeConversions();
      Console.WriteLine(tc.ReturnTimeOnServer("9/1/2007 5:32:07 -05:00"));
   }

   // <Snippet2>
   public DateTimeOffset ReturnTimeOnServer(string clientString)
   {
      string format = @"M/d/yyyy H:m:s zzz";

      try
      {
         DateTimeOffset clientTime = DateTimeOffset.ParseExact(clientString, format,
                                     CultureInfo.InvariantCulture);
         DateTimeOffset serverTime = TimeZoneInfo.ConvertTime(clientTime,
                                     TimeZoneInfo.Local);
         return serverTime;
      }
      catch (FormatException)
      {
         return DateTimeOffset.MinValue;
      }
   }
   // </Snippet2>
}

```
