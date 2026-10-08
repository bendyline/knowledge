---
title: Distributed tracing concepts - .NET
description: .NET distributed tracing concepts
ms.date: 03/14/2021
---

# .NET distributed tracing concepts

Distributed tracing is a diagnostic technique that helps engineers localize failures and
performance issues within applications, especially those that may be distributed across
multiple machines or processes. See the [Distributed Tracing Overview](distributed-tracing.md)
for general information about where distributed tracing is useful.

## Traces and Activities

Each time a new request is received by an application, it can be associated with a trace. In
application components written in .NET, units of work in a trace are represented by instances of
[System.Diagnostics.Activity](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity) and the trace as a whole forms
a tree of these Activities, potentially spanning across many distinct processes. The first
Activity created for a new request forms the root of the trace tree and it tracks the overall
duration and success/failure handling the request. Child activities can be optionally created
to subdivide the work into different steps that can be tracked individually.
For example, given an Activity that tracked a specific inbound HTTP request in a web server,
child activities could be created to track each of the database queries that were necessary to
complete the request. This allows the duration and success for each query to be recorded independently.
Activities can record other information for each unit of work such as
[System.Diagnostics.Activity.OperationName](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.OperationName), name-value pairs
called [System.Diagnostics.Activity.Tags](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Tags), and [System.Diagnostics.Activity.Events](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Events). The
name identifies the type of work being performed, tags can record descriptive parameters of the work,
and events are a simple logging mechanism to record timestamped diagnostic messages.

> **Note:**
> Another common industry name for units of work in a distributed trace are 'Spans'.
> .NET adopted the term 'Activity' many years ago, before the name 'Span' was well
> established for this concept.

## Activity IDs

