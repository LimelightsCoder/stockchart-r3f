'use client'
import { useState } from 'react'
import Header from '@/components/dom/header'
import Link from 'next/link';
// import Menu from '@/components/dom/menu'
// import PixelTransition from '@/components/dom/pixelTransition/centered'

const MobileMenu = () => {
    const [menuIsActive, setMenuIsActive] = useState(false);
  
    return (
        <>
 <div style={{
                backgroundColor: '#000000cc', // Example background color
                padding: '10px', // Add padding for spacing
                // borderRadius: '8px', // Optional: rounded corners
                display: 'flex', // Use flexbox for alignment
                alignItems: 'center', // Align children vertically
                position: 'fixed',
                zIndex: 15,
                top: '0%',
                left: '0px',
                width: '100vw', // Full width
            }}>
                <div 
                    className='menu-button'
                    style={{
                        pointerEvents: 'none',
                        display: 'flex',
                        gap: '10px',
                        mixBlendMode: 'difference',
                    }}>
                    <Link href="/" passHref>
                        <button 
                            style={{ 
                                pointerEvents: 'auto', 
                                color: 'white', 
                                paddingRight: '10px', 
                                paddingLeft: '10px', 
                                borderRadius: '24px', 
                                textTransform: 'uppercase' ,
                                fontSize: '1rem'
                            }}
                            className='py-2 font-bold select-none logo-hover' // Add a class for the logo
                        >
                          GLB 2 JSON & Data Visualization
                        </button>
                    </Link>
                </div>

                <div style={{
                    pointerEvents: 'auto', 
                    display: 'flex',
                    position: 'relative',
                    fontSize: '2.25vw',
                    marginLeft: 'auto', // Push the header to the right
                }}>
                    {/* <Header /> */}
                </div>
            </div>
        </>
    );
}

export default MobileMenu;
