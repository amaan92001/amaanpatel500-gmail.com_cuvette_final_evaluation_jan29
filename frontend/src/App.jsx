import './App.css';
import './styles/landingpage.css';
import './styles/login.css';
import './styles/signup.css';
import './styles/formdashboard.css';
import './styles/sharedlink.css';
import './styles/settingspage.css';
import './styles/workspace.css';
import Header from './components/header';
import LandingPage from './pages/landingpage';
import SettingsPage from './pages/settings';
import WorkSpace from './pages/workspace';
import Footer from './components/footer';
import Theme from './workspace/theme';
import Response from './workspace/response';
import SharedLink from './pages/sharedlink';
import Login from './pages/login';
import Signup from './pages/signup';
import FormDashboard from './pages/formdashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<div className='landing-page'><MainLayout /></div>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/> 
         <Route path="/formdashboard" element={<FormDashboard />}/> 
        <Route path="/settingspage" element={<SettingsPage />}/>
        <Route path="/workspace/:formId/flow" element={<WorkSpace />} />
        <Route path="/workspace/:formId/theme" element={<Theme />} />
        <Route path="/workspace/:formId/response" element={<Response />} />
        <Route path="/sharedLink/:formId" element={<SharedLink />} />
      </Routes>
    </Router>
  );
}

export default App;
