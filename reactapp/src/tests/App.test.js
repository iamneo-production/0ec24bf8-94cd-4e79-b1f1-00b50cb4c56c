
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import React from "react";
import AuthContext from '../Components/Authentication/AuthContext';

import AddProduct from '../Components/AddProduct/AddProduct';
import App from '../App';
import Cart from "../Components/Cart/Cart";
import EditProduct from '../Components/EditProduct/EditProduct';
import Login from "../Components/Login/Login";
import Navbar from '../Components/Navbar/Navbar';
import Orders from "../Components/Orders/Orders";
import Product from "../Components/Products/Product/Product";
import Signup from "../Components/Signup/Signup";


describe('Testing AddProduct Component', () => {

    afterEach(cleanup);

    const renderWithContext = (value) => {
    
        return  render(
            <MemoryRouter>
                <AuthContext.Provider value={value}>
                    <AddProduct />
                </AuthContext.Provider>
            </MemoryRouter>
        )
    }

    test('fe_d1_testcase1' , () => {

        expect(screen.queryByTestId('addproduct')).toBeTruthy();
        expect(screen.queryByTestId('imageUrl')).toBeTruthy();
        expect(screen.queryByTestId('quantity')).toBeTruthy();
        expect(screen.queryByTestId('price')).toBeTruthy();
        expect(screen.queryByTestId('description')).toBeTruthy();
        expect(screen.queryByTestId('productName')).toBeTruthy();
    })

    test('fe_d1_testcase2', () => {
        const { container, getByTestId} = render(<MemoryRouter><App /></MemoryRouter>);
        expect(getByTestId("navigation")).toBeTruthy();
        expect(container).toBeInTheDocument();
      });
})

describe('Test Cart Component', () => {
    

    afterEach(() => {
        cleanup();
    });

    

    const authValue = {
        state : {
            auth : {
                username : 'test@gmail.com',
                authenticated : false,
                role : 'ADMIN'
            }
        }
    }
    
    const stateContextVal = {
        state : {
            auth : {
                role : 'ADMIN',
                authenticated : false,
                username : 'test@gmail.com'
            }
        }
    }

    const renderWithContext = (value) => {
        return (
            render(<MemoryRouter>
                <AuthContext.Provider value={value}>
                    <Cart  />
                </AuthContext.Provider>
            </MemoryRouter>) 
        )
    }

    test('fe_d1_testcase3', () => {
        const { debug } = renderWithContext(authValue);

        expect(screen.findByTestId('placeorder')).toBeTruthy();
        expect(screen.getByText('No Items in cart')).toBeTruthy();

        debug();      

    })

})


describe('Testing AddProduct Component', () => {

    afterEach(cleanup);

    const mockfn = jest.fn();

    const userRole = {
        state : {
            auth : {
                role: 'USER',
                authenticated : true,
                username : 'test@gmail.com'
            }
        }, 
        history : {
            location : {
                state : {
                    state : {
                        productName : 'Test product',
                        description : 'Test Description',
                        quantity : '2',
                        price : '24',
                        imageUrl : 'Test URL'
                    }
                }
            },
            push : mockfn,
            goBack : mockfn,
            replace : mockfn,
            go : mockfn
        },
        notify : mockfn
    }

    const renderWithContext = (value) => {
        return  render(
            <MemoryRouter>
                <AuthContext.Provider value={value}>
                    <EditProduct />
                </AuthContext.Provider>
            </MemoryRouter>
        )
    }

    test('fe_d1_testcase4' , () => {

        expect(screen.queryByTestId('editproduct')).toBeTruthy();
        expect(screen.queryByTestId('imageUrl')).toBeTruthy();
        expect(screen.queryByTestId('quantity')).toBeTruthy();
        expect(screen.queryByTestId('price')).toBeTruthy();
        expect(screen.queryByTestId('description')).toBeTruthy();
        expect(screen.queryByTestId('productName')).toBeTruthy();
    })

    test('fe_d1_testcase5' , () => {

        expect(screen.queryByTestId('imageUrl').value).toBe('Test URL');
        expect(screen.queryByTestId('quantity').value).toBe('2');
        expect(screen.queryByTestId('price').value).toBe('24');
        expect(screen.queryByTestId('description').value).toBe('Test Description');
        expect(screen.queryByTestId('productName').value).toBe('Test product');
    })


})

