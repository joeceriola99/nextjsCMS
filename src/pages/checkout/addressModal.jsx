import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setModeOfPayment } from '../../redux/cart';

const AddressModal = (props) => {
  const [show, setShow] = useState(false);
  const [addressList, setAddressList] = useState();
  const [addressLine, setAddressLine] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const { name, email, phoneNumber } = props;

  useEffect(async () => {
    getUserAddressLists();
  }, []);

  const getUserAddressLists = async () => {
    const list = await db.collection('addresses').doc(email).collection('addressData').get();
    let array = [];
    list.docs.map((doc) => {
      array.push(doc.data());
    });
    setAddressList(array);
  };

  const resetValues = () => {
    setAddressLine('');
    setCity('');
    setZipCode('');
  };

  const saveAddress = (e) => {
    e.preventDefault();
    let docData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: addressLine,
      city: city,
      zipCode: zipCode,
    };
    db.collection('addresses')
      .doc(email)
      .collection('addressData')
      .doc()
      .set(docData)
      .then(() => {
        toast.success('Added Successfully');
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
    setShow(false);
    resetValues();
  };

  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar={true} closeOnClick draggable pauseOnHover />
      <button className="button" onClick={() => setShow(true)}>
        Change Address
      </button>
      <div className="myModalFullBox" style={show ? { display: 'block' } : { display: 'none' }}>
        <div className="myModalBoxMain">
          <div className="myModal">
            <div className="oldAddress">
              <p onClick={() => setShow(false)}>X</p>
              {addressList && addressList.length > 0
                ? addressList.map((data,index) => {
                    return (
                      <div className="myOrderChangeOrder" key={index}>
                        <p>Address</p>
                        <ul>
                          <li>{data.name}</li>
                          <li>
                            {data.address},{data.city}
                          </li>
                          <li>{data.zipCode}</li>
                          <li>{phoneNumber}</li>
                        </ul>
                      </div>
                    );
                  })
                : 'No Saved Addresss'}
            </div>
            <h3>Add Shipping Address</h3>
            <form className="myPopUpForm">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Address"
                  onChange={(e) => setAddressLine(e.target.value)}
                >
                  {addressLine}
                </textarea>
              </div>
              <div className="form-group formUl">
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="form-group formUl">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Zip Code"
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                />
              </div>
              <button className="btn modalPopUpBtn" onClick={saveAddress}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
