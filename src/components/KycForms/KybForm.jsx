import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './KybForm.css';

const url = ""

const KYBForm = () => {

    let navigate = useNavigate();
    const initialValues = {
    };
    
    const [values] = useState(initialValues);

    const Submitform = () =>{
        console.log(values)
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
        
        .then(navigate(`/kycform`))
    }
   

    
    return(
        <div>
            
       <section className="kyc-form signup-step-container">
                    <div className="container mt-5" id="wrapper">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                <div className="wizard">
                                    <div className="wizard-inner">
                                        <div className="connecting-line"></div>
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li role="presentation" className="active">
                                                <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true"><span className="round-tab">1 </span> <i>Step 1</i></a>
                                            </li>
                                            <li role="presentation" className="disabled">
                                                <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded="false"><span className="round-tab">2</span> <i>Step 2</i></a>
                                            </li>
                                            <li role="presentation" className="disabled">
                                                <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab"><span className="round-tab">3</span> <i>Step 3</i></a>
                                            </li>
                                            <li role="presentation" className="disabled">
                                                <a href="#step4" data-toggle="tab" aria-controls="step4" role="tab"><span className="round-tab">4</span> <i>Step 4</i></a>
                                            </li>
                                        </ul>
                                    </div>
                    
                                    <form role="form" action="index.html" className="login-box box8 p-5">
                                        <div className="tab-content" id="main_form">
                                            <div className="tab-pane active" role="tabpanel" id="step1">
                                                <h4 className="text-center mb-4">Step 1</h4>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label for="name">Business Name</label>
                                                        <input type="text" className="form-control" name="business_name" id="bname" placeholder="Enter your business name." onkeyup="validatebname()" required/>
                                                        </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="name">Account Name</label>
                                                        <input type="text" className="form-control" name="account_name" id="sa_name" placeholder="Enter your name." required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="mobile">Mobile Number<span className="required"> *</span></label>
                                                        <input type="mobile" className="form-control" name="mobile" id="mobile" placeholder="Enter your mobile number." required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="email">Email ID<span className="required"> *</span></label>
                                                        <input type="addemailress" className="form-control" name="email" id="email" placeholder="Enter your email id." required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                    <label for="name">Business Registration Type</label>
                                                            <select className="form-control browser-default custom-select" id="inputOwnership" name="ownership">
                                                                <option value="SelectOwnership">--Select One--</option>
                                                                <option value="proprietary">Proprietary</option>
                                                                <option value="partnership">Partnership</option>
                                                                <option value="private">Private</option>
                                                                <option value="public">Public</option>
                                                                <option value="llp">LLP</option>
                                                            </select>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="MCC">Business Sector</label>
                                                        <select className="form-control browser-default custom-select" id="MCC">
                                                            <option value="Select MCC">--Select MCC--</option>
                                                            <option value="Agricultural Services">Agricultural Services</option>
                                                            <option value="Contract Services">Contract Services</option>
                                                            <option value="Wholesale suppliers and manufacturers">Wholesale suppliers and manufacturers</option>
                                                            <option value="Airlines">Airlines</option>
                                                            <option value="Car Rents">Car Rents</option>
                                                            <option value="Hotel / Resort">Hotel / Resort</option>
                                                            <option value="Not Categorized">Not Categorized</option>
                                                            <option value="Transportation Services">Transportation Services</option>
                                                            <option value="Utility Services">Utility Services</option>
                                                            <option value="Service Provider">Service Provider</option>
                                                            <option value="Retail Outlet Services">Retail Outlet Services</option>
                                                            <option value="Cars and Vehicles">Cars and Vehicles</option>
                                                            <option value="Clothing Stores">Clothing Stores</option>
                                                            <option value="Miscellaneous Stores">Miscellaneous Stores</option>
                                                            <option value="Mail / Telephone Sales">Mail / Telephone Sales</option>
                                                            <option value="Personal Services">Personal Services</option>
                                                            <option value="Business Services">Business Services</option>
                                                            <option value="Repair Services">Repair Services</option>
                                                            <option value="Entertainment Services">Entertainment Services</option>
                                                            <option value="Professional Services">Professional Services</option>
                                                            <option value="Membership  Organizations">Membership Organizations</option>
                                                            <option value="Government Services">Government Services</option>

                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="mccCategory">Category</label>
                                                        <select className="form-control" id="category">
                                                            <option value="Select One">---Select One--- </option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="mccSubCategory">Business Type</label>
                                                        <select className="form-control" id="subCategory">
                                                            <option value="">---Select One--- </option>
                                                        </select>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                <ul className="list-inline pull-right">
                                                    <li><button type="button" className="btn default-btn next-step">Continue to next step</button></li>
                                                </ul>
                                            </div>
                                            <div className="tab-pane" role="tabpanel" id="step2">
                                                <h4 className="text-center mb-4">Step 2</h4>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label for="name">Turnover Type</label>
                                                        <select className="form-control browser-default custom-select" id="inputState">
                                                            <option value="SelectState">--Select Turnover Type--</option>
                                                            <option value="Andra Pradesh">Small</option>
                                                            <option value="Arunachal Pradesh">Large</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="inputState">State</label>
                                                        <select className="form-control browser-default custom-select" id="inputState1">
                                                            <option value="SelectState">--Select State--</option>
                                                            <option value="Andra Pradesh">Andra Pradesh (37)</option>
                                                            <option value="Arunachal Pradesh">Arunachal Pradesh (12)</option>
                                                            <option value="Assam">Assam (18)</option>
                                                            <option value="Bihar">Bihar (10)</option>
                                                            <option value="Chhattisgarh">Chhattisgarh (22)</option>
                                                            <option value="Delhi">Delhi (07)</option>
                                                            <option value="Goa">Goa (30)</option>
                                                            <option value="Gujarat">Gujarat (24)</option>
                                                            <option value="Haryana">Haryana (06)</option>
                                                            <option value="Himachal Pradesh">Himachal Pradesh (02)</option>
                                                            <option value="Jammu and Kashmir">Jammu and Kashmir (01)</option>
                                                            <option value="Jharkhand">Jharkhand (20)</option>
                                                            <option value="Karnataka">Karnataka (29)</option>
                                                            <option value="Kerala">Kerala (32)</option>
                                                            <option value="Madya Pradesh">Madya Pradesh (23)</option>
                                                            <option value="Maharashtra">Maharashtra (27)</option>
                                                            <option value="Manipur">Manipur (14)</option>
                                                            <option value="Meghalaya">Meghalaya (17)</option>
                                                            <option value="Mizoram">Mizoram (15)</option>
                                                            <option value="Nagaland">Nagaland (13)</option>
                                                            <option value="Orissa">Orissa (21)</option>
                                                            <option value="Pondicherry">Pondicherry (34)</option>
                                                            <option value="Punjab">Punjab (03)</option>
                                                            <option value="Rajasthan">Rajasthan (08)</option>
                                                            <option value="Sikkim">Sikkim (11)</option>
                                                            <option value="Tamil Nadu">Tamil Nadu (33)</option>
                                                            <option value="Telangana">Telangana (36)</option>
                                                            <option value="Tripura">Tripura (16)</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh (09)</option>
                                                            <option value="Uttaranchal">Uttaranchal (05)</option>
                                                            <option value="West Bengal">West Bengal (19)</option>
                                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands (35)</option>
                                                            <option value="Chandigarh">Chandigarh(04)</option>
                                                            <option value="Dadar and Nagar Haveli">Dadra & Nagar Haveli and Daman & Diu (26)</option>
                                                            <option value="Lakshadweep">Lakshadweep (31)</option>
                                                            <option value="Ladakh">Ladakh (38)</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="inputDistrict">District</label>
                                                        <select className="form-control" id="inputDistrict1">
                                                            <option value="">---Select one--- </option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">City</label>
                                                        <input type="address" className="form-control" name="City" id="city" placeholder="Enter City" required/>
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">Address 1</label>
                                                        <input type="address" className="form-control" name="aIFSC Codeddress" id="ifsc" placeholder="Address 1" required/>
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">Address 2</label>
                                                        <input type="address" className="form-control" name="aIFSC Codeddress" id="ifsc" placeholder="Address 2" required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="zip">Postal-Code</label>
                                                        <input type="zip" className="form-control" name="Zip" id="zip" placeholder="Postal-Code." required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="SA_number">Settlement Account Name</label>
                                                        <input type="text" className="form-control" name="SA_name" id="SA_number" placeholder="Settlement Account Name" required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">Settlement Account No</label>
                                                        <input type="address" className="form-control" name="aIFSC Codeddress" id="ifsc" placeholder="Settlement Account No" required/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">Settlement Account IFSC</label>
                                                        <input type="address" className="form-control" name="aIFSC Codeddress" id="ifsc" placeholder="IFSC Code" required/>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <ul className="list-inline pull-right d-flex">
                                                    <li><button type="button" className="btn default-btn prev-step mx-1">Back</button></li>
                                                    <li><button type="button" className="btn default-btn next-step mx-1">Continue</button></li>
                                                </ul>
                                            </div>
                                            <div className="tab-pane" role="tabpanel" id="step3">
                                                <h4 className="text-center mb-4">Step 3</h4>
                                                    <div className="row">
                                                        
                                                        <div className="col-md-6 form-group">
                                                            <label for="Date">Date Of Birth</label>
                                                            <input type="Date" name="dob" className="form-control" id="Date" placeholder="" required disabled/>
                                                        </div>
                                                        
                                                        <div className="col-md-6 form-group">
                                                            <label for="doi">DOI (Date of Incorporation)</label>
                                                            <input type="doi" name="doi" className="form-control" id="doi" placeholder="DOI" required/>
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label for="doi">CIN</label>
                                                            <input type="text" name="doi" className="form-control" id="cin_num" placeholder="CIN Number" required/>
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label for="doi">PAN Number</label>
                                                            <input type="text" name="pan_number" className="form-control" id="pan_num" placeholder="PAN Number" required/>
                                                        </div>
                                                        
                                                        <div className="col-md-6 form-group">
                                                            <label for="gstNumber">GST Number</label>
                                                            <input type="gstNumber" name="gstNumber" className="form-control" id="gstNumber" placeholder="GST Number" required/>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="otherDocument">Other Document</label>
                                                            <select className="form-control" id="otherDocument">
                                                                <option  value="select">---Select One--- </option>
                                                                <option id="adhar" value="udyogAdhar">Udyog Adhaar</option>
                                                                <option id="billNumber" value="electricNumber">Electric Bill Number</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label for="adhar">Udyog Aadhaar</label>
                                                            <input type="adhar" name="adhar" className="form-control enable" id="udyogAdhar" placeholder="Udyog Aadhaar" required disabled="true" />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label for="electricNumber">Electricity Bill Number</label>
                                                            <input type="electricNumber" name="electricNumber enable" className="form-control" id="electricNumber" placeholder="Electricity Bill Number" required disabled="true" />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label for="elctric_board_code">Electricity Board Code</label>
                                                            <input type="elctric_board_code" name="elctric_board_code" className="form-control" id="elctric_board_code" placeholder="Electricity Board Code" required disabled />
                                                        </div>
                                                    </div>
                                                    <ul className="list-inline pull-right d-flex">
                                                        <li><button type="button" className="btn default-btn prev-step mx-1">Back</button></li>
                                                        <li><button type="button" className="btn default-btn next-step mx-1">Continue</button></li>
                                                    </ul>
                                            </div>
                                            <div className="tab-pane" role="tabpanel" id="step4">
                                                <h4 className="text-center mb-4">Step 4</h4>
                                                    <div className="row">
                                                        
                                                    
                                                    <div className="col-md-6 form-group">
                                                        <label for="IFSC">Website URL / App Name</label>
                                                        <input type="address" className="form-control" name="aIFSC Codeddress" id="ifsc" placeholder="Website URL / App Name" required/>
                                                    </div>
                                                    
                                                    <div className="col-md-6 form-group">
                                                            <label for="company_partners">Company Partners</label>
                                                            <select className="form-control browser-default custom-select" id="company_partners" name="company_partners">
                                                                <option value="selectPartners">--Select Company Partners--</option>
                                                                <option value="proprietary">1</option>
                                                                <option value="partnership">2</option>
                                                                <option value="private">3</option>
                                                                <option value="public">4</option>
                                                                <option value="llp">5+</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <input type="checkbox" className="checkbox form-check d-inline" id="chb" required/><label for="chb" className="form-check-label">&nbsp;I accept all terms and conditions.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <ul className="list-inline pull-right d-flex">
                                                        <li><button type="button" className="btn default-btn prev-step mx-1">Back</button></li>
                                                        <li><button type="button" className="btn default-btn next-step mx-1" onClick={Submitform}>Submit</button></li>
                                                    </ul>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>   
                    </div>
                </section>
            
        </div>
    )
}

export default KYBForm;