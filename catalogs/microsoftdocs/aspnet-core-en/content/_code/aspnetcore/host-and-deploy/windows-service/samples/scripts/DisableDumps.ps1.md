# Source code: aspnetcore/host-and-deploy/windows-service/samples/scripts/DisableDumps.ps1

Complete source file; linked examples may select a region or line range.

```
param(
    [Parameter(Position=0,mandatory=$true)]
    $application
)

$werHive = "HKLM:\SOFTWARE\Microsoft\Windows\Windows Error Reporting";
$ldHive = "$werHive\LocalDumps";
$applicationHive = "$ldHive\$application";

if (Test-Path $applicationHive)
{
    Remove-Item $applicationHive -Force;
}

```
