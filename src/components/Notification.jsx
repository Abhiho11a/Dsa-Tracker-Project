function Notif({msg}){
    
    return(
        <div className={`flex fixed top-19 right-5 bg-gray-300 rounded-md px-2 py-1`}>   
            <h2 className="flex">{msg}</h2>
        </div>
    )
}

export default Notif