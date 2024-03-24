import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe o BrowserRouter como Router
import Header from '../src/Components/CommonElements/Header';
import { userStore } from '../src/Stores/UserStore';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../src/Stores/UserStore', () => ({
    __esModule: true,
    userStore: jest.fn(),
  }));
  
  describe('Header component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders username correctly from store', async () => {
      const mockUserData = {
        username: 'testUser1',
        photoURL: 'mockPhotoURL1',
        typeOfUser: 200 
      };
      
      userStore.mockReturnValue(mockUserData);
  
      render(
        <Router> {/* Envolve o componente em um contexto de Router */}
          <Header />
        </Router>
      );
      
      expect(screen.queryByText('loading...')).toBeNull();
    
      expect(screen.getByText('testUser1')).toBeInTheDocument();
    });

    it('renders photo correctly from store', async () => {
        const mockUserData = {
          username: 'testUser2',
          photoURL: 'mockPhotoURL2',
          typeOfUser: 100 
        };
        
        userStore.mockReturnValue(mockUserData);
    
        render(
          <Router> {/* Envolve o componente em um contexto de Router */}
            <Header />
          </Router>
        );
    
        expect(screen.queryByText('loading...')).toBeNull();
    
        const photoElement = screen.getByRole('img', { name: /Profile Pic/i });
        expect(photoElement).toBeInTheDocument();
        expect(photoElement).toHaveAttribute('src', 'mockPhotoURL2');
      });


      it('renders menu correctly based on typeOfUser (developer)', async () => {
        const mockUserData = {
            username: 'developer_user',
            photoURL: 'mockPhotoURL3',
            typeOfUser: 100 
        };
        
        userStore.mockReturnValue(mockUserData);
    
        render(
            <Router>
                <Header />
            </Router>
        );
    
        expect(screen.queryByText('loading...')).toBeNull();
    
        // Check if only the "Board" menu item is rendered for typeOfUser === 100
        expect(screen.getByText('Board')).toBeInTheDocument();
        expect(screen.queryByText('Categories')).toBeNull(); // Expect Categories menu not to be rendered
        expect(screen.queryByText('Users')).toBeNull(); // Expect Users menu not to be rendered
    });

    it('renders menu correctly based on typeOfUser (scrum master)', async () => {
        const mockUserData = {
            username: 'scrummaster_user',
            photoURL: 'mockPhotoURL4',
            typeOfUser: 200 
        };
        
        userStore.mockReturnValue(mockUserData);
    
        render(
            <Router>
                <Header />
            </Router>
        );
    
        expect(screen.queryByText('loading...')).toBeNull();
    
        
        expect(screen.getByText('Board')).toBeInTheDocument();
        expect(screen.queryByText('Categories')).toBeNull(); 
        expect(screen.queryByText('Users')).toBeInTheDocument(); 
    });

    it('renders menu correctly based on typeOfUser (product owner)', async () => {
        const mockUserData = {
            username: 'productowner_user',
            photoURL: 'mockPhotoURL5',
            typeOfUser: 300 
        };
        
        userStore.mockReturnValue(mockUserData);
    
        render(
            <Router>
                <Header />
            </Router>
        );
    
        expect(screen.queryByText('loading...')).toBeNull();
    
        
        expect(screen.getByText('Board')).toBeInTheDocument();
        expect(screen.queryByText('Categories')).toBeInTheDocument(); 
        expect(screen.queryByText('Users')).toBeInTheDocument(); 
    });


  });