Parent-Child relationships between Activities in the distributed trace tree are established
using unique IDs. .NET's implementation of distributed tracing supports two ID schemes: the W3C
standard [TraceContext](https://www.w3.org/TR/trace-context/), which is the default in .NET 5+, and
an older .NET convention called 'Hierarchical' that's available for backwards compatibility.
[System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat) controls which
ID scheme is used. In the W3C TraceContext standard, every trace is assigned a globally unique 16-byte trace-id ([System.Diagnostics.Activity.TraceId](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.TraceId)), and
every Activity within the trace is assigned a unique 8-byte span-id
([System.Diagnostics.Activity.SpanId](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.SpanId)). Each Activity
records the trace-id, its own span-id, and the span-id of its parent
([System.Diagnostics.Activity.ParentSpanId](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.ParentSpanId)). Because
distributed traces can track work across process boundaries, parent and child Activities may
not be in the same process. The combination of a trace-id and parent span-id can uniquely
identify the parent Activity globally, regardless of what process it resides in.

[System.Diagnostics.Activity.DefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.DefaultIdFormat) controls which
ID format is used for starting new traces, but by default adding a new Activity to an existing
trace uses whatever format the parent Activity is using.
Setting [System.Diagnostics.Activity.ForceDefaultIdFormat](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.ForceDefaultIdFormat)
to true overrides this behavior and creates all new Activities with the DefaultIdFormat, even
when the parent uses a different ID format.

## Start and stop Activities

Each thread in a process may have a corresponding Activity object that tracks the work
occurring on that thread, accessible via
[System.Diagnostics.Activity.Current](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Current). The current activity
automatically flows along all synchronous calls on a thread and follows async calls
that are processed on different threads. If Activity A is the current activity on a thread and
code starts a new Activity B, then B becomes the new current activity on that thread. By default,
activity B will also treat Activity A as its parent. When Activity B is later stopped, activity
A will be restored as the current Activity on the thread. When an Activity is started, it
captures the current time as the
[System.Diagnostics.Activity.StartTimeUtc](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.StartTimeUtc). When it
stops, [System.Diagnostics.Activity.Duration](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.Duration) is calculated
as the difference between the current time and the start time.

## Coordinate across process boundaries

To track work across process boundaries, Activity parent IDs need to be transmitted across
the network so that the receiving process can create Activities that refer to them. When using
the W3C TraceContext ID format, .NET also uses the HTTP headers recommended by
[the standard](https://www.w3.org/TR/trace-context/) to transmit this information. When using the
[System.Diagnostics.ActivityIdFormat.Hierarchical](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityIdFormat.Hierarchical) ID format,
.NET uses a custom request-id HTTP header to transmit the ID. Unlike many other language runtimes,
.NET in-box libraries such as the ASP.NET web server and System.Net.Http natively understand how to
decode and encode Activity IDs on HTTP messages. The runtime also understands how to flow the ID
through synchronous and asynchronous calls. This means that .NET applications that receive and
emit HTTP messages participate in flowing distributed trace IDs automatically, with no special
coding by the app developer or third-party library dependencies. Third-party libraries may add
support for transmitting IDs over non-HTTP message protocols or supporting custom encoding
conventions for HTTP.

## Collect traces

Instrumented code can create [System.Diagnostics.Activity](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity) objects
as part of a distributed trace, but the information in these objects needs to be transmitted
and serialized in a centralized persistent store so that the entire trace can be usefully reviewed
later. There are several telemetry collection libraries that can do this task such as
[Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/distributed-tracing),
[OpenTelemetry](https://github.com/open-telemetry/opentelemetry-dotnet/blob/main/docs/trace/getting-started-console/README.md),
or a library provided by a third-party telemetry or APM vendor. Alternately, developers can author
their own custom Activity telemetry collection by using
[System.Diagnostics.ActivityListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityListener) or
[System.Diagnostics.DiagnosticListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DiagnosticListener). ActivityListener
supports observing any Activity regardless of whether the developer has any prior knowledge about it.
This makes ActivityListener a simple and flexible general purpose solution. By contrast, using
DiagnosticListener is a more complex scenario that requires the instrumented code to opt in by
invoking [System.Diagnostics.DiagnosticSource.StartActivity*](https://learn.microsoft.com/search/?terms=System.Diagnostics.DiagnosticSource.StartActivity*) and
the collection library needs to know the exact naming information that the instrumented code
used when starting it. Using DiagnosticSource and DiagnosticListener allows the creator
and listener to exchange arbitrary .NET objects and establish customized information passing
conventions.

## Sampling

For improved performance in high throughput applications, distributed tracing on .NET supports
sampling only a subset of traces rather than recording all of them. For activities created with
the recommended [System.Diagnostics.ActivitySource.StartActivity*](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivitySource.StartActivity*)
API, telemetry collection libraries can control sampling with the
[System.Diagnostics.ActivityListener.Sample](https://learn.microsoft.com/search/?terms=System.Diagnostics.ActivityListener.Sample) callback.
The logging library can elect not to create the Activity at all, to create it with minimal
information necessary to propagate distributing tracing IDs, or to populate it with complete
diagnostic information. These choices trade-off increasing performance overhead for
increasing diagnostic utility. Activities that are started using the older pattern of invoking
[System.Diagnostics.Activity.%23ctor*](https://learn.microsoft.com/search/?terms=System.Diagnostics.Activity.%2523ctor*) and
[System.Diagnostics.DiagnosticSource.StartActivity*](https://learn.microsoft.com/search/?terms=System.Diagnostics.DiagnosticSource.StartActivity*) may
also support DiagnosticListener sampling by first calling
[System.Diagnostics.DiagnosticSource.IsEnabled*](https://learn.microsoft.com/search/?terms=System.Diagnostics.DiagnosticSource.IsEnabled*).
Even when capturing full diagnostic information, the .NET
implementation is designed to be fast - coupled with an efficient collector, an Activity can be
created, populated, and transmitted in about a microsecond on modern hardware. Sampling
can reduce the instrumentation cost to less than 100 nanoseconds for each Activity that isn't
recorded.

## Next steps

For example code to get started
using distributed tracing in .NET applications, see the [Distributed Tracing Instrumentation](distributed-tracing-instrumentation-walkthroughs.md).

For a list of activities emitted natively by .NET, see [Built-in activities in .NET](distributed-tracing-builtin-activities.md).
