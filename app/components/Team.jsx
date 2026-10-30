import Image from "next/image";
import "./team.css";

const members = [
  {
    name: "Helen Mezgebe",
    image: "/images/team/helen.png",
    className: "team-member team-member-helen",
  },
  {
    name: "Jesca Amondi",
    image: "/images/team/jesca.jpg",
    className: "team-member team-member-jesca",
  },
  {
    name: "Purity Anyango",
    image: "/images/team/purity.jpg",
    className: "team-member team-member-purity",
  },
  {
    name: "Sandra Twala",
    image: "/images/team/sandra.png",
    className: "team-member team-member-sandra",
  },
  {
    name: "Shamy Umukundwa",
    image: "/images/team/shamy.jpg",
    className: "team-member team-member-shamy",
  },
];

export default function Team() {
  return (
    <section className="team-section" id="team">
      <div className="site-container team-inner">
        <h2>Team Nexa</h2>
        <p className="team-intro">Meet the Team behind ZamLine</p>
        <div className="team-grid">
          {members.map((member) => (
            <article className={member.className} key={member.name}>
              <div className="team-photo">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 767px) 190px, 190px"
                />
              </div>
              <h3>{member.name}</h3>
              <p>Software Developer</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
