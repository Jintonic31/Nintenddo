import React from 'react'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/hardware.css'
import '../../Style/includes/heading.css'

function Hardware() {
    return (

        <div className='Cnt'>

            <Heading />

            <div className='hardwareWrap'>
                <div className='hardwareHeader'>
                    <div>Nintendo Switch 패밀리</div>
                    <div>기능 · 특징을 비교</div>
                </div>
            </div>

            <Footing />
            
        </div>
    )
}

export default Hardware
