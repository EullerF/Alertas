import Form from "../Form";
import List from "../List";
const Card = () => {

    return(
        <div className="card" style={{borderRadius:'20x'}}>
            <div className="card-header">
                
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts</h5>
            </div>

            <div className="card-footer text-muted">
            
            <Form></Form>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
            <List></List>
            </div>
            
            </div>
           
           
            
        </div>
    )
}
export default Card;