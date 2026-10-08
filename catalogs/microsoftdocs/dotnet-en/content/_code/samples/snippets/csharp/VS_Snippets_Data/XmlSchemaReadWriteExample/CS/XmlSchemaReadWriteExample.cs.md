# Source code: samples/snippets/csharp/VS_Snippets_Data/XmlSchemaReadWriteExample/CS/XmlSchemaReadWriteExample.cs

Complete source file; linked examples may select a region or line range.

```
//<snippet1>
using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaReadWriteExample
{
    static void Main()
    {
        try
        {
            XmlTextReader reader = new XmlTextReader("example.xsd");
            XmlSchema schema = XmlSchema.Read(reader, ValidationCallback);
            schema.Write(Console.Out);
            FileStream file = new FileStream("new.xsd", FileMode.Create, FileAccess.ReadWrite);
            XmlTextWriter xwriter = new XmlTextWriter(file, new UTF8Encoding());
            xwriter.Formatting = Formatting.Indented;
            schema.Write(xwriter);
        }
        catch(Exception e)
        {
            Console.WriteLine(e);
        }
    }

    static void ValidationCallback(object sender, ValidationEventArgs args)
    {
        if (args.Severity == XmlSeverityType.Warning)
            Console.Write("WARNING: ");
        else if (args.Severity == XmlSeverityType.Error)
            Console.Write("ERROR: ");

        Console.WriteLine(args.Message);
    }
}
//</snippet1>

```
