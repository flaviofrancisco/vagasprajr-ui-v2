import styles from './footer.module.css';
import { FaTwitter, FaDiscord, FaTelegram, FaGoogle, FaFacebook, FaTwitterSquare, FaCloud, FaMailBulk, FaEnvelope } from 'react-icons/fa';

export default function MainFooter() {    
    return (        
        <footer className={`"${styles.footer} sticky z-50 bg-gray-800 bottom-0 p-2"`}>
            <div className={styles['footer-container']}>
                <div className={styles['footer-links']}>                    
                    <a className={styles['footer-links']} href="https://twitter.com/vagasprajr" target="_blank" rel="noopener noreferrer">
                        <FaTwitterSquare /><span className='px-1'>X</span>
                    </a>
                    <a className={styles['footer-links']} href="https://discord.com/invite/dyShHDrwKC" target="_blank" rel="noopener noreferrer">
                        <FaDiscord /><span className='px-1'>Discord</span>
                    </a>
                    <a className={styles['footer-links']} href="https://t.co/NaSpupYU4l" target="_blank" rel="noopener noreferrer">
                        <FaTelegram /><span className='px-1'>Telegram</span>
                    </a>
                    <a className={styles['footer-links']} href='https://bsky.app/profile/vagasprajr.bsky.social' target="_blank" rel="noopener noreferrer">
                        <FaCloud /><span className='px-1'>Bluesky</span>
                    </a>
                    <a className={styles['footer-links']} href='https://www.facebook.com/vagasprajrfb' target="_blank" rel="noopener noreferrer">
                        <FaFacebook /><span className='px-1'>Facebook</span>
                    </a>
                    <a className={styles['footer-links']} href="mailto:contato@vagasprajr.com.br">
                        <FaEnvelope /><span className='px-1'>Contato</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}