import React from "react";

function getUserInfo(id) {
    //拿指定userid的資訊
}

function Profile() {
    const userData = getUserInfo();
    return (
        <div>
        <div className="card card-left1 mb-4" >
            <img src="img/photo-1455448972184-de647495d428.jpg" alt="" className="card-img-top img-fluid" />
            <div className="card-body text-center ">
                <img src="img/avatar-dhg.png" alt="img" width="120px" height="120px" className="rounded-circle mt-n5" />
                <h5 className="card-title">Dave Gamache</h5>
                <p className="card-text text-justify mb-2">I wish i was a little bit taller, wish i was a baller, wish i had a girl… also.</p>
                <ul className="list-unstyled nav justify-content-center">
                    <a href="#" className="text-dark text-decoration-none"> <li className="nav-item">Friends <br /> <strong>12M</strong></li></a>
                    <a href="#" className="text-dark text-decoration-none"> <li className="nav-item">Enimes <br /> <strong>1</strong></li></a> 
                </ul>

            </div>
        </div>


        <div className="card shadow-sm card-left2 mb-4">

            <div className="card-body">

                    <h5 className="mb-3 card-title">About <small><a href="#" className="ml-1">Edit</a></small></h5>

                    <p className="card-text"> <i className="fas fa-calendar-week mr-2"></i> Went to <a href="#" className="text-decoration-none">oh canada</a></p>
                    <p className="card-text"> <i className="fas fa-user-friends mr-2"></i> Become a friend with <a href="#" className="text-decoration-none">obama</a></p>
                    <p className="card-text"> <i className="far fa-building mr-2"></i> Work at <a href="#" className="text-decoration-none">Github</a></p>
                    <p className="card-text"> <i className="fas fa-home mr-2"></i> Live in <a href="#" className="text-decoration-none">San francisco</a></p>
                    <p className="card-text"> <i className="fas fa-map-marker mr-2"></i> From <a href="#" className="text-decoration-none">Seattle, WA</a></p>
            </div>
        




        </div>




        <div className="card shadow-sm card-left3 mb-4">

            <div className="card-body">
                <h5 className="card-title">Photos<small className="ml-2"><a href="#">.Edit </a></small></h5>

                <div className="row">
                    <div className="col-6 p-1">
                        <a href="img/left1.jpg" data-lightbox="id" ><img src="img/left1.jpg" alt="img" className="img-fluid my-2" /></a>  
                        <a href="img/left2.jpg"data-lightbox="id"><img src="img/left2.jpg" alt="img" className="img-fluid my-2" /></a>
                        <a href="img/left3.jpg"data-lightbox="id"><img src="img/left3.jpg" alt="img" className="img-fluid my-2" /></a>

                    </div>


                    <div className="col-6 p-1">
                            <a href="img/left4.jpg"data-lightbox="id"><img src="img/left4.jpg" alt="img" className="img-fluid my-2" /></a>
                            <a href="img/left5.jpg"data-lightbox="id"><img src="img/left5.jpg" alt="img" className="img-fluid my-2" /></a>
                            <a href="img/left6.jpg"data-lightbox="id"><img src="img/left6.jpg" alt="img" className="img-fluid my-2" /></a>

                    </div>

                </div>

            </div>

        </div>
        </div>
    )
}

export default  Profile;