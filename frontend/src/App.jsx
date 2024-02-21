
import './App.css'
import LoginSignupContainer from './components/LoginSignupContainer/LoginSignupContainer'
import NavigationBar from './components/NavigationBar/NavigationBar'

const App = () => {

  return (
    <div className='App'>
      <NavigationBar/>
      <LoginSignupContainer/>
    </div>
  )
}

export default App
