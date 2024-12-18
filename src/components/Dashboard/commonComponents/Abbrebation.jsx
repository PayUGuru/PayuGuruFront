import React from 'react'

function Abbrebation() {
  return (
    <div>
        
    <h1>
        Abbrebation 
    </h1>
    <div className='card'>
        
        <p>

            QR upi://pay?mc=Seller_MCC&pa=_VPA_&pn=Business_Name
            </p> 
   <span>
    
    eg: upi://pay?mc=5555&pa=9226223456@ybl&pn=progpan347&am=125&cu=INR&tn=Hi Piyush This is test
    </span>
   abbrevations:
        mc = mcc = merchant category code eg: software solution - 5555
        pa = VPA = virtual payment account/ UPI Id
        pn = Business Name
        cu = currency Type eg: INR = Indian Rupees
        tn = taxinomy = Payments Comment/Remark
    </div>

    </div>
  )
}

export default Abbrebation