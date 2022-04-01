const List = () => {

    return(
        <div style={{borderRadius:'20x'}}>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Alertas Cadastrados</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px'}}>
                <button  style={{padding: '8px'}} type="button" className="btn btn-outline-primary">Listar Publicações Realizadas</button>
                </div>
                
            </div>
        </div>
    )
}
export default List;