
import Navigation from './components/Navigation'
import Login from './components/Login'
import Auth from './components/Auth'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import DeepfakeDetection from './components/DeepfakeDetection'
import Report from './components/Report'
import UserProfile from './components/UserProfile'
import VideoAnalyzer from './components/VideoAnalyzer'
import Test from './components/Test'
import DeepFakeAnalyzer from './components/DeepFakeAnalyzer'
import NewsFeed from './components/News'


function App() {
  return (
    <div className="App">
    {/* <Navigation/>
    <Auth/>
    <Login/> */}

       
       <BrowserRouter>
        <Routes>
           <Route path='/' element={<><Navigation/><Welcome/><Footer/></>}/>
           <Route path='/Login' element={<><Navigation/><Login/><Footer/></>}/>
           <Route path='/SignUp' element={<><Navigation/><Auth/><Footer/></>}/>
           <Route path='/Profile' element={<><Navigation/><UserProfile/><Footer/></>}/>
           <Route path='/DeepfakeDetection' element={<><Navigation/><DeepFakeAnalyzer/><Footer/></>}/>
           <Route path='/Test' element={<><Navigation/><Test/><Footer/></>}/>
           <Route path='/Updates' element={<><Navigation/><NewsFeed/><Footer/></>}/>
           <Route path='/DeepfakeReport' element={<><Navigation/><Report/><Footer/></>}/>
           

           
           


        </Routes>
       </BrowserRouter>
    
      
    </div>
  );
}

export default App;
