import React from "react";
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange, onButtonSubmit}){
    return(
        <div>
            <div className="f3">
                {"This Magic Brain will detect faces in your picture. Give it a try"}
            </div>
            <div className="form center pa4 br3 shadow-5 mt2 w-60">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv3 dib white bg-light-green" onClick={onButtonSubmit}>Detect</button>
            </div>    


        </div>
    )
}


export default ImageLinkForm;