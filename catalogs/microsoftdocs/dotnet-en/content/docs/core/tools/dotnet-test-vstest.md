---
title: dotnet test command with VSTest
description: The dotnet test command is used to execute unit tests in a given project using VSTest.
ms.date: 09/12/2026
ai-usage: ai-assisted
---
# dotnet test with VSTest

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet test` - .NET test driver used to execute unit tests with VSTest.

## Synopsis

```dotnetcli
dotnet test [<PROJECT> | <SOLUTION> | <DIRECTORY> | <DLL> | <EXE>]
    [--test-adapter-path <ADAPTER_PATH>]
    [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]
    [--blame]
    [--blame-crash]
    [--blame-crash-dump-type <DUMP_TYPE>]
    [--blame-crash-collect-always]
    [--blame-hang]
    [--blame-hang-dump-type <DUMP_TYPE>]
    [--blame-hang-timeout <TIMESPAN>]
    [-c|--configuration <CONFIGURATION>]
    [--collect <DATA_COLLECTOR_NAME>]
    [-d|--diag <LOG_FILE>]
    [--disable-build-servers]
    [-f|--framework <FRAMEWORK>]
    [-e|--environment <NAME="VALUE">]
    [--filter <EXPRESSION>]
    [--interactive]
    [-l|--logger <LOGGER>]
    [--no-build]
    [--no-dependencies]
    [--nologo]
    [--no-restore]
    [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>]
    [--results-directory <RESULTS_DIR>]
    [-r|--runtime <RUNTIME_IDENTIFIER>]
    [-s|--settings <SETTINGS_FILE>]
    [-t|--list-tests]
    [--tl:[auto|on|off]]
    [-v|--verbosity <LEVEL>]
    [<args>...]
    [[--] <RunSettings arguments>]

dotnet test -h|--help
```

## Description

The `dotnet test` command is used to execute unit tests in a given solution. The `dotnet test` command builds the solution and runs a test host application for each test project in the solution using `VSTest`. The test host executes tests in the given project using a test framework, for example: MSTest, NUnit, or xUnit, and reports the success or failure of each test. If all tests are successful, the test runner returns 0 as an exit code; otherwise if any test fails, it returns 1.

> **Note:**
> `dotnet test` was originally designed to support only `VSTest`-based test projects. Recent versions of the test frameworks are adding support for [Microsoft.Testing.Platform (MTP)](../testing/microsoft-testing-platform-intro.md). This alternative test platform is more lightweight and faster than `VSTest` and supports `dotnet test` with different command line options. For more information, see [dotnet test with MTP](dotnet-test-mtp.md).

For multi-targeted projects, tests are run for each targeted framework. The test host and the unit test framework are packaged as NuGet packages and are restored as ordinary dependencies for the project. Starting with the .NET 9 SDK, these tests are run in parallel by default. To disable parallel execution, set the `TestTfmsInParallel` MSBuild property to `false`. For more information, see [Run tests in parallel](../whats-new/dotnet-9/sdk.md#run-tests-in-parallel) and the [example command line later in this article](#testtfmsinparallel).

Test projects specify the test runner using an ordinary `<PackageReference>` element, as seen in the following sample project file:

[XUnit Basic Template (complete source file; reference: ../../../samples/snippets/csharp/xunit-test/xunit-test.csproj)](../../../_code/samples/snippets/csharp/xunit-test/xunit-test.csproj.md)

Where `Microsoft.NET.Test.Sdk` is the test host, `xunit` is the test framework. And `xunit.runner.visualstudio` is a test adapter, which allows the xUnit framework to work with the test host.

## Implicit restore

You don't have to run [`dotnet restore`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tools/dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](dotnet-restore.md).


### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see [Advertising manifests](dotnet-workload-install.md#advertising-manifests).


## Arguments

- **`PROJECT | SOLUTION | DIRECTORY | DLL | EXE`**

  - Path to the test project.
  - Path to the solution.
  - Path to a directory that contains a project or a solution.
  - Path to a test project *.dll* file.
  - Path to a test project *.exe* file.

  If not specified, the effect is the same as using the `DIRECTORY` argument to specify the current directory.

## Options

> **Warning:**
> Breaking changes in options:
>
> - Starting in .NET 7: switch `-a` to alias `--arch` instead of `--test-adapter-path`
> - Starting in .NET 7: switch `-r` to alias `--runtime` instead of `--results-directory`

- **`--test-adapter-path <ADAPTER_PATH>`**

  The path to the custom adapters to use for the test run.

  Short form `-a` available in .NET SDK versions earlier than 7.

- **`-a|--arch <ARCHITECTURE>`**

Specifies the target architecture. This is a shorthand syntax for setting the [Runtime Identifier (RID)](../rid-catalog.md), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--arch x86` sets the RID to `win-x86`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6 Preview 7.


- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see [Artifacts Output Layout](../sdk/artifacts-output.md). This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.


- **`--blame`**

  Runs the tests in blame mode. This option is helpful in isolating problematic tests that cause the test host to crash. When a crash is detected, it creates a sequence file in `TestResults/<Guid>/<Guid>_Sequence.xml` that captures the order of tests that were run before the crash.

  This option doesn't create a memory dump and isn't helpful when the test is hanging.

- **`--blame-crash`** (Available since .NET 5.0 SDK)

  Runs the tests in blame mode and collects a crash dump when the test host exits unexpectedly. This option depends on the version of .NET used, the type of error, and the operating system.

  For exceptions in managed code, a dump will be automatically collected on .NET 5.0 and later versions. It will generate a dump for testhost or any child process that also ran on .NET 5.0 and crashed. Crashes in native code will not generate a dump. This option works on Windows, macOS, and Linux.

  Crash dumps in native code, or when using .NET Core 3.1 or earlier versions, can only be collected on Windows, by using Procdump. A directory that contains *procdump.exe* and *procdump64.exe* must be in the PATH or PROCDUMP_PATH environment variable. [Download the tools](https://learn.microsoft.com/sysinternals/downloads/procdump). Implies `--blame`.

  To collect a crash dump from a native application running on .NET 5.0 or later, the usage of Procdump can be forced by setting the `VSTEST_DUMP_FORCEPROCDUMP` environment variable to `1`.

  For the full list of test platform environment variables, see [Environment variables](https://github.com/microsoft/vstest/blob/main/docs/environment-variables.md).

- **`--blame-crash-dump-type <DUMP_TYPE>`** (Available since .NET 5.0 SDK)

  The type of crash dump to be collected. Supported dump types are `full` (default), and `mini`. Implies `--blame-crash`.

- **`--blame-crash-collect-always`** (Available since .NET 5.0 SDK)

  Collects a crash dump on expected as well as unexpected test host exit.

- **`--blame-hang`** (Available since .NET 5.0 SDK)

  Run the tests in blame mode and collects a hang dump when a test exceeds the given timeout.

- **`--blame-hang-dump-type <DUMP_TYPE>`** (Available since .NET 5.0 SDK)

  The type of crash dump to be collected. It should be `full`, `mini`, or `none`. When `none` is specified, test host is terminated on timeout, but no dump is collected. Implies `--blame-hang`.

- **`--blame-hang-timeout <TIMESPAN>`** (Available since .NET 5.0 SDK)

  Per-test timeout, after which a hang dump is triggered and the test host process and all of its child processes are dumped and terminated. The timeout value is specified in one of the following formats:

  - 1.5h, 1.5hour, 1.5hours
  - 90m, 90min, 90minute, 90minutes
  - 5400s, 5400sec, 5400second, 5400seconds
  - 5400000ms, 5400000mil, 5400000millisecond, 5400000milliseconds

  When no unit is used (for example, 5400000), the value is assumed to be in milliseconds. When used together with data driven tests, the timeout behavior depends on the test adapter used. For xUnit, NUnit, and MSTest 2.2.4+, the timeout is renewed after every test case. For MSTest before version 2.2.4, the timeout is used for all test cases. This option is supported on Windows with `netcoreapp2.1` and later, on Linux with `netcoreapp3.1` and later, and on macOS with `net5.0` or later. Implies `--blame` and `--blame-hang`.

  You can also configure blame in a `.runsettings` file and pass it with `--settings`. The `.runsettings` file supports the same blame behavior and additional keys that aren't exposed as top-level `dotnet test` switches, such as `CollectDumpOnTestSessionHang` and `MonitorPostmortemDebugger`. For more information, see [Blame data collector](https://github.com/microsoft/vstest/blob/main/docs/extensions/blame-datacollector.md).

  ```xml
  <RunSettings>
    <DataCollectionRunSettings>
      <DataCollectors>
        <DataCollector friendlyName="blame" enabled="true">
          <Configuration>
            <CollectDump CollectAlways="true" DumpType="full" />
            <CollectDumpOnTestSessionHang TestTimeout="30min" HangDumpType="full" />
            <MonitorPostmortemDebugger DumpDirectoryPath="C:\Dumps" />
          </Configuration>
        </DataCollector>
      </DataCollectors>
    </DataCollectionRunSettings>
  </RunSettings>
  ```

  The following tables map the blame options to their `dotnet test` switches and `.runsettings` elements. For the complete blame collector reference, see [Blame data collector](https://github.com/microsoft/vstest/blob/main/docs/extensions/blame-datacollector.md).

  Crash dump options:

  | Behavior | `dotnet test` switch | `.runsettings` element |
  | --- | --- | --- |
  | Collect a crash dump | `--blame-crash` | `<CollectDump />` |
  | Collect even on a clean exit | `--blame-crash-collect-always` | `<CollectDump CollectAlways="true" />` |
  | Dump type (`mini`, `full`; default `full`) | `--blame-crash-dump-type` | `<CollectDump DumpType="full" />` |

  Hang dump options:

  | Behavior | `dotnet test` switch | `.runsettings` element |
  | --- | --- | --- |
  | Collect a hang dump | `--blame-hang` | `<CollectDumpOnTestSessionHang />` |
  | Timeout before the hang dump (default `1h`) | `--blame-hang-timeout` | `<CollectDumpOnTestSessionHang TestTimeout="90m" />` |
  | Hang dump type (`mini`, `full`, `none`) | `--blame-hang-dump-type` | `<CollectDumpOnTestSessionHang HangDumpType="mini" />` |

  For Microsoft.Testing.Platform (MTP) test apps, the `--blame-*` switches and the blame data collector don't apply. MTP uses `--crashdump`, `--hangdump`, and `--hangdump-timeout` from the `Microsoft.Testing.Extensions.CrashDump` and `Microsoft.Testing.Extensions.HangDump` packages. For more information, see [dotnet test with MTP](dotnet-test-mtp.md).

- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. The default for most projects is `Debug`, but you can override the build configuration settings in your project.


- **`--collect <DATA_COLLECTOR_NAME>`**

  Enables a data collector for the test run. For more information, including the Event Log data collector and guidance for authoring your own data collector, see [Monitor and analyze test run](https://aka.ms/vstest-collect).

  For example you can collect code coverage by using the `--collect "Code Coverage"` option. For more information, see [Use code coverage](https://learn.microsoft.com/visualstudio/test/using-code-coverage-to-determine-how-much-code-is-being-tested), [Customize code coverage analysis](https://learn.microsoft.com/visualstudio/test/customizing-code-coverage-analysis), and [GitHub issue dotnet/docs#34479](https://github.com/dotnet/docs/issues/34479).

  To collect code coverage you can also use [Coverlet](https://github.com/coverlet-coverage/coverlet/blob/master/README.md) by using the `--collect "XPlat Code Coverage"` option.

- **`-d|--diag <LOG_FILE>`**

  Enables diagnostic mode for the test platform and writes diagnostic messages to the specified file and to files next to it. The process that is logging the messages determines which files are created, such as `*.host_<date>.txt` for test host log, and `*.datacollector_<date>.txt` for data collector log.

  To set the trace level, append `;tracelevel=<LEVEL>` to the log file name, for example `--diag log.txt;tracelevel=verbose`. The allowed values for `tracelevel` are `off`, `error`, `warning`, `info`, and `verbose`. The default value is `verbose`.

- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.


- **`-e|--environment <NAME="VALUE">`**

  Sets the value of an environment variable. Creates the variable if it doesn't exist, overrides if it does exist. Use of this option will force the tests to be run in an isolated process. The option can be specified multiple times to provide multiple variables.

- **`-f|--framework <FRAMEWORK>`**

  The [target framework moniker (TFM)](../../standard/frameworks.md) of the target framework to run tests for. The target framework must also be specified in the project file.

- **`--filter <EXPRESSION>`**

  Filters tests in the current project using the given expression. Only tests that match the filter expression are run. For more information, see the [Filter option details](#filter-option-details) section. For more information and examples on how to use selective unit test filtering, see [Running selective unit tests](../testing/selective-unit-tests.md).

- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`-l|--logger <LOGGER>`**

  Specifies a logger for test results and optionally switches for the logger. Specify this parameter multiple times to enable multiple loggers. For more information, see [Reporting test results](https://github.com/microsoft/vstest/blob/main/docs/report.md#available-test-loggers), [Switches for loggers](https://learn.microsoft.com/visualstudio/msbuild/msbuild-command-line-reference#switches-for-loggers), and the [examples](#examples) later in this article.

  In order to pass command-line switches to the logger:

  * Use the full name of the switch, not the abbreviated form (for example, `verbosity` instead of `v`).
  * Omit any leading dashes.
  * Replace the space separating each switch with a semicolon `;`.
  * If the switch has a value, replace the colon separator between that switch and its value with the equals sign `=`.

  For example, `-v:detailed --consoleLoggerParameters:ErrorsOnly` would become `verbosity=detailed;consoleLoggerParameters=ErrorsOnly`.

- **`--no-build`**

  Doesn't build the test project before running it. It also implicitly sets the `--no-restore` flag.

- **`--no-dependencies`**

  Skips building project-to-project references. Available starting with .NET 11 Preview 6.

- **`--nologo`**

  Run tests without displaying the Microsoft TestPlatform banner. Available since .NET Core 3.0 SDK.

- **`--no-restore`**

  Doesn't execute an implicit restore when running the command.

- **`-o|--output <OUTPUT_DIRECTORY>`**

  Directory in which to find the binaries to run. If not specified, the default path is `./bin/<configuration>/<framework>/`.  For projects with multiple target frameworks (via the `TargetFrameworks` property), you also need to define `--framework` when you specify this option. `dotnet test` always runs tests from the output directory. You can use [System.AppDomain.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppDomain.BaseDirectory) to consume test assets in the output directory.

  - .NET 7.0.200 SDK and later

    If you specify the `--output` option when running this command on a solution, the CLI will emit a warning (an error in 7.0.200) due to the unclear semantics of the output path. The `--output` option is disallowed because all outputs of all built projects would be copied into the specified directory, which isn't compatible with multi-targeted projects, as well as projects that have different versions of direct and transitive dependencies. For more information, see [Solution-level `--output` option no longer valid for build-related commands](../compatibility/sdk/7.0/solution-level-output-no-longer-valid.md).

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the [Runtime Identifier (RID)](../rid-catalog.md), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.


- **`--results-directory <RESULTS_DIR>`**

  The directory where the test results are going to be placed. If the specified directory doesn't exist, it's created. The default is `TestResults` in the directory that contains the project file.

  Short form `-r` available in .NET SDK versions earlier than 7.

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  The target runtime to test for.

  Short form `-r` available starting in .NET SDK 7.

- **`-s|--settings <SETTINGS_FILE>`**

  The `.runsettings` file to use for running the tests. The `TargetPlatform` element (x86|x64) has no effect for `dotnet test`. To run tests that target x86, install the x86 version of .NET Core. The bitness of the *dotnet.exe* that is on the path is what will be used for running tests. For more information, see the following resources:

  - [Configure unit tests by using a `.runsettings` file.](https://learn.microsoft.com/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file)
  - [Configure a test run](https://github.com/microsoft/vstest/blob/main/docs/configure.md)

- **`-t|--list-tests`**

  List the discovered tests instead of running the tests.

- **`--tl:[auto|on|off]`**

Specifies whether *Terminal Logger* should be used for the build output. The default is `auto`, which first verifies the environment before enabling terminal logging. The environment check verifies that the terminal is capable of using modern output features and isn't using a redirected standard output before enabling the new logger. `on` skips the environment check and enables terminal logging. `off` skips the environment check and uses the default console logger.

Terminal Logger shows you the restore phase followed by the build phase. During each phase, the currently building projects appear at the bottom of the terminal. Each project that's building outputs both the MSBuild target currently being built and the amount of time spent on that target. You can search this information to learn more about the build. When a project is finished building, a single "build completed" section is written that captures:

- The name of the built project.
- The target framework (if multi-targeted).
- The status of that build.
- The primary output of that build (which is hyperlinked).
- Any diagnostics generated for that project.

This option is available starting in .NET 8.


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`args`**

  Specifies extra arguments to pass to the adapter. Use a space to separate multiple arguments.

  The list of possible arguments depends upon the specified behavior:
  - When you specify a project, solution, or a directory, or if you omit this argument, the call is forwarded to `msbuild`. In that case, the available arguments can be found in [the dotnet msbuild documentation](dotnet-msbuild.md).
  - When you specify a *.dll* or an *.exe*, the call is forwarded to `vstest`. In that case, the available arguments can be found in [the dotnet vstest documentation](dotnet-vstest.md).

- **`RunSettings`** arguments

 Inline `RunSettings` are passed as the last arguments on the command line after "-- " (note the space after --). Inline `RunSettings` are specified as `[name]=[value]` pairs. A space is used to separate multiple `[name]=[value]` pairs.

  Example: `dotnet test -- MSTest.DeploymentEnabled=false MSTest.MapInconclusiveToFailed=True`

  Starting with the .NET 5 SDK, you can also set `TestRunParameters` from the command line, for example: `dotnet test -- TestRunParameters.Parameter(name="myParam", value="value")`. `RunSettings` arguments take precedence over values from a `.runsettings` file.

  For more information, see [Passing RunSettings arguments through command line](https://github.com/microsoft/vstest/blob/main/docs/RunSettingsArguments.md).

## Examples

- Run the tests in the project in the current directory:

  ```dotnetcli
  dotnet test
  ```

- Run the tests in the `test1` project:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj
  ```

- Run the tests using `test1.dll` assembly:

  ```dotnetcli
  dotnet test ~/projects/test1/bin/debug/test1.dll
  ```

- Run the tests in the project in the current directory, and generate a test results file in the trx format:

  ```dotnetcli
  dotnet test --logger trx
  ```

- Run the tests in the project in the current directory, and generate a code coverage file using [Microsoft Code Coverage](https://github.com/microsoft/codecoverage/blob/main/README.md):

  ```dotnetcli
  dotnet test --collect "Code Coverage"
  ```

- Run the tests in the project in the current directory, and generate a code coverage file using [Coverlet](https://github.com/coverlet-coverage/coverlet/blob/master/README.md) (after installing [Coverlet](https://github.com/coverlet-coverage/coverlet/blob/master/Documentation/VSTestIntegration.md) collectors integration):

  ```dotnetcli
  dotnet test --collect:"XPlat Code Coverage"
  ```

- Run the tests in the project in the current directory, and log with detailed verbosity to the console:

  ```dotnetcli
  dotnet test --logger "console;verbosity=detailed"
  ```

- Run the tests in the project in the current directory, and log with the trx logger to *testResults.trx* in the *TestResults* folder:

  ```dotnetcli
  dotnet test --logger "trx;logfilename=testResults.trx"
  ```

  Since the log file name is specified, the same name is used for each target framework in the case of a multi-targeted project. The output for each target framework overwrites the output for preceding target frameworks. The file is created in the *TestResults* folder in the test project folder, because relative paths are relative to that folder. The following example shows how to produce a separate file for each target framework.

- Run the tests in the project in the current directory, and log with the trx logger to files in the *TestResults* folder, with file names that are unique for each target framework:

  ```dotnetcli
  dotnet test --logger:"trx;LogFilePrefix=testResults"
  ```

- Run the tests in the project in the current directory, and log with the html logger to *testResults.html* in the *TestResults* folder:

  ```dotnetcli
  dotnet test --logger "html;logfilename=testResults.html"
  ```

- Run the tests in the project in the current directory, and report tests that were in progress when the test host crashed:

  ```dotnetcli
  dotnet test --blame
  ```

- Run the tests in the `test1` project, providing the `-bl` (binary log) argument to `msbuild`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -bl
  ```

- Run the tests in the `test1` project, setting the MSBuild `DefineConstants` property to `DEV`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -p:DefineConstants="DEV"
  ```

  <a id="testtfmsinparallel"></a>

- Run the tests in the `test1` project, setting the MSBuild `TestTfmsInParallel` property to `false`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -p:TestTfmsInParallel=false
  ```

## Filter option details

`--filter <EXPRESSION>`

`<Expression>` has the format `<property><operator><value>[|&<Expression>]`.

`<property>` is an attribute of the `Test Case`. The following are the properties supported by popular unit test frameworks:

| Test Framework | Supported properties |
| --- | --- |
| MSTest | <ul><li>FullyQualifiedName</li><li>Name</li><li>ClassName</li><li>Priority</li><li>TestCategory</li></ul> |
| xUnit | <ul><li>FullyQualifiedName</li><li>DisplayName</li><li>Traits</li></ul> |
| NUnit | <ul><li>FullyQualifiedName</li><li>Name</li><li>Priority</li><li>TestCategory</li><li>Category</li><li>Property</li></ul> |

For xUnit, a trait defined with `[Trait("key", "value")]` is filtered by its key (for example, `[Trait("Category", "bvt")]` is matched with `--filter Category=bvt`). For NUnit, `TestCategory` and `Category` are equivalent, and a property defined with `[Property("key", "value")]` is filtered by its key.

The `<operator>` describes the relationship between the property and the value:

| Operator | Function |
| :---: | --- |
| `=` | Exact match |
| `!=` | Not exact match |
| `~` | Contains |
| `!~` | Not contains |

`<value>` is a string. All the lookups are case insensitive.

An expression without an `<operator>` is automatically considered as a `contains` on `FullyQualifiedName` property (for example, `dotnet test --filter xyz` is same as `dotnet test --filter FullyQualifiedName~xyz`).

Expressions can be joined with conditional operators:

| Operator | Function |
| --- | --- |
| <code>&#124;</code> | OR |
| `&` | AND |

You can enclose expressions in parenthesis when using conditional operators (for example, `(Name~TestMethod1) | (Name~TestMethod2)`).

For more information and examples on how to use selective unit test filtering, see [Running selective unit tests](../testing/selective-unit-tests.md).

## Exit codes

When you run tests through the VSTest path, `dotnet test` reports the outcome with one of two exit codes:

| Exit code | Meaning |
| --- | --- |
| `0` | Success. The requested operation completed and, for a test run, all executed tests passed. |
| `1` | Failure. For example, one or more tests failed, a run error was reported, the command line was invalid, a test source couldn't be loaded, or the run was aborted or canceled. |

The underlying `vstest.console` process never returns any other value.

When discovery finds no matching tests, the run prints a warning rather than an error and still returns `0` by default. To make a run that discovers or selects zero tests return `1` instead, set `RunConfiguration.TreatNoTestsAsError` to `true` in a `.runsettings` file.

## See also

- [Frameworks and Targets](../../standard/frameworks.md)
- [.NET Runtime Identifier (RID) catalog](../rid-catalog.md)
- [Passing runsettings arguments through commandline](https://github.com/microsoft/vstest/blob/main/docs/RunSettingsArguments.md)
- [VSTest environment variables (microsoft/vstest)](https://github.com/microsoft/vstest/blob/main/docs/environment-variables.md)
- [dotnet test](dotnet-test.md)
- [dotnet test with MTP](dotnet-test-mtp.md)
