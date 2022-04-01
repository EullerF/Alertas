const List = () => {

    return(
        <div style={{borderRadius:'20x'}}>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Alertas</button>
                <br/>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Publicações</button>
                </div>
                
            </div>
        </div>
    )
}
export default List;