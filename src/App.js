import React,{useState, useEffect} from 'react'
import OrderInput from './components/OrderInput'
import axios from 'axios';
import DeliveriesTable from './components/DeliveriesTable';
import moment from 'moment';
import './components/Container.css'

const fabTime ={
    renault : 1,
    chevrolet:2,
    ford: 3,
    toyota:4,
}

function App() {
    

      
    const [dataDeliveries, setDataDeliveries] = useState([]);
    
    const fetchDeliveriesData =  async ()=>{
  
        try{
            const res = await axios.get('http://localhost:3000/api/deliveries');
            console.log(res.data);

            setDataDeliveries((res.data.body).sort((a,b)=>{
                if (moment(a.date) > moment(b.date)) {
                return 1;
              }
              if (moment(a.date) < moment(b.date)) {
                return -1;
              }
              
              return 0;}))
            console.log('datos dev:', ...dataDeliveries);
            
            
          }catch(error){
           console.log(error)
            
          }
          
      }
      
      useEffect(() => {
        fetchDeliveriesData();
      },[dataDeliveries.length])

       async function saveDelivery( brand, dateD, num){
        const svDelivery = {
            'brand' :brand,
            'date':dateD,
            'quantity':num,
          }
          
          try {
            const response= await axios({
                url:`http://localhost:3000/api/deliveries`,
               method:'POST',
               data:svDelivery,
            })
            .then(fetchDeliveriesData());
            return response
      //url:`http://localhost:4000/register/create`,  
    }catch(e){ 
        console.log(e)
    }
      }

      function totalTime(paramDate){
          let paramTime = 0;
        for (let delivery of dataDeliveries ){
            if(moment(delivery.date).format("YYYY-MM-DD") === paramDate ) {
             paramTime+= (delivery.quantity * fabTime[delivery.brand]) ;
            }
         }
         return paramTime;
      }
      function organizeDeliveries(order)
      {
         let  datesList = dataDeliveries.map((del)=> moment(del.date))
         let dayTime ;
         console.log("fechas",datesList)
         let hoursAva = {
            Monday : 16,
            Tuesday : 16,
            Wednesday:16,
            Thursday: 16,
            Friday:16,
            Saturday: 4,
            Sunday:0,
         }
         let leftQuantity = order.quantity
         let orderNum;
         let maxDate =moment().format("YYYY-MM-DD");
              if (datesList.length > 0){
               maxDate=  moment(Math.max(...datesList)).format("YYYY-MM-DD")
            }
                 
            let i = 0
            while(leftQuantity >0 ){
                   
                let deliveryDate =  moment(maxDate).add(i, "days").format("YYYY-MM-DD")
                dayTime = totalTime(deliveryDate);
                orderNum= Math.trunc((hoursAva[ moment(deliveryDate).format('dddd')] - dayTime)/fabTime[order.brand])
               // console.log("maxdate", maxDate,"dayTime:", dayTime, "horas aval:" ,hoursAva[ moment(deliveryDate).format('dddd')], "fabTime",fabTime[order.brand]);
                dayTime = 0;
                if (leftQuantity< orderNum){
                    orderNum = leftQuantity;
                }
                if (orderNum>0){
                    saveDelivery(order.brand, deliveryDate , orderNum  )
                }
               
                i++;
                leftQuantity -= orderNum;
                
            }
            

        

    }
    return (
        <div>
           <div className = "flex-container">
            <h1>XYZ Automobile</h1>
            </div>
            <div className = "flex-container">
          <OrderInput organize ={organizeDeliveries}></OrderInput>
            </div>
         <br />
         <br />
        
        <DeliveriesTable data={dataDeliveries} fetch={fetchDeliveriesData}/>
        </div>
    )
}

export default App