describe('Test Login Component', () => {
    
    afterEach(cleanup);

    const stateContextVal = {
        state : {
            auth : {
                role : 'ADMIN',
                authenticated : false,
                username : 'test@gmail.com'
            }
        }
    }

    const renderWithContext = (value) => {
        return (
            render(<MemoryRouter>
                <AuthContext.Provider value={value}>
                    <Login  />
                </AuthContext.Provider>
            </MemoryRouter>) 
        )
    }

    test('fe_d1_testcase6', () => {
        
        const inputEl = screen.getByTestId('email');
        const passwordEl = screen.getByTestId('password');
        const loginEl = screen.getByTestId('login');
        const signupEl = screen.getByTestId('signup');

        expect(inputEl).toBeTruthy();
        expect(passwordEl).toBeTruthy();
        expect(loginEl).toBeTruthy();
        expect(signupEl).toBeTruthy();

        fireEvent.change(inputEl, {target : {value : 'test email'}})
        expect(inputEl.value).toBe('test email');

        fireEvent.change(inputEl, {target : {value : 'test password'}})
        expect(inputEl.value).toBe('test password');

    })

})



describe('Testing ADMIN', () => {

    afterEach(cleanup);

    const renderWithContext = (value) => {
        return (
            render(<MemoryRouter>
                <AuthContext.Provider value={value}>
                    <Navbar  />
                </AuthContext.Provider>
            </MemoryRouter>) 
        )
    }

    

    test('Render admin functionality', () => {

        const stateVal = {
            state : {
                auth : {
                    username : 'test@gmail.com',
                    authenticated : true,
                    role : 'ADMIN'
                }
            }         
        }

        const { container, getByTestId} = renderWithContext(stateVal); 
        expect(container).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeTruthy();
        expect(getByTestId('addproduct')).toBeTruthy();
        expect(getByTestId('orders')).toBeTruthy();
    })

    test('Render user functionality', () => {

        const stateVal = {
            state : {
                auth : {
                    username : 'test@gmail.com',
                    authenticated : true,
                    role : 'USER'
                }
            }         
        }
        const { getByTestId} = renderWithContext(stateVal);

        expect(screen.getByText('Logout')).toBeTruthy();
        expect(screen.queryByTestId('addproduct')).toBeNull();
        expect(getByTestId('orders')).toBeTruthy();
        cleanup();
    })

    test('fe_d1_testcase7', () => {

        const stateVal = {
            state : {
                auth : {
                    username : '',
                    authenticated : false,
                    role : ''
                }
            }         
        }

        expect(screen.getByText('Login')).toBeTruthy();

        const addProduct = screen.queryByTestId('addproduct')
        const orders = screen.queryByTestId('orders');


        expect(addProduct).not.toBeInTheDocument();
        expect(orders).not.toBeInTheDocument();;
    })


})

describe('Test Login Component', () => {
    

    afterEach(() => {
        cleanup();
    });

    

    const authValue = {
        state : {
            auth : {
                username : 'test@gmail.com',
                authenticated : false,
                role : 'ADMIN'
            }
        }
    }
    
    const stateContextVal = {
        state : {
            auth : {
                role : 'ADMIN',
                authenticated : false,
                username : 'test@gmail.com'
            }
        }
    }

    const renderWithContext = (value) => {
        return (
            render(<MemoryRouter>
                <AuthContext.Provider value={value}>
                    <Orders  />
                </AuthContext.Provider>
            </MemoryRouter>) 
        )
    }

    test('fe_d1_testcase8', () => {
        const { container, debug } = renderWithContext(authValue);

        expect(container).toBeTruthy();
        expect(screen.getByText('No Orders to Display')).toBeTruthy();

        debug();      

    })

})

