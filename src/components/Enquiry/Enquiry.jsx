import React from 'react';
import './Enquiry.css';
import Header from '../../Header';
import Footer from '../../Footer';





function Enquiry(){
    
            return( 
            <div>
			<Header/>
        	<section className="mt-0 py-5 enquiry1-section" >
			<div className="container mt-100">
				<div className="row">
					<div className="col-lg-3 col-md-2 col-12 "></div>
					<div className="col-lg-6 col-md-8 col-12">
						<form className="form">
							<h3>Contact Us</h3>
					        <p className="text-center"><a href="/" className="text-white"><img src="https://demo.payu.guru/favicon_128.png" alt="home-icon"/></a> </p>
					        <div className="inputbox">
					            <label>Your Name</label>
					            <input type="text" name="" id="" placeholder="Enter Your Name"/>
					            <p className="msg"></p>
					        </div>
					      	<div className="inputbox">
					            <label>Mobile Number</label>
					            <input type="text" name="" id="" placeholder="Enter Your Number"/>
					            <p className="msg"></p>
					        </div>
					      	<div className="inputbox">
					            <label>Email ID</label>
					            <input type="text" name="" id="" placeholder="Enter Your Email"/>
					            <p className="msg"></p>
					        </div>
					        
					        <input type="submit" value="Submit" className="submit"/>
					    </form>
					</div>
					<div className="col-lg-3 col-md-2 col-12 "></div>
				</div>
			</div>
		</section>

		<Footer/>
        </div>
   )
   
}
export default Enquiry ;