# Source code: samples/snippets/csharp/VS_Snippets_Misc/tpl_parallel/cs/nongeneric.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections;
using System.Linq;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {

            ArrayList nonGenericCollection = new ArrayList();
            //<snippet07>
            Parallel.ForEach(nonGenericCollection.Cast<object>(),
                currentElement =>
                {
                });
            //</snippet07>
        }
    }
}

```
