import { useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes } from './components'
import { MetamaskProvider } from './context/Metamask';
import MouseParticles from "react-mouse-particles";

function App() {

  
  useEffect(() => {
    AOS.init({
      duration: '900',
      placement: 'top-center'
    });
  })

  return (
    <>
      <MetamaskProvider>
        <MouseParticles
          g={1}
          color="random"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={20}
          alpha={1}
        />
        <div className="App">
          <Routes />
        </div>
      </MetamaskProvider>
    </>
  )
}

export default App
