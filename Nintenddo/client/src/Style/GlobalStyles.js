import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
.pdetailcnt{
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    max-height:680px;
}

.pdetailcloseBtn{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    width:100%;
    margin:0 0 30px 0;
}
.pdetailcloseBtn img{
    margin-right:20px;
}


.detailWrap{
    flex:9;
    display:flex;
    width:100%;
    height:100%;
    padding:0 20px;
}

.detailimg{
    flex:1;
    max-height:400px;
    margin:20px 20px 0 20px;

}
.detailimg img{ width:100%; height:100%; }

.detailtext{
    flex:1;
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    max-height:400px;
    margin-right:40px;
}

.detailtext .name{flex:1;}
.detailtext .subandinfo{
    flex:2;
    display:flex;
}
.detailtext .subandinfo .onetextsub{
    flex:1;
    margin-top:10px;
}
.detailtext .subandinfo .onetextinfo{
    flex:1;
    margin-top:10px;
}


.detailtext .content{
    flex:1;
    margin:10px 5px;
}

.detailtext .goOrderBtn, .detailtext .goCartBtn{
    width:100%;
    min-height:40px;
    height:40px;
    margin-right:30px;
    cursor:pointer;
}


`


export default GlobalStyles;