import logo from './logo.svg';
import back from './back.png';
import './App.css';
import { Modal, Button,InputGroup,FormControl } from "react-bootstrap";
import l from "./suc.png"
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Web3 from 'web3';

import vabi from "./vault.js";
import React, { useState,useEffect } from "react";
import web3 from './web3';
import token from './token.js';
//import vault from './vault.js';








function MyVerticallyCenteredModal1(props) {
 
  var [tid4,setId4] = useState();
  const [tid2,setId2] = useState([]);

  
 
 var myfunct=async()=>{
    var circulate = await vabi.methods.getCirculatingSupply().call();
  var balance = await vabi.methods.getBurnVaultBNBBalance().call();
 
  setId4(circulate/(balance/1000000000000000000));
 
    var a = document.getElementById("tid").value;
    // setId(a);
    
    var b =   (a * 1000000000) / tid4;
  document.getElementById("tid11").innerHTML = b.toFixed(15) ;
    
 }
 
 
 const swap = async() => {
   
    document.getElementById("mymodal").style.visibility="hidden";
 
    let account = await web3.eth.getAccounts();
 
    var maxtx  = await vabi.methods.maxTxAmount().call();
    
 var burnbalan  = await vabi.methods.senderBurnBalance(account[0]).call();
      var bb = maxtx - burnbalan;
 //console.log(bb);
     var burnab1=(bb/1000000000);
 
 
     
       var a = document.getElementById("tid").value;
 
 //alert(maxtx);
  if(a<=  100000){
  if( a <= burnab1){
         let amount = a * 1000000000;
      
      await vabi.methods.swap(amount).send({from:account[0]});
      setId2(await token.methods.balanceOf(account[0]).call());

  //document.getElementById("nm").reload();
 }
  else{
  alert("The amount you entered must be less than the Availabe limit ");
  }}
  else{
  alert("The amount you entered must be less than the Maximum Transcation amount");
  }
 
    }
  
  
    return (
  
  
      
      <Modal
        {...props}
        style={{width:"500px" , marginLeft:"400px",}}
  
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        id="mymodal"
        centered
      >
        <Modal.Header className="myModal" style={{backgroundColor:"#191919",color:"white"}}>
           
          <Modal.Title id="contained-modal-title-vcenter" >
            Amount to Swap
          </Modal.Title><br/><br/>
         
        </Modal.Header>
        
        <Modal.Body style={{backgroundColor:"#191919", color:"white"}}  className="myModal">
          <InputGroup>
    <InputGroup.Prepend>
     <h5>Black : &nbsp;&nbsp;&nbsp;</h5>
    </InputGroup.Prepend>
    <FormControl className="myInput" onChange={myfunct} id="tid" aria-label="Amount (to the nearest dollar)" /><br/>
    <InputGroup.Append>
    
 
    </InputGroup.Append>
  </InputGroup><br/>
  <InputGroup>
  <InputGroup.Prepend>
     <h5 >BNB : </h5>
    </InputGroup.Prepend>
    &nbsp; &nbsp;<h4 id="tid11"></h4>
  </InputGroup>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#191919"}}  className="myModal">
          <button class="btn-flat" onClick={swap}>Swap</button>

        </Modal.Footer>
      </Modal>
    );
  }

