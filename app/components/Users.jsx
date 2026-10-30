import Image from "next/image";
import "./users.css";

export default function Users() {
  return (
    <section id="users" className="users-section">
      <div className="users-content">
        <h2>Users</h2>

        <div className="users-grid">
          <article className="user-card">
            <div className="user-image">
              <Image
                src="/images/users/shippers.png"
                alt="Shippers preparing freight for transport"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <h3>Shippers</h3>

            <p>
              Post shipment opportunities, propose a payment, and connect with
              the first compatible fleet company that accepts the load.
            </p>
          </article>

          <article className="user-card">
            <div className="user-image">
              <Image
                src="/images/users/fleet-managers.png"
                alt="Fleet of freight trucks"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <h3>Fleet Managers</h3>

            <p>
              View relevant open shipments, compare estimated trip costs against
              internal cost settings and choose viable freight opportunities.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
