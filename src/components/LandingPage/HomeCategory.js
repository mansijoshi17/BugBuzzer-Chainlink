import React from "react";
import { Link } from "react-router-dom";
function HomeCategory() {
    return (

        <>
            <div>
                <div>
                    <h2 className="browse-stories ">Browse Category</h2>
                     <p style={{ borderBottom: "3px solid #6EBF8B", width: "21%", textAlign: "center", margin: "10px auto 15px" }}></p>

                </div>

                <div className="homeCategory">
                    <div className="container mainCategory">
                        <div className="row rowcategory">
                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="UXUI.png" />
                                    <Link to="fanfiction">
                                        <div className="profile-name">UI/UX</div></Link>
                                </div>
                            </div>

                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2">

                                    <img src="../VULNERABILITIES.jpg" />
                                    <Link to="fantasy">
                                        <div className="profile-name">SECURITY VULNERABILITIES</div>
                                    </Link>

                                </div>
                            </div>
                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="../SMART CONTRACT.png" className="img img-responsive" />
                                    <Link to="smartcontract">
                                        <div className="profile-name">SMART CONTRACT</div></Link>
                                </div>
                            </div>
                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="crypto SCAMS.jpg" className="img img-responsive" />
                                    <Link to="mystery">
                                        <div className="profile-name">CRYOTO SCAMS</div> </Link>
                                </div>
                            </div>
                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="ITO.jpeg" className="img img-responsive" />
                                    <Link to="romance">
                                        <div className="profile-name">HARDWARE AND IOT</div> </Link>
                                </div>
                            </div>
                            <div className="col-md-4" style={{ height: "260px" }}>

                                <div className="profile-card-2"><img src="FUNCTIONAL.png" />
                                    <Link to="historical">
                                        <div className="profile-name">FUNCTIONAL ISSUES</div> </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeCategory;