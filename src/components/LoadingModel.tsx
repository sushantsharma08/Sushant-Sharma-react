import "./LoadingModel.css"

const LoadingModel = () => {
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
<br /><br /><br />
            <div style={{ fontSize: "x-large", fontFamily: "serif", fontWeight: "bolder", paddingBlock: "10px", color: "rgb(222 184 135)" }}>
                Loading 3-D Model...
            </div>
        </div>

    )

}

export default LoadingModel