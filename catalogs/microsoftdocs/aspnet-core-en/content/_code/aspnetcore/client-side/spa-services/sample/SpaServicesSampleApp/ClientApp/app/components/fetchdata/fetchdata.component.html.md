# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/ClientApp/app/components/fetchdata/fetchdata.component.html

Complete source file; linked examples may select a region or line range.

```
<h1>Weather forecast</h1>

<p>This component demonstrates fetching data from the server.</p>

<p *ngIf="!forecasts"><em>Loading...</em></p>

<table class='table' *ngIf="forecasts">
    <thead>
        <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let forecast of forecasts">
            <td>{{ forecast.dateFormatted }}</td>
            <td>{{ forecast.temperatureC }}</td>
            <td>{{ forecast.temperatureF }}</td>
            <td>{{ forecast.summary }}</td>
        </tr>
    </tbody>
</table>

```
