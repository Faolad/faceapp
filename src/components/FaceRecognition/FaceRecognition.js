import React from "react";
import './FaceRecognition.css';


function FaceRecognition({imageUrl, box}){
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{bottom: box.bottomRow, left: box.leftCol, right:box.rightCol, top:box.topRow  }}>                   
                </div>
            </div>
        </div>
    )
}


export default FaceRecognition