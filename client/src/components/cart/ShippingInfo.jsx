import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfoAction } from "../../redux/actions/Action.Cart";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import CheckoutSteps from "./CheckoutSteps";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxStateCart = useSelector((state) => state.reducerCart);

  const [address, setAddress] = React.useState(
    reduxStateCart.shippingInfo.address
  );
  const [city, setCity] = React.useState(reduxStateCart.shippingInfo.city);
  const [postalCode, setPostalCode] = React.useState(
    reduxStateCart.shippingInfo.postalCode
  );
  const [phone, setPhone] = React.useState(reduxStateCart.shippingInfo.phone);
  const [country, setCountry] = React.useState(
    reduxStateCart.shippingInfo.country
  );

  const countriesList = Object.values(countries);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfoAction({ address, city, phone, postalCode, country })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <CheckoutSteps shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlhtmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
