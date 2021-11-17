import React,{useRef} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/css/bootstrap.css';
const OrderInput = ({ organize}) => {
    
    const form = useRef(null);
    const handleSubmit = ()=>{
        const formData = new FormData(form.current);
        const order = {
          'brand' :formData.get('brand'),
          'quantity':parseInt(formData.get('quantity')),
          'date':moment().format('YYYY-MM-DD hh:mm:ss'),
    
        }
        
        organize(order);
       
        
      }
    return (
        <div>
            <form  ref ={form}>
                <div  className= "form-group">
                <label className="form-label" for="brand"><b>Marca:</b></label>
                <select className="form-control" name="brand" >
                <option value="toyota">Toyota</option>
                 <option value="chevrolet" >Chevrolet</option>
                <option value="ford">Ford</option>
                <option value="renault">Renault</option>
                </select>
                </div>
                <br />
                <div  className= "form-group">
                <label className="form-label" for="quantity"><b>Cantidad:</b></label>
                <input type="text" className="form-control" name="quantity"  />
                </div>
                
            </form>
            <br />
            <button className ="btn btn-primary" type = "button" onClick ={handleSubmit} >Agregar</button>
          
        </div>
    )
}

export default OrderInput
