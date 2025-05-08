import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading'
import Footing from '../../Component/Footing'
import '../../Style/Member/Joinform.css'
import axios from 'axios'

function Joinform() {
  const navigate = useNavigate();

  const [userid, setUserid] = useState();
  const [pwd, setPwd] = useState();
  const [repwd, setRepwd] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [znum, setZnum] = useState();
  const [add1, setAdd1] = useState();
  const [add2, setAdd2] = useState();
  const [add3, setAdd3] = useState();
  const [gender, setGender] = useState();
  const [country, setCountry] = useState();
  const [provider, setProvider] = useState();
  const [useyn, setUseyn] = useState();
  const [message, setMessage] = useState('');
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
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  }
  //성별

  //국가nthd
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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  }

  function onJoin() {
    if (!userid) { return alert("아이디를 입력하세요") }
    if (!pwd) { return alert("비밀번호를 입력하세요") }
    if (pwd != repwd) { return alert("비밀번호가 일치하지 않습니다") }
    if (!phone) { return alert("전화번호를 입력하세요") }
    if (!email) { return alert("이메일을 입력하세요") }
    if (!userid) { return alert("아이디를 입력하세요") }

    axios.post("/api/members/join", { userid, pwd, phone, email, znum, add1, add2, add3, gender, country, byear: year, bmonth: month, bday: day, provider: 'local', useyn: 'Y' })
      .then((result) => {
        alert("환영합니다!")
        console.log(gender);
        navigate("/login")
      })
      .catch((err) => {
        alert("에러. 잠시 후 다시 시도하세요.")
        console.log(gender);
      })
  }

  function idcheck() {
    axios.post('/api/members/idcheck', null, { params: { email } })
      .then((result) => {
        if (result.data.res == '1') {
          setMessage('사용가능합니다');
        } else {
          setMessage('아이디가 중복됩니다.');
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  //국가
  return (

    <div className='Cnt'>



      <Heading />

      <div className="joinbody">

        <h2 className="centerText">닌텐도 어카운트 작성</h2>
        <div className="account">다음 어카운트를 가지고 있는 경우, 간단하게 닌텐도 어카운트를 작성할 수 있습니다.</div>
        <div className='jsubPage'>
          <article>
            <div className="sns-btns">
              <button className="ovalButton googleButton"><img src={process.env.REACT_APP_IMG_SRC + 'members/' + 'google.png'} />Google</button>
              <button className="ovalButton kakaoButton" onClick={
                () => {
                  window.location.href = `${process.env.REACT_APP_KAKAO_REDIRECT}api/members/kakaostart`
                }
              }><img src={process.env.REACT_APP_IMG_SRC + 'members/' + 'kakao.png'} />Kakao</button>
            </div>


            <div className="account"><h2>위의 어카운트를 가지고 있지 않은 경우에는 아래 정보를 입력해 주십시오.</h2></div><br />

            <div className='jinsertinfoWrap'>
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infotitle'>아이디</div>
                <div className="info"><input type="text" placeholder="10자 이내" value={userid} onChange={(e) => {
                  setUserid(e.currentTarget.value);
                }} /></div>
              </div><br /><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infotitle'>메일 주소</div>
                <div className="info"><input type="text" placeholder="메일 주소" value={email} onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setMessage('')
                }} /></div>
                <button onClick={
                  () => {
                    idcheck()
                  }
                }>중복확인</button>
                <div style={{ flex: "2", color: "blue" }}>&nbsp;&nbsp;{message}</div>
              </div><br /><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infotitle'>암호</div>
                <div className="info"><input type="text" placeholder="영문과 숫자를 혼합한 8자 이상" value={pwd} onChange={(e) => {
                  setPwd(e.currentTarget.value);
                }} /></div>
              </div><br /><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infotitle'>암호 재입력</div>
                <div className="info"> <input type="text" placeholder="영문과 숫자를 혼합한 8자 이상" value={repwd} onChange={(e) => {
                  setRepwd(e.currentTarget.value);
                }} /></div>
              </div><br /><br />

              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className='infotitle'>전화 번호</div>
                <div className="info"> <input type="text" placeholder="전화번호입력" value={phone} onChange={(e) => {
                  setPhone(e.currentTarget.value);
                }} /></div>
              </div><br /><br />

              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className="select-box">생년월일
                </div>
                <select className="select-year" value={year} style={{ width: "150px", height: "60px", border: "1px solid #ccc" }}
                  onChange={(e) => setYear(e.target.value)}>
                  <option>년</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
                <select value={month} style={{ marginLeft: "25px", width: "150px", height: "60px", border: "1px solid #ccc" }} onChange={(e) => setMonth(e.target.value)}>
                  <option>월</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </select>
                <select value={day} style={{ marginLeft: "25px", width: "150px", height: "60px", border: "1px solid #ccc" }} onChange={(e) => setDay(e.target.value)}>
                  <option>일</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}일
                    </option>
                  ))}
                </select>
              </div><br /><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className="select-box">성별
                </div>
                <select style={{ width: "500px", height: "60px", border: "1px solid #ccc" }} onChange={(e) => setGender(e.target.value)} value={gender}>
                  <option value="">(미선택)</option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                  <option value="N">선택하지 않음</option>
                </select>
              </div><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className="select-box">국가/지역</div>
                <select style={{ width: "500px", height: "60px", border: "1px solid #ccc" }} onChange={(e) => setCountry(e.target.value)} value={country}>
                  <option value="">국가/지역 선택</option>
                  {countries.map((country) => (
                    <option key={country.alpha3Code} value={country.alpha3Code}>
                      {country.name}
                    </option>
                  ))}
                </select>


              </div><br /><br />
              <div className='jTitle'>
                <div>&nbsp;&nbsp;</div>
                <div className="select-box">시간대</div>
                <select style={{ width: "500px", height: "60px", border: "1px solid #ccc" }} id="timezoneSelect">
                  <option value="UTC+9" selected>대한민국 (UTC+9:00)</option>
                </select>
              </div>
              <button className="jcontinue" onClick={() => {
                onJoin()
              }}>계속</button>
            </div>
          </article>
        </div>

      </div>

      <Footing />

    </div>
  )
}

export default Joinform
