import React from 'react'
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <>
            <span className={styles.loader}></span>
            <div className={styles.overlay}></div>
        </>

    )
}

export default Loader