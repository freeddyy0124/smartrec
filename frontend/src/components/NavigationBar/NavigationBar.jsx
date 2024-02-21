import './NavigationBar.css';

const NavigationBar = () => {
  return <nav>
    <a href="/">SmartRecs</a>
    <div>
        <p>
            Welcome, <span>Guest</span>
        </p>
        <i class="fa-duotone fa-user"></i>
    </div>
  </nav>
}

export default NavigationBar
