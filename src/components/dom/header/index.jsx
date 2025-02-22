// import styles from './style.module.scss';

// export default function Header({menuIsActive, setMenuIsActive}) {
//   return (
//     <div className={styles.header}>
//         <div onClick={() => {setMenuIsActive(!menuIsActive)}} className={`${styles.burger} ${menuIsActive ? styles.burgerActive : ""}`}>
//         </div>
//     </div>
// )}

'use client';
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './button';
import styles from './style.module.scss';
import Nav from './nav/Nav';

const menu = {
    open: {
        width: "80vw",
        height: "80vh",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "60px",
        height: "25px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}

export default function Header() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.header}>
            <motion.div 
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    )
}