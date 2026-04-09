import { useState, useEffect, useRef } from "react";

const PROJECTS = {
  all: [
    { id: 1, title: "Figs x New Balance 997H — Extremes", role: "Director", category: "Brand", aspect: "16/9", thumb: "/images/thumb_8.jpg", vimeo: "909886821" },
    { id: 2, title: "Calvin Klein — Pride", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_7.jpg", vimeo: "726852934", vimeoHash: "ab3f985689" },
    { id: 3, title: "Requiem", role: "Director", category: "Film", aspect: "16/9", thumb: "/images/thumb_11.jpg", vimeo: "830769227" },
    { id: 4, title: "Google — Seed", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_3.jpg", vimeo: "1038510961", vimeoHash: "eacf923e38" },
    { id: 5, title: "Mati — Pressure", role: "Director", category: "Music", aspect: "16/9", thumb: "/images/thumb_6.jpg", vimeo: "761345388" },
    { id: 6, title: "American Eagle — Live Your Life", role: "Editor", category: "Brand", aspect: "4/3", thumb: "/images/edit_10.jpg", vimeo: "995661319", vimeoHash: "ba34f30287" },
    { id: 7, title: "Sapasi", role: "Director", category: "Brand", aspect: "4/3", thumb: "/images/thumb_3.jpg", vimeo: "970279084" },
    { id: 8, title: "Porsche — 968 L'ART", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_9.jpg", vimeo: "800032962" },
    { id: 9, title: "MASN — Here If You Need Me", role: "Director", category: "Music", aspect: "16/9", thumb: "/images/thumb_9.jpg", vimeo: "970175484" },
    { id: 10, title: "Travis Scott x Jordan 1 Low — Don't Get Caught", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_4.jpg", vimeo: "761584332", vimeoHash: "e701da9787" },
    { id: 11, title: "Big House — Home Goods Skits", role: "Director", category: "Brand", aspect: "16/9", thumb: "/images/thumb_0.jpg", vimeo: "1163381474" },
    { id: 12, title: "Giveon — Lost Me", role: "Editor", category: "Music", aspect: "16/9", thumb: "/images/edit_6.jpg", vimeo: "761343426" },
    { id: 13, title: "Spotify Frequency — KWN", role: "Director", category: "Music", aspect: "16/9", thumb: "/images/thumb_1.jpg", vimeo: "1121369000" },
    { id: 14, title: "Nike Air Force 1 — Mid Jewel NYC", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_5.jpg", vimeo: "655533206", vimeoHash: "a6222f8687" },
    { id: 15, title: "Orlando Pride — The Decennial Kit", role: "Director", category: "Brand", aspect: "16/9", thumb: "/images/thumb_2.jpg", vimeo: "1061834025" },
    { id: 16, title: "Jordan Essentials — Marquise Miller", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_8.jpg", vimeo: "772302980", vimeoHash: "1158642730" },
    { id: 17, title: "Mati — Forever Chimes", role: "Director", category: "Music", aspect: "16/9", thumb: "/images/thumb_4.jpg", vimeo: "785782071" },
    { id: 18, title: "New Balance — Forever Yours", role: "Editor", category: "Brand", aspect: "16/9", thumb: "/images/edit_1.jpg", vimeo: "855779982", vimeoHash: "0f482760c6" },
    { id: 19, title: "Ber — Superspreader", role: "Director", category: "Music", aspect: "4/3", thumb: "/images/thumb_5.jpg", vimeo: "761590340" },
    { id: 20, title: "untitled_070724", role: "Shot on iPhone", category: "Film", aspect: "16/9", thumb: "/images/thumb_10.jpg", vimeo: "988435818" },
    { id: 21, title: "Mountain Hardwear — Seek Wilder Paths", role: "Cinematographer / Editor", category: "Brand", aspect: "16/9", thumb: "/images/thumb_7.jpg", vimeo: "858091000" },
  ],
};

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isRight = index % 2 === 1;
  const offset = isRight ? 70 : 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{
        marginTop: offset,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${index * 0.08}s, transform 0.8s ease ${index * 0.08}s`,
        cursor: "pointer",
      }}
    >
      <div style={{
        aspectRatio: project.aspect,
        overflow: "hidden", position: "relative",
        background: "#111",
      }}>
        <img src={project.thumb} alt={project.title} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
          transition: "background 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
            transition: "all 0.3s ease",
          }} width="44" height="44" viewBox="0 0 48 48" fill="none">
            <polygon points="18,12 38,24 18,36" fill="rgba(255,255,255,0.85)" />
          </svg>
        </div>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.035, mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{
          fontSize: 11, fontWeight: 300, letterSpacing: "0.08em",
          color: hovered ? "#e8e4df" : "#999",
          transition: "color 0.3s ease", textTransform: "uppercase",
        }}>{project.title}</div>
        <div style={{
          fontSize: 10, fontWeight: 200, letterSpacing: "0.08em",
          color: "#555", marginTop: 3, textTransform: "uppercase",
        }}>{project.role}</div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onPrev, onNext, hasPrev, hasNext }) {
  const vimeoUrl = project.vimeoHash
    ? `https://player.vimeo.com/video/${project.vimeo}?h=${project.vimeoHash}&title=0&byline=0&portrait=0&dnt=1`
    : `https://player.vimeo.com/video/${project.vimeo}?title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div style={{
      opacity: 1,
      animation: "fadeIn 0.4s ease",
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

      {/* Back button */}
      <div
        onClick={onBack}
        style={{
          fontSize: 10, fontWeight: 300, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#555",
          cursor: "pointer", marginBottom: 40,
          transition: "color 0.3s",
          display: "inline-block",
        }}
        onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
        onMouseLeave={(e) => e.target.style.color = "#555"}
      >
        ← Back
      </div>

      {/* Video embed */}
      {project.vimeo ? (
        <div style={{
          position: "relative", paddingBottom: "56.25%", height: 0,
          overflow: "hidden", background: "#111", marginBottom: 32,
        }}>
          <iframe
            src={vimeoUrl}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%", border: "none",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div style={{
          aspectRatio: "16/9", background: "#111",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32, color: "#444", fontSize: 13, fontWeight: 300,
        }}>
          Video coming soon
        </div>
      )}

      {/* Title, role, and nav */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{
            fontSize: 14, fontWeight: 400, letterSpacing: "0.04em",
            color: "#e8e4df", textTransform: "uppercase", marginBottom: 4,
          }}>{project.title}</div>
          <div style={{
            fontSize: 11, fontWeight: 200, letterSpacing: "0.08em",
            color: "#555", textTransform: "uppercase",
          }}>{project.role}</div>
        </div>

        {/* Prev / Next arrows */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <svg
            onClick={hasPrev ? onPrev : undefined}
            width="12" height="10" viewBox="0 0 18 14" fill="none"
            style={{
              cursor: hasPrev ? "pointer" : "default",
              transition: "opacity 0.3s",
              opacity: hasPrev ? 0.5 : 0.15,
            }}
            onMouseEnter={(e) => { if (hasPrev) e.currentTarget.style.opacity = 1; }}
            onMouseLeave={(e) => { if (hasPrev) e.currentTarget.style.opacity = 0.5; }}
          >
            <polygon points="8,0 0,7 8,14" fill="#e8e4df" />
            <polygon points="17,0 9,7 17,14" fill="#e8e4df" />
          </svg>
          <svg
            onClick={hasNext ? onNext : undefined}
            width="12" height="10" viewBox="0 0 18 14" fill="none"
            style={{
              cursor: hasNext ? "pointer" : "default",
              transition: "opacity 0.3s",
              opacity: hasNext ? 0.5 : 0.15,
            }}
            onMouseEnter={(e) => { if (hasNext) e.currentTarget.style.opacity = 1; }}
            onMouseLeave={(e) => { if (hasNext) e.currentTarget.style.opacity = 0.5; }}
          >
            <polygon points="10,0 18,7 10,14" fill="#e8e4df" />
            <polygon points="1,0 9,7 1,14" fill="#e8e4df" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HomeBlurb({ animate, onAnimated }) {
  const boldWords = new Set(["Blaize", "Fobbe", "directing", "editing"]);
  const text = "Blaize Fobbe is a filmmaker based in Los Angeles. Originally from Minneapolis, he began making films with friends as a child. Now he focuses his efforts on directing and editing branded, music, and documentary-style films. His portfolio includes collaborations with brands like Nike, Calvin Klein, Mountain Hardwear, Leica, Spotify, Porsche, and many more.";
  const words = text.split(" ");

  const [delays] = useState(() => {
    const maxDelay = 2.0;
    return words.map(() => Math.random() * maxDelay);
  });

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => onAnimated(), 3000);
      return () => clearTimeout(t);
    }
  }, [animate, onAnimated]);

  return (
    <div style={{
      paddingTop: "24vh", minWidth: 720, width: 720,
      margin: "0 auto",
    }}>
      <div style={{
        fontSize: 26, fontWeight: 300, lineHeight: 1.65,
        letterSpacing: "0.01em", paddingRight: 40,
      }}>
        {words.map((word, i) => {
          const isBold = boldWords.has(word);
          return (
            <span
              key={i}
              style={{
                display: "inline",
                color: isBold ? "#e8e4df" : "#807b74",
                fontWeight: isBold ? 400 : 300,
                opacity: animate ? 0 : 1,
                animation: animate ? `wordFade 1s ease-in-out ${delays[i]}s forwards` : "none",
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
      <style>{`
        @keyframes wordFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function BlaizeFobbe() {
  const [page, setPage] = useState("home");
  const [workFilter, setWorkFilter] = useState("All");
  const [navHover, setNavHover] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const scrollRef = useRef(null);

  const getFilteredProjects = () => {
    const list = PROJECTS.all;
    if (workFilter === "All") return list;
    if (workFilter === "Director") {
      const dirOrder = ["Requiem", "Sapasi", "Big House", "Mati — Pressure", "Spotify Frequency", "Figs x New Balance", "MASN", "Mati — Forever", "Orlando Pride", "untitled", "Ber"];
      return list.filter((p) => p.role.includes("Director") || p.role === "Shot on iPhone")
        .sort((a, b) => {
          const ai = dirOrder.findIndex(d => a.title.includes(d));
          const bi = dirOrder.findIndex(d => b.title.includes(d));
          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });
    }
    if (workFilter === "Editor") {
      return list.filter((p) => p.role.includes("Editor"))
        .sort((a, b) => a.title.includes("American Eagle") ? -1 : b.title.includes("American Eagle") ? 1 : 0);
    }
    return list;
  };

  const navItems = [
    { key: "home", label: "Home" },
    { key: "work", label: "Work" },
    { key: "about", label: "About" },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const currentList = getFilteredProjects();
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

  return (
    <div ref={scrollRef} style={{
      background: "#000", height: "100vh", color: "#e8e4df",
      fontFamily: "'Outfit', 'Helvetica Neue', Helvetica, sans-serif",
      position: "relative", overflowX: "hidden", overflowY: "auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-y: auto !important; height: auto !important; }
        ::selection { background: #e8e4df; color: #000; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; }
        a { text-decoration: none; }
      `}</style>

      {/* Left Side Nav */}
      <nav style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 160,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "0 36px", zIndex: 40,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => { setPage(item.key); setWorkFilter("All"); setSelectedProject(null); }}
              onMouseEnter={() => setNavHover(item.key)}
              onMouseLeave={() => setNavHover(null)}
              style={{
                fontSize: 12, fontWeight: page === item.key ? 400 : 300,
                letterSpacing: "0.06em",
                color: page === item.key ? "#e8e4df" : navHover === item.key ? "#888" : "#444",
                cursor: "pointer", transition: "color 0.3s ease",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        marginLeft: 160, minHeight: "100vh", padding: "48px 72px",
        minWidth: 800, overflow: "visible",
      }}>

        {/* HOME */}
        {page === "home" && <HomeBlurb animate={!hasAnimated} onAnimated={() => setHasAnimated(true)} />}

        {/* WORK */}
        {page === "work" && !selectedProject && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {["All", "Director", "Editor"].map((f) => (
                <div key={f} onClick={() => setWorkFilter(f)}
                  style={{
                    fontSize: 10, fontWeight: 400, letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: workFilter === f ? "#e8e4df" : "#444",
                    cursor: "pointer", transition: "color 0.3s",
                    paddingBottom: 3,
                  }}>
                  {f}
                </div>
              ))}
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <a href="https://www.instagram.com/blaizefobbe/" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "#444", transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
                  onMouseLeave={(e) => e.target.style.color = "#444"}
                >Instagram</a>
                <a href="https://vimeo.com/blaizefobbe" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 9, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "#444", transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = "#e8e4df"}
                  onMouseLeave={(e) => e.target.style.color = "#444"}
                >Vimeo</a>
              </div>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px 40px",
            }}>
              {getFilteredProjects().map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onClick={handleProjectClick} />
              ))}
            </div>
          </div>
        )}

        {/* PROJECT DETAIL */}
        {page === "work" && selectedProject && (
          <ProjectDetail project={selectedProject} onBack={handleBack} onPrev={handlePrev} onNext={handleNext} hasPrev={hasPrev} hasNext={hasNext} />
        )}

        {/* ABOUT */}
        {page === "about" && (
          <div style={{ maxWidth: 900, paddingTop: "18vh", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 80 }}>
              <div style={{ width: 280, flexShrink: 0 }}>
                <img src="/images/vertblaize.png" alt="Blaize Fobbe" style={{
                  width: "100%", display: "block", objectFit: "cover",
                }} />
              </div>
              <div style={{ flex: 1, paddingTop: 8 }}>
                <div style={{ marginBottom: 56 }}>
                  <div style={{
                    fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "#444", marginBottom: 16,
                  }}>Clients Include</div>
                  <div style={{ fontSize: 14, fontWeight: 300, lineHeight: 2.2, color: "#807b74" }}>
                    Nike, Google, Calvin Klein, Jordan, Porsche, Red Bull, Gap, Spotify, Cactus Jack, Figs, Leica, New Balance, Lacoste, Mountain Hardwear, eBay
                  </div>
                </div>
                <div style={{ display: "flex", gap: 56 }}>
                  <div>
                    <div style={{
                      fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "#444", marginBottom: 10,
                    }}>Directing Inquiries</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: "#807b74", lineHeight: 1.9 }}>
                      <a href="https://www.6degreesfilms.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: "#e8e4df" }}>6degrees</a><br />
                      <a href="mailto:Patrick@6degreesfilms.com" style={{ color: "#666" }}>patrick@6degreesfilms.com</a>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "#444", marginBottom: 10,
                    }}>Editorial Inquiries</div>
                    <div style={{ fontSize: 13, fontWeight: 300, color: "#807b74", lineHeight: 1.9 }}>
                      <a href="https://house-post.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: "#e8e4df" }}>House Post</a><br />
                      <a href="mailto:christo@house-post.com" style={{ color: "#666" }}>christo@house-post.com</a>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 32 }}>
                  <div style={{
                    fontSize: 9, fontWeight: 400, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "#444", marginBottom: 10,
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
