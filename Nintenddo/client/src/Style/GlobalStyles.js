import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
.Cnt{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
}


.wirtedeliveryWrap{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:70%;
    height:100%;
}


.buyProcess2{
    width:70%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:50px 0;
}

.process2{
    display:flex;
    justify-content:center;
    align-items:center;
    width:176px;
    height:176px;
    border:2px solid lightgray;
    margin:30px;
    border-radius:50%;
    font-weight:bold;
    font-size:1.3rem;
    color:rgb(53, 52, 52);
    letter-spacing:2px;
}
.process2:nth-child(1){
    background-color:white;
    border:2px solid lightgray;
    color:rgb(53, 52, 52);
}
.process2:nth-child(2){
    background-color:rgb(230, 0, 18);
    border:none;
    color:white;
}


.deliveryinfoWrap{
    background-color:white;
    width:80%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:column;
    margin:30px;
}

.dtitle{
    flex:1;
    display:flex;
    align-items:center;
    width:100%;
    font-size:1.5rem;
    font-weight:bold;
    color:rgb(53, 52, 52);
    padding-bottom:20px;
    border-bottom:1px solid lightgray;
}
.dcontent{
    flex:9;
    width:60%;
    height:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    text-align:left;
}
.dcontentsub{
    flex:1;
    display:flex;
    flex-direction:column;
    height:100%;
}
.dcontentsub div{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:1px;
    height:50px;
    font-size:110%;
    font-weight:bold;
    color:rgb(53, 52, 52);
}
.dcontentsub div div{
    width:5px;
    height:20px;
    margin-right:20px;
    background-color:rgb(230, 0, 18);
}
.dinfo{
    flex:2;
    max-width:250px;
    display:flex;
    flex-direction:column;
    height:100%;
}

.dinfo input, .dinfoznum input{
    border:none;
    margin:0;
    padding:0;
    height:45px;
    border-bottom:2px solid lightgray;
}
.dinfoznum{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.dinfoznum button{
    border:1px solid lightgray;
    font-weight:bold;
    height:25px;
}



.noworderlist{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:80%;
    height:100%;
}


.onenolistsub{
    display:flex;
    text-align:center;
    align-items:center;
    width:100%;
    height:50px;
    font-weight:bold;
    color:rgb(53, 52, 52);
    border-bottom:1px solid lightgrey;
}
.onenolistsub .subchk{
    flex:1;
}
.onenolistsub .subimg{
    flex:4;
}
.onenolistsub .subpname{
    flex:5;
}
.onenolistsub .subquantity{
    flex:2;
}
.onenolistsub .subprice{
    flex:2;
    font-weight:bold;
    color:rgb(53, 52, 52);
}


.onenolist{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    max-height:150px;
    flex:1;
    border-bottom:1px solid lightgray;
}

.onechk{
    flex:1;
    display:flex;
    justify-content:center;
}

.onenolist .oneimg{
    flex:4;
    width:100%;
    height:150px;
    margin-right:20px;
}
.onenolist .oneimg img{
    width:100%; height:100%;
}

.onepname{
    flex:5;
    font-size:120%;
    font-weight:bold;
    color:rgb(53, 52, 52);
}

.onequantity{
    flex:2;
    display:flex;
    justify-content:center;
}
.onequantity button{
    border:none;
    background-color:white;
}

.oneprice{
    flex:2;
    text-align:center;
}


.cdlistEndrow{
    display:flex;
    justify-content:right;
    align-items:center;
    width:100%;
    height:70px;
    margin-top:30px;
    padding-right:50px;
    font-size:120%;
    font-weight:bold;
    color:rgb(53, 52, 52);
}

.clistEndrow div:last-child img{
    width:20px;
    height:20px;
    margin-right:5px;
}


.downlonotion{
    width:100%;
    height:100%;
    margin:50px 0;
    font-weight:bold;
    display:flex;
    flex-direction:column;
    align-items:left;
}
.downlonotion span:nth-child(2){
    margin-top:20px;
}

.moveonBtn{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:50px 0;
}

.moveonBtn button{
    width:150px;
    height:30px;
    color:white;
    font-weight:bold;
    border:none;
    background-color:rgb(230, 0, 18);
    margin-right:30px;
    cursor:pointer;
}


`


export default GlobalStyles;