import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Style/Product/mainsoftware.css'

function Mainsoftware() {

    const [softList, setSoftList] = useState([]);
    // ㄴ displayNum을 쓰기 위해서 초기값을 반드시 빈 배열로 줄 것
    // ㄴ state가 변경되면 해당 컴포넌트가 다시 랜더링이 되는데 이때 useState 훅을 사용하여 상태를 초기화할 때 초기값을 제공
    // ㄴ 초기 렌더링 시에는 softList가 비어있기 때문에 softList.length가 undefined가 된다
    //      ㄴ 즉, 초기 렌더링 시에는 softList가 비어있는 배열로 초기화 후 undefined가 아니라 0으로 평가되도록 함
    const [displayNum, setDisplayNum] = useState(8);

    useEffect(()=>{
        axios.post('/api/products/getsoftlist', null, {params:{pcseq:2}})
        .then((result)=>{
            setSoftList(result.data)
        })
        .catch((err)=>{console.error(err)})
    },[])

    const handleShowMore = () => {
        setDisplayNum(displayNum + 4);
        // 더보기 버튼 클릭시 4개씩 추가로 show
    }

    return (
        <div className='mainsoftCnt'>
           <div className='mainsoftTitle'>
                <div className='titleKr'>주요 소프트웨어</div>
                <div className='titleEn'>PickUp</div>
            </div>

            <div className='mainsoftContent'>
                {
                    (softList)?(
                        softList
                        .slice(0, displayNum)
                        .map((soft, idx)=>{
                            return(
                                <div className='softList'>
                                    <div className='slistImage'>
                                        <img src= {process.env.REACT_APP_IMG_SRC +'product/productdetail/'+soft.image} />
                                    </div>
                                    
                                    <div className='slisthardware'>
                                        Nintendo Switch
                                    </div>
                                    <div className='slisttitle'>{soft.pname}</div>

                                    <div className='sindate'>
                                        소프트웨어<br />
                                        발매일 : {soft.indate.substring(0,10)}
                                    </div>
                                </div>
                            )
                        })
                    ):(null)
                }
            </div>

            {softList.length > displayNum && (
            // softList 수가 표시할 수보다 많을 때만(= 더 보여줄 뉴스가 남아있다면) 더보기 버튼 생성
                <div className='showmoreBtn'>
                    <button onClick={handleShowMore}>
                    {/* handleShowMore() (함수)로 호출시 랜더링되면 바로 실행되기 때문에 변수로 만든다 */}
                        <img src= {process.env.REACT_APP_IMG_SRC +'news/'+'showmorebtn.png'} alt='' />
                        더보기
                    </button>
                </div>
            )}
            
           
        </div>
    )
}

export default Mainsoftware
