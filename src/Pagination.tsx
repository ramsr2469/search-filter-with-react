import './Pagination.css';
function Pagination({paginations, data, fetch}: any) {
   
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
            <li className="page-item"><button className='page-link' disabled={!data.previous} onClick={() => fetch(data.previous)}>Prev </button></li>
            {paginations.length > 0 && paginations.map((page:string,index:number) => {
            return <li key={`p-${index}`} className='page-item'><button className="page-link" onClick={()=>fetch(page)}>{index +1}</button> </li>
            })}
            <li className='page-item'> <button className="page-link" disabled={!data.next} onClick={() =>fetch(data.next)}> Next </button></li>
            </ul>
        </nav>
    )
}

export default Pagination
