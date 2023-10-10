
import React from 'react'

const Test = () => {


    return (
        <div>
            <form className="main-transaction-form" action="https://payments.airpay.co.in/pay/index.php" method="post">

                <label >Buyer Email</label><span style={{ color: 'red' }}>*</span><br />
                <input type="text" placeholder="Buyer Email" name="buyerEmail" required />
                <span id="email-err"></span>
                <br></br>
                <label >Buyer Phone</label> <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Buyer Phone" name="buyerPhone" required />
                <span id="buyerPhone-err"></span>

                <br></br>
                <label >Buyer First Name</label> <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Buyer First Name" name="buyerFirstName" required />
                <span id="fname-err"></span>

                <br></br>
                <label >Buyer Last Name</label>  <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Buyer Last Name" name="buyerLastName" />
                <span id="lname-err"></span>


                <br></br>

                <label >Buyer Address</label> <br />
                <input type="text" placeholder="Buyer Address" name="buyerAddress" />
                <span id="buyerAddress-err"></span>

                <br></br>
                <label >Buyer City</label>  <br />
                <input type="text" placeholder="Buyer City" name="buyerCity" />
                <span id="buyerCity-err"></span>

                <br></br>
                <label >Buyer State</label>  <br />

                <input type="text" placeholder="Buyer State" name="buyerState" />
                <span id="buyerState-err"></span>

                <br></br>
                <label >Buyer Country</label>  <br />



                <input type="text" placeholder="Buyer Country" name="buyerCountry" />
                <span id="buyerCountry-err"></span>

                <br></br>
                <label >Buyer Pincode</label>  <br />


                <input type="text" placeholder="Buyer Pincode" name="BuyerPincode" />
                <span id="BuyerPincode-err"></span>

                <br></br>
                <label >Order ID</label> <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Order ID" name="orderid" />
                <span id="orderid-err"></span>

                <br></br>
                <label >Amount</label><span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Amount" name="amount" />
                <span id="amount-err"></span>

                <br></br>
                <label >Custom Field 1</label> <br />
                <input type="text" placeholder="Custom Field 1" name="customvar" />
                <span id="customvar-err"></span>

                <br></br>
                <label >Payment Mode</label> <br />

                <input type="text" placeholder="chmod" name="chmod" />
                <span id="chmod-err"></span>

                <br></br>

                {/* <input type="text" placeholder="Token" name="token" />
      <br></br>
      <br></br> */}
                <label >Transaction Wallet</label> <br />

                <input type="text" placeholder="Transaction Wallet" name="wallet" />
                <br></br>

                <label >Currency</label>
                <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="Currency" name="currency" />
                <span id="currency-err"></span>

                <br></br>
                <label >isoCurrency</label>
                <span style={{ color: 'red' }}>*</span><br />

                <input type="text" placeholder="isoCurrency" name="isocurrency" />
                <span id="isocurrency-err"></span>


                <br></br>
                <label >Sub Type</label>
                <br></br>

                <input type="text" id="subtype" placeholder="subtype" name="txnsubtype" />

                <br></br>
                <br></br>
                <button type="submit" 
                // onClick={this.validates}
                >Pay Here</button>
            </form>
        </div>
    )
}

export default Test
