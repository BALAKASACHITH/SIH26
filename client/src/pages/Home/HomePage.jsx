import dna from './dna.mp4'
const HomePage = () => {
    return (
        <div className="HomePage">
            <video autoPlay loop muted playsInline className="background-video">
                <source src={dna} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="overlay">
                <div className="Hometop">
                    <div className="htLeft"></div>
                    <div className="htRight">
                        <div className="htrHome">Home</div>
                        <div className="htrAbout">About</div>
                        <div className="htrSelect">
                            <div className="htrsResearcher">Researcher</div>
                            <h3>/</h3>
                            <div className="htrsAdmin">Admin</div>
                        </div>
                    </div>
                </div>
                <div className="Homebot">
                    <h1>Want To Discover Deep Sea Biodiversity ??</h1>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
