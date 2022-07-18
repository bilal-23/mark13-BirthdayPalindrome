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
      </footer>
    </>
  );
}
