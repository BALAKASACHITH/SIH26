import React, { useState } from 'react';
import Button from '../../FormElements/Button';
const Research = () => {
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [researchText, setResearchText] = useState("");
    const [analysisStarted, setAnalysisStarted] = useState(false);
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
        setAnalysisStarted(true);
        setLoading(true);
        setResearchText("");
        setTimeout(() => {
            setLoading(false);
            const data = `The eDNA sample analysis indicates presence of multiple eukaryotic taxa including Cnidaria, Protists, and potential novel sequences. Species richness is high, with dominant groups observed in Hydrozoa and rare taxa in Radiolaria. Biodiversity indices suggest a moderately diverse ecosystem. Deep-sea sediment samples show unique fungal signatures belonging to Ascomycota, suggesting unexplored ecological functions in nutrient recycling. Rare genetic clusters point to potential novel lineages, emphasizing the role of eDNA in discovering hidden biodiversity. Comparison with global eDNA databases identifies 20% unclassified reads, underlining the presence of cryptic taxa. Overall, the dataset reflects high biodiversity, functional complexity, and strong environmental filtering shaping community structure.`; 
            let index = 0;
            const words = data.split(" ");
            const interval = setInterval(() => {
                setResearchText((prev) => prev + words[index] + " ");
                index++;
                if (index === words.length) clearInterval(interval);
            }, 200);
        }, 3000);
    };
    return (
        <div className="Research">
            <div className="researchTop">
                <label className="fileInputContainer">
                    {fileName
                        ? fileName
                        : "Click here and Upload A PDF containing eDNA sequencing reads or related data from deep-sea"}
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </label>
                <Button cn="Analyze" text="Analyze" onClick={handleAnalyze} />
            </div>
            <div className="researchBot">
                {analysisStarted && (
                    <>
                        <h1 className="analysisTitle">
                            {loading ? "Analyzing..." : "Result of Analysis"}
                        </h1>
                        {loading ? (
                            <div className="loadingSpinner"></div>
                        ) : (
                            <p
                                style={{
                                    fontSize: "25px",
                                    color: "green",
                                    lineHeight: "1.8",
                                    textAlign: "justify",
                                    padding: "10px 20px",
                                    backgroundColor: "#f9f5fc",
                                    borderRadius: "20px",
                                    width: "90%",
                                    margin: "0 auto",
                                    boxShadow: "0 0 10px purple"
                                }}
                            >
                                {researchText}
                            </p>
                        )}
                    </>
                )}
            </div>
            <style>{`
                .researchBot {
                    height: 90%;
                    width: 100%;
                    margin-top: 20px;
                    font-size: 20px;
                    line-height: 1.6;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .analysisTitle {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 25px;
                    color: darkblue;
                }
                .loadingSpinner {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid darkblue;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                    margin-top: 30px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}</style>
        </div>
    );
};

export default Research;
