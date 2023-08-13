import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'




  // ........................................................................................................
// const MODEL_ID = 'face-detection';

// const clarifaiSetup = (imageUrl)=>{

//   const PAT = '9a773a65780e48a59dedc86be90a3510';
//   const USER_ID = 'devfaolad1';       
//   const APP_ID = 'devfaolad';   
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
// });
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions
// }


    


// ........................................................................................................

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data)=>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  } 

  onInputChange = (event)=>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input})
    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiSetup(this.state.input))
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })  
    .then(response => response.json())
    .then(result => {

      console.log(result)
      if(result.outputs[0].data.regions){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        console.log(result)
        this.displayFaceBox((this.calculateFaceLocation(result)))
      }
      else{
        console.log("No result")
      }
      
      })
    .catch(error => console.log('error', error));
  }

calculateFaceLocation = (result)=>{  
  const clarifaiFace = result.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height)
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)

      // leftCol: width - (clarifaiFace.left_col * 100),
      // topRow: width + (clarifaiFace.top_row * 100),
      // rightCol: width + (clarifaiFace.right_col* 100),
      // bottomRow: height - (clarifaiFace.bottom_row * 100)
  }
}

displayFaceBox = (box)=>{
  this.setState({box: box})
}


  onRouteChange = (route)=>{
    if (route === 'home'){
      this.setState({isSignedIn: true})
    }else if(route === 'signout'){
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render(){

    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )  
        }  
  
      </div>
    );

  }
}

export default App;
