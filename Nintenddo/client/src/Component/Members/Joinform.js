import React, { useState, useEffect } from 'react';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/Joinform.css'

function Joinform() {
    /*생년월일*/
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
 
    const years = Array.from(new Array(new Date().getFullYear() - 1899), (val, index) => 1900 + index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
      };
      
      const days = Array.from(new Array(getDaysInMonth(year, month)), (val, index) => 1 + index);
  
      useEffect(() => {
        setDay('');
      }, [year, month]);
      /*생년월일*/
    //성별   
        const [selectedGender, setSelectedGender] = useState('');
      const handleGenderChange  = (event) => {
        setSelectedGender(event.target.value);
      }
    //성별

    //국가
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
          .then(response => response.json())
          .then(data => {
            setCountries(data);
          })
          .catch(error => console.error('Error fetching countries:', error));
      }, []);
    
      const handleCountryChange  = (event) => {
        setSelectedCountry(event.target.value);
      }

    //국가
  return (
    <div className="joinbody">
    <Heading/>
    <h2 className="centerText">닌텐도 어카운트 작성</h2>    
    <div className="account">다음 어카운트를 가지고 있는 경우, 간단하게 닌텐도 어카운트를 작성할 수 있습니다.</div>
    <div className='subPage'>
        <article>
            <div className="sns-btns">
            <button className="ovalButton googleButton"><img src={`http://localhost:8070/images/members/google.png`} />Google</button>
                <button className="ovalButton kakaoButton" onClick={
                    ()=>{
                     window.location.href='http://localhost:8070/api/members/kakaostart';
                        }
                }><img src={`http://localhost:8070/images/members/kakao.png`} />Kakao</button>
            </div>
            

            <div className="account"><h2>위의 어카운트를 가지고 있지 않은 경우에는 아래 정보를 입력해 주십시오.</h2></div><br/>
            
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className='infotitle'>닉네임</div>
            <div className="info"><input type="text" placeholder ="10자 이내" /></div>
            </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className='infotitle'>메일 주소</div>
            <div className="info"><input type="text" placeholder ="메일 주소" /></div>
            </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className='infotitle'>암호</div>
            <div className="info"><input type="text" placeholder ="영문과 숫자를 혼합한 8자 이상" /></div>
            </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className='infotitle'>암호 재입력</div>
            <div className="info"> <input type="text" placeholder ="영문과 숫자를 혼합한 8자 이상" /></div>
            </div><br/><br/>

            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className="select-box">생년월일
            </div>
            <select className="select-year" value={year} style={{marginLeft:"380px", width:"150px", height:"60px"}} onChange={(e) => setYear(e.target.value)}>
          <option>년</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        <select value={month} style={{marginLeft:"25px", width:"150px", height:"60px"}} onChange={(e) => setMonth(e.target.value)}>
          <option>월</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </select>
        <select value={day} style={{marginLeft:"25px", width:"150px", height:"60px"}} onChange={(e) => setDay(e.target.value)}>
          <option>일</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}일
            </option>
          ))}
        </select>
        </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className="select-box">성별
            </div>
            <select style={{marginLeft:"415px", width:"500px", height:"60px"}} value={selectedGender} onChange={handleGenderChange}>
                <option value="">(미선택)</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="none">선택하지 않음</option>
            </select>
            </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className="Title">국가/지역
            <select style={{marginLeft:"375px", width:"500px", height:"60px"}} value={selectedCountry} onChange={handleCountryChange }>
        <option value="">국가/지역 선택</option>
        {countries.map((country) => (
          <option key={country.alpha3Code} value={country.alpha3Code}>
            {country.name}
          </option>
        ))}
      </select>
            </div>
            
    </div><br/><br/>
            <div className='Title'>
            <div>&nbsp;&nbsp;</div>
            <div className="select-box">시간대</div>
            <select  style={{marginLeft:"400px", width:"500px", height:"60px"}} id="timezoneSelect">
            <option value="UTC+9" selected>대한민국 (UTC+9:00)</option>
            </select>
            </div>
        </article>
    </div>
    <Footing/>
    </div>
  )
}

export default Joinform
