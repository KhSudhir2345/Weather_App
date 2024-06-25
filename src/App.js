import { useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [inputValue,setInputValue]=useState("");
  const [weather,setWeather]=useState(null);
  const [Humidity,setHumidity]=useState(null);
  const [WindSpeed,setWindspeed]=useState(null);
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const img_url='https://cdn.vectorstock.com/i/1000v/05/29/thermometer-icon-or-temperature-symbol-vector-23880529.jpg'
  const humidity_url='https://www.shutterstock.com/image-vector/relative-humidity-symbol-260nw-1047543754.jpg'
  const wind_url='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAAC3t7fR0dGMjIzq6ury8vLExMR8fHz8/PycnJzKysqqqqrd3d2UlJTu7u6ioqJBQUHX19ewsLBgYGC+vr5XV1fj4+OEhIRycnIrKytsbGw2NjYNDQ1NTU0mJiYfHx8XFxc7OztEREQvTSNzAAAC00lEQVR4nO3aa0/qQBSFYcpNQQEVVOSiCP//PxqTM9POcTczUyqu6vt83Flp9gQzslJ6PQAAAAAAAAAAAAAAAAAAAAAAAAAAAADA9xuZ08k4I6xsMDwUky/T0XJVzI3w2goLG/dXxaercDyYbz6nu6SwtJfin+vq9NlNi0U8LO7WLb0Pxv6ESzNcXHTH84z80rPq2H9aq4SwuI1belqdPtqflh0WN3RLH6vTiT/hjRk+XXbJswz8WYL/fa9uuk4Ii/NL96vTOzc9JITFbd3S2+q0/H/xHA+L69uXyrub3iWEtY390oPqeO2mrwlhcfdu6WF1euPPEnwJPZlhcVO39Fsw9id8TAhrm/mzBK1o5aYvCWFxfunb6nRpXyp2WNy1W/qpOl34szzEw+Ku7Etl56bzhLC28kto0GznbrpLCIt7cksHzfbBn2URD4urabZ+Sg3ugKwa/GaGxflme1+dUoOpwVL+bA0+uCk1uAPsZltTg+3OLK5ZDd5cdMfzUIPDS2VvhsVRg6nBHUANtmtw+OpYW3s1eNFfad5A/kvoWTV4Nj9+CatoVoODcPmJB2EVbdTgkxmW4Ze2a/B7TljzBmqhBteEVbRRg/dmWEUbNdgOy8h6G3zMCauoabZ+6ZQabIdVtFGD7bAMu9lm1eCasIoWanBNWEXDGtyLh1Vk1eBeVlhFrAaPc8JBZ1bR7EfRKWEVbdRgOyzDbrZZP4quCauwm235JTShBtd0ZhVt1GA7LMMvndJsI+HDt2/bxJ+twXazzfoFtQpqcHipZIVVNKvBKa+OVVCDf20NLi+V31SDg3HW22DtGpzVbPM6s4oW3gZTg3/YH6jBvtl2TuoJh/FHiUo94SD+KFHJf6Y/vWhjySfcxp+lKfmE/fizNCWfcBx/lqbkE5bNtmPSTziNP0xS+gl7k27KOCEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7AJa3MsODGs4KAAAAAElFTkSuQmCC'
  const handleInputChange=(e) =>{
    setInputValue(e.target.value);
  }
  const getWeather=()=>{
    setIsLoading(true);
    setWeather(null);
    setHumidity(null);
    setWindspeed(null);
    setError(null);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=1f28ce2cbdbdae891dd49a4180c593cd&units=metric`)
    .then(res =>{
      console.log(res);
      setWeather(res.data.main.temp);
      setHumidity(res.data.main.humidity);
      setWindspeed(res.data.wind.speed);
      setIsLoading(false);
      setError(null);

    })
    .catch(err => {
      setError(err.message);
      setIsLoading(false);
      setWeather(null);
      setHumidity(null);
      setWindspeed(null);
    });
  };
  return (
    <div className="App">
      <input type='text' placeholder='Search city' onChange={handleInputChange} value={inputValue}></input>
      <button onClick={getWeather}>Search</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{`Error: ${error}`}</p>}
      {weather &&
      <div id="weather_detais" style={{display:'flex',alignItems:'center',justifyContent: 'space-evenly',marginTop:'50px',fontSize:'20px'}}> 
        <div> 
          <img src={img_url} style={{height:'100px',width:'100px',objectFit:'cover'}}></img>  
          <br></br>
          <span>Temperature: {weather}</span>
          <div style={{display:'inline-block',fontSize:'16px',height:'10px',position:'relative',bottom:'5px'}}>o</div>
          <p style={{display:'inline'}}>c</p> 
        </div>
        <div> 
          <img src={humidity_url} style={{height:'100px',width:'100px',objectFit:'cover'}}></img>  
          <p>Humidity: {Humidity}%</p>
        </div>
        <div> 
          <img src={wind_url} style={{height:'100px',width:'100px',objectFit:'cover'}}></img>  
          <p>Wind-Speed: {WindSpeed} Km/H</p>
        </div>
      </div>
        }

    </div>
  );
}

export default App;
