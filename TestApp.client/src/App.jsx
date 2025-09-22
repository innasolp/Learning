import { useEffect, useState } from 'react';
import './App.css';
import * as testConfirm from 'test_js_lib/confirm'


function App() {
    const [forecasts, setForecasts] = useState();
    const [testViewHtml, setTestViewHtml] = useState();

    useEffect(() => {
        populateWeatherData();
        populateTestView();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>            
            <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>;

    const testView = <div dangerouslySetInnerHTML={testViewHtml} />;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <p className="display_8"> TestApp </p>
            {contents}
            {testView}    
        </div>
        
    );
    
    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }

    async function populateTestView() {
        const response = await fetch('weatherforecast/TestView');
        if (response.ok) {
            testConfirm.testConfirm("JConfirm", "Confirm?");
            const data = await response.text();
            setTestViewHtml({ __html: data });
        }
    }
}

export default App;