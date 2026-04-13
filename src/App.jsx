import { useState, useEffect, useRef } from "react";

const PROJECTS = {
  all: [
    { id: 1, title: "Figs x New Balance 997H — Extremes", role: "Director", aspect: "16/9", thumb: "/images/thumb_8.jpg", vimeo: "909886821", size: "lg" },
    { id: 3, title: "Sapasi", role: "Director", aspect: "2944/2160", thumb: "/images/thumb_3.jpg", vimeo: "970279084", size: "sm" },
    { id: 9, title: "Big House — Home Goods Skits", role: "Director", aspect: "2880/2160", thumb: "/images/thumb_0.jpg", vimeo: "1163381474", size: "lg" },
    { id: 21, title: "Mountain Hardwear — Seek Wilder Paths", role: "Cinematographer / Editor", aspect: "16/9", thumb: "/images/thumb_7.jpg", vimeo: "858091000", size: "sm" },
    { id: 13, title: "Spotify Frequency — KWN", role: "Director", aspect: "16/9", thumb: "/images/thumb_1.jpg", vimeo: "1121369000", size: "lg" },
    { id: 4, title: "Requiem", role: "Director", aspect: "16/9", thumb: "/images/thumb_11.jpg", vimeo: "830769227", size: "sm" },
    { id: 2, title: "Calvin Klein — Pride", role: "Editor", aspect: "16/9", thumb: "/images/edit_7.jpg", vimeo: "726852934", vimeoHash: "ab3f985689", size: "lg" },
    { id: 5, title: "Google — Seed", role: "Editor", aspect: "16/9", thumb: "/images/edit_3.jpg", vimeo: "1038510961", vimeoHash: "eacf923e38", size: "sm" },
    { id: 6, title: "Mati — Pressure", role: "Director", aspect: "3104/2160", thumb: "/images/thumb_6.jpg", vimeo: "761345388", size: "lg" },
    { id: 7, title: "MASN — Here If You Need Me", role: "Director", aspect: "16/9", thumb: "/images/thumb_9.jpg", vimeo: "970175484", size: "sm" },
    { id: 8, title: "Porsche — 968 L'ART", role: "Editor", aspect: "16/9", thumb: "/images/edit_9.jpg", vimeo: "800032962", size: "lg" },
    { id: 10, title: "Travis Scott x Jordan 1 Low — Don't Get Caught", role: "Editor", aspect: "16/9", thumb: "/images/edit_4.jpg", vimeo: "761584332", vimeoHash: "e701da9787", size: "sm" },
    { id: 11, title: "Giveon — Lost Me", role: "Editor", aspect: "16/9", thumb: "/images/edit_6.jpg", vimeo: "761343426", size: "lg" },
    { id: 12, title: "American Eagle — Live Your Life", role: "Editor", aspect: "2880/2160", thumb: "/images/edit_10.jpg", vimeo: "995661319", vimeoHash: "ba34f30287", size: "sm" },
    { id: 14, title: "Nike Air Force 1 — Mid Jewel NYC", role: "Editor", aspect: "16/9", thumb: "/images/edit_5.jpg", vimeo: "655533206", vimeoHash: "a6222f8687", size: "lg" },
    { id: 15, title: "Ber — Superspreader", role: "Director", aspect: "1928/1440", thumb: "/images/thumb_5.jpg", vimeo: "761590340", size: "sm" },
    { id: 16, title: "Orlando Pride — The Decennial Kit", role: "Director", aspect: "16/9", thumb: "/images/thumb_2.jpg", vimeo: "1061834025", size: "lg" },
    { id: 17, title: "Jordan Essentials — Marquise Miller", role: "Editor", aspect: "16/9", thumb: "/images/edit_8.jpg", vimeo: "772302980", vimeoHash: "1158642730", size: "sm" },
    { id: 18, title: "Mati — Forever Chimes", role: "Director", aspect: "16/9", thumb: "/images/thumb_4.jpg", vimeo: "785782071", size: "lg" },
    { id: 19, title: "New Balance — Forever Yours", role: "Editor", aspect: "16/9", thumb: "/images/edit_1.jpg", vimeo: "855779982", vimeoHash: "0f482760c6", size: "sm" },
    { id: 20, title: "untitled_070724", role: "Shot on iPhone", aspect: "16/9", thumb: "/images/thumb_10.jpg", vimeo: "988435818", size: "lg" },
  ],
};

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const scale = project.size === "lg" ? 1 : 0.82;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{
        marginBottom: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        cursor: "pointer",
        width: `${scale * 100}%`,
      }}
    >
      <div style={{
        overflow: "hidden", position: "relative", background: "#111",
      }}>
        <img src={project.thumb} alt={project.title} style={{
          width: "100%", display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
          transition: "background 0.4s ease",
        }} />
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{
          fontSize: 11, fontWeight: 400, letterSpacing: "0.06em",
          color: hovered ? "#e8e4df" : "#888",
          transition: "color 0.3s ease",
          textTransform: "uppercase",
        }}>{project.title}</div>
        <div style={{
          fontSize: 10, fontWeight: 300, letterSpacing: "0.06em",
          color: "#555", marginTop: 3,
        }}>{project.role}</div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onPrev, onNext, hasPrev, hasNext }) {
  const [aw, ah] = project.aspect.split("/").map(Number);
  const embedPadding = (ah / aw * 100).toFixed(2) + "%";

  const vimeoUrl = project.vimeoHash
    ? `https://player.vimeo.com/video/${project.vimeo}?h=${project.vimeoHash}&title=0&byline=0&portrait=0&dnt=1`
    : `https://player.vimeo.com/video/${project.vimeo}?title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div style={{ opacity: 1, animation: "fadeIn 0.4s ease" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

      <div className="project-detail-layout" style={{
        display: "flex", gap: 48, alignItems: "flex-start",
      }}>
        <div className="project-info-col" style={{
          width: 240, flexShrink: 0, paddingTop: 4,
        }}>
          <div
            onClick={onBack}
            style={{
              fontSize: 10, fontWeight: 300, letterSpacing: "0.12em",
              color: "#555", cursor: "pointer", marginBottom: 40,
              transition: "color 0.3s", display: "inline-block",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
            onMouseLeave={(e) => e.target.style.color = "#555"}
          >
            ← Back
          </div>
          <div style={{
            fontSize: 13, fontWeight: 400, letterSpacing: "0.02em",
            color: "#e8e4df", marginBottom: 6, lineHeight: 1.5,
            textTransform: "uppercase",
          }}>{project.title}</div>
          <div style={{
            fontSize: 11, fontWeight: 300, letterSpacing: "0.04em", color: "#555",
          }}>{project.role}</div>

          <div style={{ display: "flex", gap: 28, alignItems: "center", marginTop: 32 }}>
            <svg onClick={hasPrev ? onPrev : undefined} width="12" height="10" viewBox="0 0 18 14" fill="none"
              style={{ cursor: hasPrev ? "pointer" : "default", transition: "opacity 0.3s", opacity: hasPrev ? 0.5 : 0.15 }}
              onMouseEnter={(e) => { if (hasPrev) e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { if (hasPrev) e.currentTarget.style.opacity = 0.5; }}
            >
              <polygon points="8,0 0,7 8,14" fill="#e8e4df" />
              <polygon points="17,0 9,7 17,14" fill="#e8e4df" />
            </svg>
            <svg onClick={hasNext ? onNext : undefined} width="12" height="10" viewBox="0 0 18 14" fill="none"
              style={{ cursor: hasNext ? "pointer" : "default", transition: "opacity 0.3s", opacity: hasNext ? 0.5 : 0.15 }}
              onMouseEnter={(e) => { if (hasNext) e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { if (hasNext) e.currentTarget.style.opacity = 0.5; }}
            >
              <polygon points="10,0 18,7 10,14" fill="#e8e4df" />
              <polygon points="1,0 9,7 1,14" fill="#e8e4df" />
            </svg>
          </div>
        </div>

        <div className="project-video-col" style={{ flex: 1, maxWidth: 560 }}>
          <div style={{
            position: "relative",
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 2,
          }}>
            {project.vimeo ? (
              <div style={{
                position: "relative", paddingBottom: embedPadding, height: 0,
                overflow: "hidden",
              }}>
                <iframe
                  src={vimeoUrl}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={{
                aspectRatio: "16/9",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#444", fontSize: 13, fontWeight: 300,
              }}>
                Video coming soon
              </div>
            )}
          </div>
          <div style={{
            marginTop: 8, fontSize: 9, color: "#333", letterSpacing: "0.1em",
          }}>
            Max-width: 560px
          </div>
        </div>
      </div>
    </div>
  );
}

function StaggeredGrid({ projects, onClick }) {
  const col1 = projects.filter((_, i) => i % 3 === 0);
  const col2 = projects.filter((_, i) => i % 3 === 1);
  const col3 = projects.filter((_, i) => i % 3 === 2);

  return (
    <div className="stagger-grid" style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 32px",
      alignItems: "start",
    }}>
      <div>
        {col1.map((p) => <ProjectCard key={p.id} project={p} onClick={onClick} />)}
      </div>
      <div>
        {col2.map((p) => <ProjectCard key={p.id} project={p} onClick={onClick} />)}
      </div>
      <div>
        {col3.map((p) => <ProjectCard key={p.id} project={p} onClick={onClick} />)}
      </div>
    </div>
  );
}

export default function BlaizeFobbe() {
  const [page, setPage] = useState("work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const currentList = PROJECTS.all;
  const currentIndex = selectedProject ? currentList.findIndex(p => p.id === selectedProject.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < currentList.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setSelectedProject(currentList[currentIndex - 1]);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSelectedProject(currentList[currentIndex + 1]);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  };

  const navClick = (target) => {
    setPage(target);
    setSelectedProject(null);
    setMenuOpen(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return (
    <div ref={scrollRef} style={{
      background: "#000", height: "100vh", color: "#e8e4df",
      fontFamily: "'Josefin Sans', 'Helvetica Neue', Helvetica, sans-serif",
      position: "relative", overflowX: "hidden", overflowY: "auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-y: auto !important; height: auto !important; }
        ::selection { background: #e8e4df; color: #000; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; }
        a { text-decoration: none; }
        @media (max-width: 768px) {
          .desktop-top-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .main-content { padding: 80px 24px 48px 24px !important; }
          .stagger-grid { grid-template-columns: 1fr !important; }
          .about-layout { flex-direction: column !important; gap: 40px !important; }
          .about-image { width: 100% !important; max-width: 280px !important; }
          .about-page-wrap { padding-left: 0 !important; padding-right: 0 !important; }
          .project-detail-layout { flex-direction: column !important; gap: 24px !important; }
          .project-info-col { width: 100% !important; }
          .project-video-col { max-width: 100% !important; margin: 0 -24px !important; width: calc(100% + 48px) !important; }
        }
      `}</style>

      {/* Top Nav */}
      <nav className="desktop-top-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "32px 48px",
        }}>
          <div
            onClick={() => navClick("work")}
            style={{
              fontSize: 14, fontWeight: 400, letterSpacing: "0.25em",
              color: "#777", cursor: "pointer", transition: "color 0.3s",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
            onMouseLeave={(e) => e.target.style.color = "#777"}
          >
            Blaize Fobbe
          </div>
          <div
            onClick={() => navClick("about")}
            style={{
              fontSize: 12, fontWeight: 300, letterSpacing: "0.2em",
              color: page === "about" ? "#e8e4df" : "#555",
              cursor: "pointer", transition: "color 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
            onMouseLeave={(e) => { if (page !== "about") e.target.style.color = "#555"; }}
          >
            About
          </div>
        </div>
      </nav>

      <div className="mobile-nav-btn" style={{
        display: "none", position: "fixed", top: 16, right: 20,
        zIndex: 60, cursor: "pointer", padding: 8,
        transition: "transform 0.4s ease",
        transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
      }} onClick={() => setMenuOpen(!menuOpen)}>
        <div style={{
          width: 20, height: 1.5, background: "#e8e4df",
          transform: "rotate(45deg)", position: "absolute",
        }} />
        <div style={{
          width: 20, height: 1.5, background: "#e8e4df",
          transform: "rotate(-45deg)",
        }} />
      </div>

      <div className="mobile-nav-btn" style={{
        display: "none", position: "fixed", top: 20, left: 24,
        zIndex: 60, fontSize: 12, fontWeight: 400, letterSpacing: "0.2em",
        color: "#777", cursor: "pointer", textTransform: "uppercase",
      }}
        onClick={() => navClick("work")}
      >
        Blaize Fobbe
      </div>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 55, background: "#000",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start", paddingTop: "30vh", gap: 32,
        }}>
          <div onClick={() => navClick("work")} style={{
            fontSize: 20, fontWeight: page === "work" ? 400 : 300,
            letterSpacing: "0.1em", color: page === "work" ? "#e8e4df" : "#555",
            cursor: "pointer", transition: "color 0.3s ease",
          }}>Work</div>
          <div onClick={() => navClick("about")} style={{
            fontSize: 20, fontWeight: page === "about" ? 400 : 300,
            letterSpacing: "0.1em", color: page === "about" ? "#e8e4df" : "#555",
            cursor: "pointer", transition: "color 0.3s ease",
          }}>About</div>
        </div>
      )}

      <main className="main-content" style={{
        minHeight: "100vh", padding: "140px 48px 48px 48px",
        overflow: "visible",
      }}>

        {page === "work" && !selectedProject && (
          <div>
            <StaggeredGrid projects={PROJECTS.all} onClick={handleProjectClick} />
            <div style={{
              display: "flex", justifyContent: "flex-end", gap: 20, marginTop: 60, paddingBottom: 48,
            }}>
              <a href="https://www.instagram.com/blaizefobbe/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.16em", color: "#444", transition: "color 0.3s", textDecoration: "none", textTransform: "uppercase" }}
                onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
                onMouseLeave={(e) => e.target.style.color = "#444"}
              >Instagram</a>
              <a href="https://vimeo.com/blaizefobbe" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.16em", color: "#444", transition: "color 0.3s", textDecoration: "none", textTransform: "uppercase" }}
                onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
                onMouseLeave={(e) => e.target.style.color = "#444"}
              >Vimeo</a>
            </div>
          </div>
        )}
        {page === "work" && selectedProject && (
          <ProjectDetail project={selectedProject} onBack={handleBack} onPrev={handlePrev} onNext={handleNext} hasPrev={hasPrev} hasNext={hasNext} />
        )}

        {page === "about" && (
          <div className="about-page-wrap" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{
              fontSize: 14, fontWeight: 300, lineHeight: 2,
              letterSpacing: "0.02em", color: "#807b74",
              marginBottom: 56, maxWidth: 600,
            }}>
              <span style={{ color: "#e8e4df", fontWeight: 400 }}>Blaize Fobbe</span> is a filmmaker based in Los Angeles. Originally from Minneapolis, he began making films with friends as a child. Now he focuses his efforts on <span style={{ color: "#e8e4df", fontWeight: 400 }}>directing</span> and <span style={{ color: "#e8e4df", fontWeight: 400 }}>editing</span> branded, music, and documentary-style films. His portfolio includes collaborations with brands like Nike, Calvin Klein, Mountain Hardwear, Leica, Spotify, Porsche, and many more.
            </div>

            <div style={{ marginBottom: 48 }}>
              <div style={{
                fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                color: "#444", marginBottom: 14, textTransform: "uppercase",
              }}>Clients include</div>
              <div style={{ fontSize: 13, fontWeight: 300, lineHeight: 2, color: "#807b74" }}>
                Nike, Google, Calvin Klein, Jordan, Porsche, Red Bull, Gap, Spotify, Cactus Jack, Figs, Leica, New Balance, Lacoste, Mountain Hardwear, eBay
              </div>
            </div>

            <div className="about-layout" style={{ display: "flex", gap: 72 }}>
              <div className="about-image" style={{ width: 320, flexShrink: 0 }}>
                <img src="/images/vertblaize.png" alt="Blaize Fobbe" style={{
                  width: "100%", display: "block", objectFit: "cover",
                }} />
              </div>
              <div style={{ flex: 1, paddingTop: 8 }}>
                <div className="about-contacts" style={{ display: "flex", gap: 56, marginBottom: 32 }}>
                  <div>
                    <div style={{
                      fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                      color: "#444", marginBottom: 10, textTransform: "uppercase",
                    }}>Directing inquiries</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: "#807b74", lineHeight: 1.9 }}>
                      <a href="https://www.6degreesfilms.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: "#e8e4df" }}>6degrees</a><br />
                      <a href="mailto:Patrick@6degreesfilms.com" style={{ color: "#666" }}>patrick@6degreesfilms.com</a>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                      color: "#444", marginBottom: 10, textTransform: "uppercase",
                    }}>Editorial inquiries</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: "#807b74", lineHeight: 1.9 }}>
                      <a href="https://house-post.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: "#e8e4df" }}>House Post</a><br />
                      <a href="mailto:christo@house-post.com" style={{ color: "#666" }}>christo@house-post.com</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                    color: "#444", marginBottom: 10, textTransform: "uppercase",
                  }}>Personal</div>
                  <a href="mailto:Blaizeaaronfobbe@gmail.com" style={{ fontSize: 13, fontWeight: 300, color: "#666" }}>
                    blaizeaaronfobbe@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
