import * as React from 'react';
import { Link } from 'react-router-dom';
import { Label, Input } from '@rebass/forms';
import { Box, Button, Image, Text, Flex } from 'rebass';
import Theme from '../styled-components/theme/theme';
import logo from '../assets/wipit-logo.png';

function Login() {
  return (
    <Theme>
      <div>
        <img src={logo} alt='Logo' />
        <Link to='/login'>login</Link>
      </div>
      <Image src={logo} alt='Logo' width={200} />
      <Flex alignItems='center'>
        <Box mx='auto'>
          <Text fonFamily='Roboto' textAlign='center'>
            Login Page
          </Text>
          <form className='login-form'>
            <Box>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='login-email'
                name='email'
                type='email'
                placeholder='jane@example.com'
              />
            </Box>
            <br />
            <Box>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='login-password'
                name='password'
                type='password'
                placeholder='...'
              />
            </Box>
          </form>
          <Box>
            <Link to='/a'>
              <Button backgroundColor='#33e' variant='outline' mr={2}>
                {' '}
                Artist{' '}
              </Button>
            </Link>
            <Link to='/g'>
              <Button backgroundColor='#33e' variant='outline' mr={2}>
                {' '}
                Gallerist{' '}
              </Button>
            </Link>
            <br />
          </Box>
        </Box>
      </Flex>
    </Theme>
  );
}

export default Login;
