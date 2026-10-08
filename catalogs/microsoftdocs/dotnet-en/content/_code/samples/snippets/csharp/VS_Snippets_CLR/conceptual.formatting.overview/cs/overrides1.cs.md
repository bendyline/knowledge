# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.formatting.overview/cs/overrides1.cs

Complete source file; linked examples may select a region or line range.

```
namespace HotAndCold2
{
    // <Snippet2>
    public class Temperature
    {
        private decimal temp;

        public Temperature(decimal temperature)
        {
            this.temp = temperature;
        }

        public override string ToString()
        {
            return this.temp.ToString("N1") + "°C";
        }
    }

    public class Example12
    {
        public static void Main()
        {
            Temperature currentTemperature = new Temperature(23.6m);
            Console.WriteLine($"The current temperature is {currentTemperature}");
        }
    }
    // The example displays the following output:
    //       The current temperature is 23.6°C.
    // </Snippet2>
}

```