function App() {

  const [modalShow1, setModalShow1] = useState(false);


  const [tid,setId] = useState([]);
  const [tid1,setId1] = useState([]);
  const [tid2,setId2] = useState([]);
var [tid3,setId3] = useState([]);
var [tid4,setId4] = useState([]);
  var [tid5,setId5] = useState([]);
 var [tid6,setId6] = useState([]);
var [burnba,setburn] = useState([]);
var [maxta,setmaxt] = useState([]);
var [lct,setlct] = useState([]);
var [count,setcount]=useState("");
const[t1,setTim1 ] = useState("");
 const[t2,setTim2] = useState("");
 const[t3,setTim3 ] = useState("");
var[ltime,setltime] = useState("");
const[t4,setTime4] = useState("");
  var[t5,settime5]=useState("");
  var[acc,setacc]=useState("");

  const connect = async() => {
   
      await window.ethereum.enable();
      let account = await web3.eth.getAccounts();

    
      setacc(account);

  }

 function backk(){
  window.location.href="https://blackdashboard-rho.vercel.app/black";
} 


  useEffect(async()=>{
    document.body.style.backgroundColor="black";
   
   
    
   
    if(acc!=0){

     setId2(await token.methods.balanceOf(acc[0]).call());
     var circulate = await vabi.methods.getCirculatingSupply().call();
     var balance = await vabi.methods.getBurnVaultBNBBalance().call();
     setId4(circulate/(balance/1000000000000000000));
     setId5(1000000000 / (tid4));

    var maxtx  = await vabi.methods.maxTxAmount().call();
   setmaxt(maxtx);
var burnbalan  = await vabi.methods.senderBurnBalance(acc[0]).call();
   
var bb = maxta - burnbalan;
//console.log(bb);
    setburn(bb/1000000000);

const loc = await vabi.methods.lock(acc[0]).call();

setlct(loc);


const b = await vabi.methods.secondsLeft(acc[0]).call();


var countDownDate = new Date().getTime() + b * 1000; ;

var x = setInterval(function() {
   var now = new Date().getTime();
  var distance = countDownDate - now ;
    
  // Time calculations for days, hours, minutes and seconds
 var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
 // document.getElementById("demo").innerHTML = hours + "h "
 // + minutes + "m " + seconds + "s ";
setTime4(days);
setTim1(hours);
setTim2(minutes);
setTim3(seconds);



setcount(count);

  // If the count down is over, write some text 
  if (distance < 0) {
        clearInterval(x);
       // console.log('CountDown Finished');
    }

  
}, 1000);





     var allowan = await token.methods.allowance(acc[0],"0x2cFCC708e5398311c14A34Ea0A8d5871A0f33eB1").call();
     if(allowan == 0){
      setId3(true);
      //document.getElementById("swap").disabled=false;
      }
      else{
   setId3(false);

      }
    //  console.log(tid3);
      setId6(await vabi.methods.getBurnVaultBLACKBalance().call());
      }
   else{
     // document.getElementById("cc").style.visibility="true";

   }
if(acc!=0){
  

if(tid3==true){
  window.cardv=2;
  
}
else{
  window.cardv=3;

  
}
}


  })

   
    //timer
    
       
      
    const approve = async() => {
      let account = await web3.eth.getAccounts();
      await token.methods.approve("0x2cFCC708e5398311c14A34Ea0A8d5871A0f33eB1",1000000000000000).send({from:account[0]});
      window.location.reload();
    
    }
   t5=((t4*1440)+(t1*60)+(t2)+(t3/60));
   var ti=(t4+1)*1440;
  //settime5(t5);
   if(t5>0){
  count=`Starts in : ${t4}:${t1}:${t2}:${t3}`;
   }
   else{
      count="Unlock";
   }

  return (
   
    <body class="App container-fluid pl-5">
    <link href="css-circular-prog-bar.css" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
<br/>
<div class="row justify-content-between">
<div class="col-2">
 <img src ={back} alt="" height={40} onClick={backk} width={40}/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src={logo} alt="" height={80} width={80}/>

</div>
<div class="col-4">
{acc!=0 ?((
  <button id="cc" class="btn-flat  btn-bloc cc">{acc}</button>

)):
((
  <button id="cc" class="btn-flat  btn-bloc cc"  onClick={connect}>connect wallet</button>

))

}
</div>
</div>

<br/>
    <center>
   {
       acc!=0?((
<div>
<div id="nm" class="container pl-5 pr-5 ml-2 mr-2">
<div class="row justify-content-end ">
  <div class="col-sm tiny ">
  <h1 class="head" style={{color:"#ffff",textTransform:"uppercase"}}>BURN VAULT</h1>
  </div>
  <div class="col-sm">
 
  <div style={{ width: 150, height: 150 }}>
 <CircularProgressbar value={t5} text={count} maxValue={ti}  styles={buildStyles({
     textSize: '8px',textColor:'white',pathColor:'#17a2b8',
 })}/>
</div>
  </div>
</div>
<br /><br/>
<div class="row justify-content-around">
  <div class="col-sm col-ele2" >
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b> Black Token Balance</b><br/> </h5><hr class="hr"/>
<h2>{tid2/1000000000}</h2>
  </div>&nbsp;&nbsp;
  <div class="col-sm col-ele2">
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b>1 Black</b> <br/></h5> <hr class="hr"/><h2> { parseFloat(1000000000/tid4).toFixed(15)} BNB</h2>

  </div>&nbsp;&nbsp;
  <div class="col-sm col-ele2" >
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}> <b>Black Token in BurnVault </b> <br/></h5> <hr class="hr"/><h2 style={{fontFamily:"Dosis,sans-serif"}}>  {tid6/1000000000}</h2><br />


  </div>
</div><br/>
<hr class="hr2"/>  
<br/><br/>
<div class="row justify-content-around">
 
  <div class="col-sm-4 cll" ><br/>
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b>Maximum transaction limit</b></h5>  <hr class="hr"/><h4>{maxta/1000000000}</h4><br />

  </div>&nbsp;&nbsp;&nbsp;&nbsp;

  <div class="col-sm cll1" >
  {acc!=0 ? 
(
(
<div>
{ tid3 === true ? 
(
(
<div>
<h5>Before Swap we want to Approve first</h5>
<br />
<button class="btn btn-dark" onClick={approve}>Approve</button>
</div>
)
):
(
(
<div>
<img src={l} height={90} width={100}/><br/>
<h4>Approved</h4>
</div>
)
)}
</div>
)
):
((
 <div><h5>Please Check whether metamask is connected?</h5>
 <br />
 <button class="btn btn-dark" >Connect wallet</button></div>
))
} 
  </div>&nbsp;&nbsp;&nbsp;&nbsp;

  <div class="col-sm " >
    <div class="row">
      <div class="col-sm cll">
      <h5>Available limit for User to Swap<b><span style={{color:"#5bc0de",textTransform:"uppercase"}}> {burnba}</span> </b></h5>

      </div>
      
    </div><br/>
 <div class="row">
   {
     (tid3!=true&&acc!=0) ?((
       <button class="btn-flat col-sm  btn-lg p-4" id="swap" onClick={() => setModalShow1(true)}  >
   
      Swap
   

   
   </button>
     )):
     ((

       <button class="btn-flat col-sm  btn-lg p-4" id="swap" onClick={() => setModalShow1(true)} disabled >
   
       Swap
    

    
    </button>
     ))
   }
  
   <MyVerticallyCenteredModal1
      show={modalShow1}
      onHide={() => setModalShow1(false)}
    />
 </div>

  </div>
  
</div>
</div>
    
</div>
       )):
       ((
<div>
<div id="nm" class="container pl-5 pr-5 ml-2 mr-2">
<div class="row justify-content-end ">
  <div class="col-sm tiny ">
  <h1 class="head" style={{color:"#ffff",textTransform:"uppercase"}}>BURN VAULT</h1>
  </div>
  <div class="col-sm">
 
  <div style={{ width: 150, height: 150 }}>
 <CircularProgressbar value={t5} text={count} maxValue={ti}  styles={buildStyles({
     textSize: '8px',textColor:'white',pathColor:'#17a2b8',
 })}/>
</div>
  </div>
</div>
<br /><br/><br/>
<div class="row justify-content-around">
  <div class="col-sm col-ele2" >
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b> Black Token Balance</b><br/> </h5><hr class="hr"/>
<h2>{0/1000000000}</h2>
  </div>&nbsp;&nbsp;
  <div class="col-sm col-ele2">
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b>1 Black</b> <br/></h5> <hr class="hr"/><h2> { parseFloat(1000000000/0).toFixed(15)} BNB</h2>

  </div>&nbsp;&nbsp;
  <div class="col-sm col-ele2" >
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}> <b>Black Token in BurnVault </b> <br/></h5> <hr class="hr"/><h2 style={{fontFamily:"Dosis,sans-serif"}}>  {0/1000000000}</h2><br />


  </div>
</div><br/>
<hr class="hr2"/>  
<br/><br/>
<div class="row justify-content-around">
 
  <div class="col-sm-4 cll" ><br/>
  <h5 style={{color:"#5bc0de",textTransform:"uppercase"}}><b>Maximum transaction limit</b></h5>  <hr class="hr"/><h4>{0/1000000000}</h4><br />

  </div>&nbsp;&nbsp;&nbsp;&nbsp;

  <div class="col-sm cll1" >
  {acc!=0 ? 
(
(
<div>
{ tid3 === true ? 
(
(
<div>
<h5>Before Swap we want to Approve first</h5>
<br />
<button class="btn btn-dark" onClick={approve}>Approve</button>
</div>
)
):
(
(
<div>
<img src={l} height={90} width={100}/><br/>
<h4>Approved</h4>
</div>
)
)}
</div>
)
):
((
 <div><h5>Please Check whether metamask is connected?</h5>
 <br />
 <button class="btn btn-dark" onClick={connect}>Connect wallet</button></div>
))
} 
  </div>&nbsp;&nbsp;&nbsp;&nbsp;

  <div class="col-sm " >
    <div class="row">
      <div class="col-sm cll">
      <h5>Available limit for User to Swap<b><span style={{color:"#5bc0de",textTransform:"uppercase"}}> {0}</span> </b></h5>

      </div>
      
    </div><br/>
 <div class="row">
   {
     (tid3!=true&&acc!=0) ?((
       <button class="btn-flat col-sm  btn-lg p-4" id="swap" onClick={() => setModalShow1(true)}  >
   
      Swap
   

   
   </button>
     )):
     ((

       <button class="btn-flat col-sm  btn-lg p-4" id="swap" onClick={() => setModalShow1(true)} disabled >
   
       Swap
    

    
    </button>
     ))
   }
  
   <MyVerticallyCenteredModal1
      show={modalShow1}
      onHide={() => setModalShow1(false)}
    />
 </div>

  </div>
  
</div>
</div>
    
</div>
       ))
      }
      
      
    <br/>
    
     </center>



                   
                   

           
     </body>
  );
}

export default App;