const renderWithContext = (value) => {

    const testProps = {
        edit : jest.fn(),
        delete : jest.fn(),
        addcart : jest.fn(),
        price : "23",
        description : 'Test Description',
        productName : 'Test Product',
        url : 'test url',
        quantity : '200'
    }

    return  render(
        <MemoryRouter>
            <AuthContext.Provider value={value}>
                <Product {...testProps} />
            </AuthContext.Provider>
        </MemoryRouter>
    )
}

const adminVal = {
    state : {
        auth : {
            username : 'test@gmail.com',
            authenticated : true,
            role : 'ADMIN'
        }
    }         
}

const userVal = {
    state : {
        auth : {
            username : 'test@gmail.com',
            authenticated : false,
            role : 'USER'
        }
    }         
}

afterEach(cleanup);


test('fe_d1_testcase9', () => {
  const { container } = renderWithContext(userVal);
  expect(container).toBeInTheDocument();
//   debug();
  expect(screen.getByText('200 items left in stock')).toBeTruthy();
  expect(screen.getByText('Test Description')).toBeTruthy();
  expect(screen.getByText('Test Product')).toBeTruthy();
  expect(screen.getByText('₹ 23')).toBeTruthy();
  
});

test('fe_d1_testcase10', () => {
    expect(screen.getByText('Cart')).toBeTruthy();
    expect(screen.queryByText('Edit')).toBeFalsy();
    expect(screen.queryByText('Delete')).toBeFalsy();
})

test('fe_d1_testcase11', () => {
    expect(screen.queryByText('Edit')).toBeTruthy();
    expect(screen.queryByText('Delete')).toBeTruthy();
    expect(screen.getByText('Cart')).toBeTruthy();
})

describe('Test Login Component', () => {
    
    afterEach(cleanup);

    const stateContextVal = {
        state : {
            auth : {
                role : 'ADMIN',
                authenticated : false,
                username : 'test@gmail.com'
            }
        }
    }

    const renderWithContext = (value) => {
        return (
            render(<MemoryRouter>
                <AuthContext.Provider value={value}>
                    <Signup  />
                </AuthContext.Provider>
            </MemoryRouter>) 
        )
    }

    test('fe_d1_testcase12', () => {
        
        const emailEl = screen.getByTestId('email');
        const passwordEl = screen.getByTestId('password');
        const usernameEl = screen.getByTestId('username');
        const confirmpasswordEl = screen.getByTestId('confirmpassword');
        const mobileNumberEl = screen.getByTestId('mobileNumber');
        const roleEl = screen.getByTestId('role');
        const signupEl = screen.getByTestId('signup');

        expect(roleEl).toBeTruthy();
        expect(passwordEl).toBeTruthy();
        expect(usernameEl).toBeTruthy();
        expect(confirmpasswordEl).toBeTruthy();
        expect(mobileNumberEl).toBeTruthy();
        expect(emailEl).toBeTruthy();
        expect(signupEl).toBeTruthy();

        fireEvent.change(emailEl, {target : {value : 'test email'}})
        expect(emailEl.value).toBe('test email');

        fireEvent.change(passwordEl, {target : {value : 'test password'}})
        expect(passwordEl.value).toBe('test password');

        fireEvent.change(confirmpasswordEl, {target : {value : 'test password'}})
        expect(confirmpasswordEl.value).toBe('test password');

        fireEvent.change(usernameEl, {target : {value : 'test username'}})
        expect(usernameEl.value).toBe('test username');

        fireEvent.change(mobileNumberEl, {target : {value : '1234567890'}})
        expect(mobileNumberEl.value).toBe('1234567890');

        fireEvent.change(roleEl, {target : {value : 'ADMIN'}})
        expect(roleEl.value).toBe('ADMIN');

    })

})