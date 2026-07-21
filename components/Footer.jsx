import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", borderTop: "1px solid rgba(255, 255, 255, 0.1)", padding: "60px 0 30px" }}>
      <div className="container">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px", marginBottom: "40px" }}>
          <div style={{ maxWidth: "300px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Logo size={40} />
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: "1.25rem", color: "var(--cream)" }}>
                <span style={{ color: "var(--blue)" }}>AKOKA</span> SOLVE
              </span>
            </Link>
            <p style={{ color: "var(--grey-light)", fontSize: "0.875rem", marginBottom: "16px" }}>
              INNOVATION | SOLUTIONS | IMPACT<br/>
              Grassroots Innovation for the Lagos Megacity.
            </p>
            <div style={{ color: "var(--gold)", fontSize: "0.875rem" }}>
              <p>partner@akokasolve.com</p>
              <p>@AkokaSolve</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "60px" }}>
            <div>
              <h4 style={{ color: "var(--cream)", marginBottom: "16px" }}>Platform</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><Link href="/" style={{ color: "var(--grey-light)", fontSize: "0.875rem" }}>Home</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", flexWrap: "wrap", gap: "20px" }}>
          <p style={{ color: "var(--grey-light)", fontSize: "0.75rem" }}>
            &copy; {new Date().getFullYear()} Akoka Solve. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", color: "var(--grey-light)", fontSize: "0.75rem", fontWeight: 600 }}>
            <span>U-COHUB</span>
            <span>NYSC</span>
            <span>IRIS+</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
