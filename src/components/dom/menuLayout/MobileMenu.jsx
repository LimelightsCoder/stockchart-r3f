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
            <div 
            className='menu-button'
            style={{
                position: 'fixed',
                zIndex: 15,
                top: '2%',
                left: '2%',
                pointerEvents: 'none', // Disable interactions for this container
                display: 'flex',
                gap: '10px',
                // fontSize: isMobile ? '2vw' : '1.75vw',
                mixBlendMode:'difference'
            }}>
                {/* <Link href="/" passHref> */}
                    <button 
                        style={{ 
                            pointerEvents: 'none', 
                            color: 'white', 
                            paddingRight: '10px', 
                            paddingLeft: '10px', 
                            borderRadius: '24px', 
                            textTransform: 'uppercase' 
                        }}
                        className='py-2 font-bold select-none'
                    >
                        &copy; Cory Parrish
                    </button>
                {/* </Link> */}
            </div>

            <div style={{
                position: 'fixed',
                zIndex: 15,
                top: '0%',
                left: '0px',
                pointerEvents: menuIsActive ? 'auto' : 'none',  // Allow interactions only when menu is active
                display: 'flex',
                fontSize:'2.25vw',
            }}>
                <div style={{
          position: 'fixed',
          zIndex: 15,
          top: '20px',
          right: '20px',
          pointerEvents: 'auto',
          display: 'flex',
          gap: '10px',
          fontSize:'2.25vw',
          
        }}>
          <Header />
        </div>
                {/* <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
                <Menu menuIsActive={menuIsActive} />
                <PixelTransition menuIsActive={menuIsActive} /> */}
            </div>
        </>
    );
}

export default MobileMenu;
