import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  NavLink,
} from 'react-router-dom';

// import logo from '../assets/wipit-logo.png';
// import Theme from './styled-components/theme/theme';
import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass';
import { Label, Input } from '@rebass/forms';

function Login() {
  return (
    <div>Hi</div>
    // <Theme>
    //   <div>
    //     <img src={logo} alt='Logo' />
    //     <Link to='/login'>login</Link>
    //   </div>
    //   <Image src={logo} alt='Logo' width={200} />
    //   <Flex alignItems='center'>
    //     <Box mx='auto'>
    //       <Text fonFamily='Roboto' textAlign='center'>
    //         Login Page
    //       </Text>
    //       <form className='login-form'>
    //         <Box>
    //           <Label htmlFor='email'>Email</Label>
    //           <Input
    //             id='login-email'
    //             name='email'
    //             type='email'
    //             placeholder='jane@example.com'
    //           />
    //         </Box>
    //         <br />
    //         <Box>
    //           <Label htmlFor='password'>Password</Label>
    //           <Input
    //             id='login-password'
    //             name='password'
    //             type='password'
    //             placeholder='...'
    //           />
    //         </Box>
    //       </form>
    //       <Box>
    //         <Link to='/a'>
    //           <Button backgroundColor='#33e' variant='outline' mr={2}>
    //             {' '}
    //             Artist{' '}
    //           </Button>
    //         </Link>
    //         <Link to='/g'>
    //           <Button backgroundColor='#33e' variant='outline' mr={2}>
    //             {' '}
    //             Gallerist{' '}
    //           </Button>
    //         </Link>
    //         <br />
    //       </Box>
    //     </Box>
    //   </Flex>
    // </Theme>
  );
}

export default Login;
