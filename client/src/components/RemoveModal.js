import { useEffect } from 'react';

import './RemoveSharing.css';

const RemoveModal = ({ state, setRemovemodal }) => {
  const { contract } = state;
  let address;
  const sharing = async () => {
    address = document.querySelector('.address').value;
    await contract.disallow(address);
    alert('Access is Cancel this Account');
    setRemovemodal(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector('#selectNumber');
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement('option');
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with(Cancel)</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setRemovemodal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Sharing(X)</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveModal;
