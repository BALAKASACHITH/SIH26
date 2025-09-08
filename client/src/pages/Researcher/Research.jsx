import React, { useState } from 'react';
import Button from '../../FormElements/Button';
import Input from '../../FormElements/Input';

const Research = () => {
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [researchText, setResearchText] = useState("");
    const [analysisStarted, setAnalysisStarted] = useState(false);

    // For accordion
    const [activeIndex, setActiveIndex] = useState(null);

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

    // Accordion toggle
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="Research">
            <div className="researchBot">
                <div className="TheoryIntro">
                    <h1>Our Platform</h1>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our platform is designed to redefine how researchers explore, analyze, and
                        understand marine biodiversity. By combining the strengths of cutting-edge
                        AI with an accessible and user-friendly interface, it provides scientists
                        with powerful tools to unlock insights from environmental DNA (eDNA)
                        collected in some of the most remote and fragile ecosystems on Earth.
                    </p>
                </div>
                {analysisStarted ? (
                    <>
                        <h1 className="analysisTitle">
                            {loading ? "Analyzing..." : "Result of Analysis"}
                        </h1>
                        {loading ? (
                            <div className="loadingSpinner"></div>
                        ) : (
                            <p className="analysisResult">
                                {researchText}
                            </p>
                        )}
                    </>
                ) : (
                    <div className="Theory">
                        {[
                            {
                                title: "Analyze Smarter",
                                content:
                                    "Upload eDNA datasets and run them through our AI-powered pipeline. Get taxonomy classification, novelty detection, and environmental insights with dashboards."
                            },
                            {
                                title: "Collaborate & Share",
                                content:
                                    "Join a global community of marine researchers. Share findings, post discoveries, and exchange knowledge to accelerate deep-sea exploration together."
                            },
                            {
                                title: "Visualize Biodiversity",
                                content:
                                    "Interactive dashboards show species clusters, abundance patterns, and environmental context — helping researchers make decisions quickly."
                            },
                            {
                                title: "Accessible & Connected",
                                content:
                                    "Use offline onboard during expeditions or online in labs. The platform adapts for connectivity and collaboration."
                            }
                        ].map((item, index) => (
                            <div key={index} className="accordionItem">
                                <div
                                    className="accordionHeader"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3>{item.title}</h3>
                                    <i
                                        className={`fas ${
                                            activeIndex === index
                                                ? "fa-chevron-up"
                                                : "fa-chevron-down"
                                        }`}
                                    ></i>
                                </div>
                                {activeIndex === index && (
                                    <div className="accordionContent">
                                        <p>{item.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
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
                <Input cn="location" placeholder="Enter Location" />
                <Button cn="Analyze" text="Analyze" onClick={handleAnalyze} />
            </div>
            <style>{`
                .TheoryIntro {
                    width: 90%;
                    margin-top: 2px;
                    text-align: justify;
                }
                .TheoryIntro h1 {
                    color: darkslateblue;
                    font-size: 40x;
                    text-align: center;
                }
                .TheoryIntro p {
                    font-size: 28px;
                    line-height: 1.2;
                    color: #4b0082;
                    background-color: #f9f5fc;
                }
                .researchBot {
                    height: 90%;
                    width: 100%;
                    font-size: 20px;
                    line-height: 1.6;
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow-y:auto;
                    padding-bottom:20px;
                }
                .analysisTitle {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 25px;
                    color: darkblue;
                }
                .analysisResult {
                    font-size: 22px;
                    color: green;
                    line-height: 1.8;
                    text-align: justify;
                    padding: 15px 20px;
                    background-color: #f9f5fc;
                    border-radius: 20px;
                    width: 90%;
                    margin: 0 auto;
                    box-shadow: 0 0 10px purple;
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
                .Theory {
                    width: 90%;
                    background: #f3e8ff;
                    padding: 20px;
                    border-radius: 20px;
                    box-shadow: 0 0 10px rgba(128,0,128,0.3);
                }
                .accordionItem {
                    border-bottom: 1px solid #d1b3ff;
                }
                .accordionHeader {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    padding: 12px;
                    font-size: 22px;
                    color: #4b0082;
                }
                .accordionHeader h3 {
                    margin: 0;
                    font-size: 22px;
                }
                .accordionHeader i {
                    font-size: 20px;
                }
                .accordionContent {
                    padding: 0 12px 15px;
                    font-size: 55px;
                    color: #333;
                    background: #faf5ff;
                    border-radius: 10px;
                    margin: 10px 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default Research;
