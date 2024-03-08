import React  from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import LoginForm from '../src/Components/Forms/LoginForm'

jest.mock('axios');

test('login with valid credentials', async () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'validUser' }});
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validPassword' }});


  // Simula resposta do servidor
  axios.post.mockResolvedValueOnce({
    data: 'token123'
  });

  fireEvent.click(screen.getByText('Login'));

  // Espera por qualquer ação após o login ser bem sucedido
  await waitFor(() => expect(screen.getByText('Home Page')).toBeInTheDocument());

});