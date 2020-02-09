import React, { Component } from 'react';

class App extends Component {
    state = {
        Weather : {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09n"}],"base":"stations","main":{"temp":10.22,"feels_like":1.64,"temp_min":8.89,"temp_max":11.67,"pressure":987,"humidity":81},"visibility":10000,"wind":{"speed":11.3,"deg":240,"gust":17.5},"clouds":{"all":40},"dt":1581278071,"sys":{"type":1,"id":1412,"country":"GB","sunrise":1581233208,"sunset":1581267763},"timezone":0,"id":2643743,"name":"London","cod":200},
        Query   : "London",
    } 
    

    dateBuilder(date_time)
    {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day     = days[date_time.getDay()];
        let date    = date_time.getDate();
        let month   = months[date_time.getMonth()];
        let year    = date_time.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    search = (event) => {
        if (event.key === "Enter") {
            
          let request_query=`${process.env.REACT_APP_WEATHER_API_BASE_URL}weather?q=${this.state.Query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;         
          fetch(request_query)
            .then(res => res.json())
            .then(result => {
              this.setState({Weather:result, Query:""});
            });
        }
    }

    render() {
        return (
            <div className={(typeof this.state.Weather.main != "undefined") ? ((this.state.Weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
                <main>
                    <div className="search-box">
                        <input 
                            type="text"
                            className="search-bar"
                            placeholder="Search..."
                            onChange={e => this.setState({ Query: e.target.value})}
                            value={this.state.Query}
                            onKeyPress={this.search}                            
                        />
                    </div>
                    <div className="location-box">
                        <div className="location">{this.state.Weather.name}</div>
                        <div className="date"> {this.dateBuilder(new Date())} </div>
                        <div className="position">Latitude {this.state.Weather.coord.lat}, Longitude: {this.state.Weather.coord.lon}</div>
                    </div>
                    <div className="weather-box">                        
                        <div className="temp">
                        <img src={"http://openweathermap.org/img/wn/"+ (this.state.Weather.weather[0].icon || "01d")+"@2x.png"} alt={this.state.Weather.weather[0].description}/>
                            {Math.round(this.state.Weather.main.temp || 0)}°c
                        </div>
                        <div className="weather">{this.state.Weather.weather[0].main}</div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;