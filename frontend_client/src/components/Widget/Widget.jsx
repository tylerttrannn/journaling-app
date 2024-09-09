import "./Widget.css"

const Widget = () =>{
    return( 
        <div className = "widget">
            <div className = "left"> 
                <span className = "title">Users</span>
                <span className = "counter"> 21312</span>
                <span className = "link"> See all users</span>
            </div> 

            <div className = "right">
                <div className = "percentage">
                    20% 
                </div>
            </div> 
        </div>
    )

}

export default Widget