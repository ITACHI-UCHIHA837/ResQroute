import { Link } from 'react-router-dom';

// react-bootstrap
import Image from 'react-bootstrap/Image';

// project-import
import { APP_DEFAULT_PATH } from 'config';

// assets
// import logo from 'assets/images/logo-white.svg';
// import logo from 'assets/images/logoasmelogo.png';
import logo from 'assets/images/logo1.png';

export const DrawerHeader = () => {
  return (
    <div className="m-header mt-5 mb-5" >
      <Link to={APP_DEFAULT_PATH} className="b-brand text-primary">
      
        <Image src={logo} fluid className="logo logo-lg" alt="logo" style={{width:'150px', alignContent:'center' , display:'flex', marginTop: '60px', marginBottom: '80px', marginLeft: '20px' }} />
      </Link>
    </div>
  );
};
