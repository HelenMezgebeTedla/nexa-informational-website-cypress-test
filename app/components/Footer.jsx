import Image from "next/image";
import "./footer.css";

const links = [
  { label: "About", href: "#about" },
  { label: "Our Product", href: "#product" },
  { label: "Who It Is For", href: "#users" },
  { label: "Why ZamLine", href: "#why-zamline" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const contacts = [
  {
    icon: "/icons/email.svg",
    text: "zamline.nexa@gmail.com",
    href: "mailto:zamline.nexa@gmail.com",
  },
  {
    icon: "/icons/phone.svg",
    text: "+260 971 234 567",
    href: "tel:+260971234567",
  },
  {
    icon: "/icons/location.svg",
    text: "Lusaka, Zambia",
    href: null,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-accent" aria-hidden="true" />

      <div className="site-container footer-inner">
        <div className="footer-brand">
          <Image
            src="/logos/nexa.png"
            alt="Nexa"
            width={126}
            height={82}
            className="footer-logo"
          />
          <h3 className="footer-tagline">Connect. Plan. Move forward.</h3>
          <p className="footer-about">
            ZamLine connects shippers to carriers. We help companies find the
            right freight opportunities and make smart choices with trusted
            information.
          </p>
        </div>

        <nav className="footer-column" aria-label="Footer">
          <h4>Quick Links</h4>
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="footer-contact-list">
            {contacts.map((item) => (
              <li key={item.text}>
                <Image
                  src={item.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="footer-contact-icon"
                />
                {item.href ? (
                  <a href={item.href}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="site-container footer-bottom-inner">
          <p>&copy; {year} Nexa. All rights reserved.</p>
          <a href="#" className="footer-top-link">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
