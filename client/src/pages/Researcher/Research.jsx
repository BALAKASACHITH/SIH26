import React, { useState, useEffect } from "react";
const TAXONOMY = [
  { level: "Domain", name: "Eukarya" },
  { level: "Kingdom", name: "Animalia" },
  { level: "Phylum", name: "Chordata" },
  { level: "Class", name: "Mammalia" },
  { level: "Order", name: "Primates" },
  { level: "Family", name: "Hominidae" },
  { level: "Genus", name: "Homo" },
  { level: "Species", name: "sapiens" }
];

// Mock Button and Input components
const Button = ({ cn, text, onClick }) => (
  <button className={`btn ${cn}`} onClick={onClick}>{text}</button>
);

const Input = ({ cn, placeholder }) => (
  <input className={`input ${cn}`} placeholder={placeholder} />
);

const Research = () => {
    const [showDiv, setShowDiv] = useState(true);
  const [fileName, setFileName] = useState("");
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealedLevels, setRevealedLevels] = useState(-1);
  const [correctPath, setCorrectPath] = useState([]);
  const [treeOffsets, setTreeOffsets] = useState([]); // track horizontal offsets for tree alignment

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
    } else {
      setFileName("Only PDF files are allowed");
    }
  };

  const handleAnalyze = () => {
    if (!fileName || fileName === "Only PDF files are allowed") return;
    setShowDiv(false);
    setAnalysisStarted(true);
    setLoading(true);
    setRevealedLevels(-1);
    const newCorrectPath = Array(TAXONOMY.length).fill(0).map(() => 
      Math.floor(Math.random() * 3)
    );
    setCorrectPath(newCorrectPath);
    const offsets = [];
    let currentOffset = 0; // start centered
    
    for (let i = 0; i < newCorrectPath.length; i++) {
      offsets.push(currentOffset);
      
      if (i < newCorrectPath.length - 1) {
        // Calculate offset for next level based on current correct position
        const correctPos = newCorrectPath[i]; // 0=left, 1=center, 2=right
        const adjustment = (correctPos - 1) * 120; // -120, 0, or +120px
        currentOffset += adjustment;
      }
    }
    setTreeOffsets(offsets);

    setTimeout(() => {
      setLoading(false);
      setRevealedLevels(0);
    }, 2000);
  };

  useEffect(() => {
    if (!loading && analysisStarted && revealedLevels >= 0) {
      if (revealedLevels >= TAXONOMY.length - 1) return;
      const t = setInterval(() => {
        setRevealedLevels((prev) => {
          if (prev >= TAXONOMY.length - 1) {
            clearInterval(t);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(t);
    }
  }, [loading, analysisStarted, revealedLevels]);

  return (
    <div className="Research">
      <div className="researchBot">
        {analysisStarted ? (
          <>
            <h1 className="analysisTitle">{loading ? "Analyzing..." : "Taxonomy Tree"}</h1>

            {loading ? (
              <div className="loadingSpinner" />
            ) : (
              <div className="treeContainer">
                {TAXONOMY.slice(0, revealedLevels + 1).map((t, levelIndex) => {
                  const showConnector = levelIndex < revealedLevels;
                  const correctIndex = correctPath[levelIndex] ?? 1;
                  const levelOffset = treeOffsets[levelIndex] ?? 0;
                  
                  return (
                    <div
                      className="levelRow"
                      key={levelIndex}
                      style={{ transform: `translateX(${levelOffset}px)` }}
                    >
                      {[0, 1, 2].map((nodeIndex) => (
                        <div className="nodeCol" key={nodeIndex}>
                          <div className="nodeWrapper">
                            <div className={`node ${nodeIndex === correctIndex ? 'correct' : 'wrong'}`} />
                            {nodeIndex === correctIndex && showConnector && (
                              <div className="connector" />
                            )}
                          </div>
                          {nodeIndex === correctIndex && (
                            <div className="levelLabel">
                              {t.level}: <span className="taxonName">{t.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Extra descriptive block after taxonomy fully revealed */}
                {revealedLevels >= TAXONOMY.length - 1 && (
                  <div className="analysisSummary">
                    <p>
                      The eDNA sample analysis indicates presence of multiple eukaryotic taxa
                      including Cnidaria, Protists, and potential novel sequences. Species
                      richness is high, with dominant groups observed in Hydrozoa and rare
                      taxa in Radiolaria. Biodiversity indices suggest a moderately diverse
                      ecosystem. Deep-sea sediment samples show unique fungal signatures
                      belonging to Ascomycota, suggesting unexplored ecological functions in
                      nutrient recycling. Rare genetic clusters point to potential novel
                      lineages, emphasizing the role of eDNA in discovering hidden
                      biodiversity. Comparison with global eDNA databases identifies 20%
                      unclassified reads, underlining the presence of cryptic taxa. Overall,
                      the dataset reflects high biodiversity, functional complexity, and
                      strong environmental filtering shaping community structure.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="TheoryIntro">
              <h1>Our Platform</h1>
              <p>
                Our platform is designed to redefine how researchers explore, analyze, and understand marine biodiversity. By combining cutting-edge AI with an accessible and user-friendly interface, it provides scientists with powerful tools to unlock insights from environmental DNA (eDNA) collected in some of the most remote and fragile ecosystems on Earth.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Fixed bottom controls */}
      {showDiv && (
        <div className="researchTop">
          <label className="fileInputContainer">
            {fileName ? fileName : "Upload"}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          <Input cn="location" placeholder="Enter Location (Optional)" />
          <Button cn="Analyze" text="Analyze" onClick={handleAnalyze} />
        </div>
      )}

      <style>{`
        /* Basic component styles */
        .analysisSummary {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* space out vertically */
          align-items: center; /* center horizontally */
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .analysisSummary p {
          font-size: 30px;
          color: #3b3f9e;
          margin: 10px 0;
          text-align: center;
        }
        .btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
        }
        
        .input {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          outline: none;
        }

        /* Layout */
        .Research {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .researchBot {
          height: 91%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          overflow-x: hidden;
          padding-bottom: 20px;
        }

        .researchTop {
          height: 8%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          padding: 12px 16px;
          position: fixed;
          bottom: -20px;
          left: 0;
          z-index: 100;
        }

        /* Spinner */
        .loadingSpinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3b3f9e;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin-top: 30px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .analysisTitle {
          font-size: 26px;
          margin-top: 8px;
          color: #123070;
          font-weight: 700;
        }

        /* Tree layout - now supports dynamic positioning */
        .treeContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          margin-bottum : 20px;
          width: 100%;
          position: relative;
          overflow-x: auto;
          overflow-y:auto;
          min-width: 100%;
          padding: 0 20px;
        }

        .levelRow {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 120px;
          width: fit-content;
          transition: transform 0.3s ease; /* smooth movement for tree alignment */
        }

        .nodeCol {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .nodeWrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* Node circles */
        .node {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #333;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        .node.correct {
          background: #1faa59;
          box-shadow: 0 0 12px rgba(31, 170, 89, 0.4);
          border-color: #0e7a3e;
        }
        .node.wrong {
          background: #d9534f;
          box-shadow: 0 0 6px rgba(217, 83, 79, 0.2);
          opacity: 0.7;
        }

        /* Labels only appear under correct nodes */
        .levelLabel {
          margin-top: 8px;
          font-size: 16px;
          color: #2b1b61;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
        }
        .taxonName {
          color: #0b3b5f;
          font-weight: 700;
        }

        /* Connectors - only from correct nodes to next level */
        .connector {
          position: absolute;
          top: 52px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 50px;
          background: linear-gradient(to bottom, #1faa59, rgba(31, 170, 89, 0.3));
          border-radius: 2px;
          z-index: 1;
        }

        /* Theory section styling - simplified */
        .TheoryIntro {
          width: 90%;
          max-width: 800px;
          margin-top: 18px;
          text-align: center;
        }
        .TheoryIntro h1 {
          font-size: 28px;
          color: #3b2d8a;
          margin-bottom: 16px;
        }
        .TheoryIntro p {
          font-size: 18px;
          color: #4b0082;
          line-height: 1.6;
          text-align: justify;
        }

        /* Upload button */
        .fileInputContainer {
          background: linear-gradient(135deg, #7b49b3 0%, #9d5cbf 100%);
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(123, 73, 179, 0.3);
          transition: all 0.2s ease;
        }
        .fileInputContainer:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(123, 73, 179, 0.4);
        }

        /* Responsive design */
        @media (max-width: 700px) {
          .levelRow { 
            gap: 80px; 
          }
          .levelLabel { 
            font-size: 14px; 
          }
          .analysisTitle {
            font-size: 22px;
          }
        }

        @media (max-width: 500px) {
          .levelRow { 
            gap: 60px; 
          }
          .node {
            width: 36px;
            height: 36px;
          }
          .connector {
            top: 44px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Research;