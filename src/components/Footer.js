import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          Developed By{" "}
          <a
            href="https://bilalmansuri-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Bilal
          </a>
        </p>
        <div className={styles.social_media}>
          <a
            href="https://twitter.com/bilalmansuri2e"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <img src="https://bilalmansuri.vercel.app/images/twitter.svg" alt="Twitter Icon" />
          </a>
          <a
            href="https://linkedin.com/in/bilalmansuri"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <img src="https://bilalmansuri.vercel.app/images/linkedin.svg" alt="LinkedIn Icon" />
          </a>
          <a
            href="https://github.com/bilal-23"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <img src="https://bilalmansuri.vercel.app/images/github.svg" alt="Github Icon" />
          </a>
        </div>
      </footer>
    </>
  );
}