import React, { useState, useEffect, useRef } from 'react'
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnUp } from '@fortawesome/free-solid-svg-icons'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'
import { faWind} from '@fortawesome/free-solid-svg-icons'
import { faWater} from '@fortawesome/free-solid-svg-icons'


const Home = () => {

  const [data, setData] = useState([]);
  const [location, setLocation] = useState('Athens');
  const [error, setError] = useState(false);

  const key = 'db59326b56a25d1e5b0245f10eee3a15';
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(location === '') {
      setError(true);
    } else {
      setError(false)
    }
    setLocation('');
  }

  const handleUserInput = (e) => {
    setLocation(e.target.value);
  }


  const testApi = async () => {

    if(location === '') {
      return
    }

    try {
      let result = await fetch(urlWeather);
      result = await result.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }

  const iconColors = {
    orangeColor: "#fb923c",
    blueColor: "#38bdf8",
    lightBlueColor: "#bae6fd"
  }

  // console.log(data);
 

  useEffect(() => {
    testApi(urlWeather);
  }, [])

  const convertTime = (dt, timezone) => {
    const unixTime = dt ; // + timezone;
    const date = new Date(unixTime * 1000);
    // const utcStringTime = date.toUTCString();
    const utcStringTime = date.toLocaleTimeString();
    return utcStringTime;
  }

  const firstletterCapital = (string) => {
    let word = string;
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <>
    <section className='w-full py-20'>
      <div className='container mx-auto flex flex-col justify-center items-center gap-32'>

        {/* search wrapper */}
        <div className='px-2 md:px-0'>
          <form onSubmit={handleSubmit} action="/" method="POST">
            <input value={location} onChange={handleUserInput} className='px-8 py-4 outline-none w-full md:w-auto rounded-r-xl md:rounded-r-none rounded-l-xl mb-2 md:mb-0' type="seacth" placeholder = "Enter city name"/>
            <Button testApi={testApi} name="Search"/>
          </form>
          {
          error ? 
          <div className='px-8 py-2 w-full bg-red-400 text-slate-100 rounded-xl mt-2'>
            <p>Please enter a city name</p>
          </div> : ''
          }
        </div>

        {/* display weather wrapper */}
        {
            data ? 
              <div className='backdrop-blur-md p-14 md:p-20 rounded-xl shadow-md flex flex-row justify-between items-center gap-8 text-slate-50 w-[95%] md:w-[80%] lg:w-[650px]'>


                <div className='flex flex-col gap-6 w-full'>
                  {/* row-1 */}
                  <div>
                    <div>
                      <h3 className='font-bold text-2xl lg:text-3xl text-amber-200'>{data.name ? data.name : "N/A"}</h3>
                    </div>
                    <div>
                      <h3 className='font-semibold text-md lg:text-lg'>{convertTime(data.dt, data.timezone)}</h3>
                    </div>
                  </div>

                  <div className='flex flex-row items-center gap-8'>
                    <div className='flex flex-row gap-2 items-center'>
                      <h3 className='font-semibold text-2xl lg:text-3xl'>{data.main ? Math.floor(data.main.temp) : 'N/A'}<span className='text-md'>&deg;C</span></h3>
                      <img src={`http://openweathermap.org/img/w/${data.weather ? data.weather[0].icon : "No image available"}.png `} alt="Weather icon" />
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg lg:text-xl'>{data.weather ? firstletterCapital(data.weather[0].description) : 'N/A'}</h3>
                    </div>
                  </div>

                  {/* row-2 */}
                  <div className='flex flex-row justify-between items-center gap-6'>
                    <div>
                      <div className='flex flex-row items-center gap-4'>
                        <div className='flex flex-row items-center gap-2'>
                          <FontAwesomeIcon color={iconColors.orangeColor} icon={faTurnUp} />
                          <h3 className='font-semibold text-lg lg:text-xl'>{data.main ?Math.floor(data.main.temp_max) : 'N/A'}<span className='text-sm'>&deg;C</span></h3>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                          <FontAwesomeIcon color={iconColors.blueColor} icon={faTurnDown} />
                          <h3 className='font-semibold text-lg lg:text-xl'>{data.main ? Math.floor(data.main.temp_min) : 'N/A'}<span className='text-sm'>&deg;C</span></h3>
                        </div>   
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
                      <div className='flex flex-row items-center gap-2'>
                        <FontAwesomeIcon color={iconColors.lightBlueColor} icon={faWind} />
                        <h3 className='font-semibold text-lg lg:text-xl'>{data.wind ? Math.floor(data.wind.speed) : 'N/A'} km/h</h3>
                      </div>
                      <div className='flex flex-row items-center gap-2'>
                        <FontAwesomeIcon color={iconColors.lightBlueColor} icon={faWater} />
                        <h3 className='font-semibold text-lg lg:text-xl'>{data.main ? Math.floor(data.main.humidity) : 'N/A'} %</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            : 'Data not available'  
        }
       

      </div>
    </section>
    </>
  )
}

export default Home