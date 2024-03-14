import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footing from '../Footing'
import Heading from '../Heading'
import '../../Style/Product/controller.css'
import { Link } from 'react-router-dom'

function Controller() {


    return (
        <div className='cnt'>

            <Heading />

            <div className='controllerWrap'>
                &nbsp;
            </div>
        
            <Footing />

        </div>
    )
}

export default Controller
