/* eslint-disable semi */
// ** React Imports
// import { useContext } from "react";
import { useEffect, useState } from "react";
import { clearSuccessAndError, getCountryData } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import CountryTable from "./CountryTable";
import { CheckCircle, PlusCircle, XCircle } from "react-feather";
import AddCountryModal from "./AddCountryModal";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  const [open, setOpen] = useState(false);

  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };
  const dispatch = useDispatch();
  const {
    data: countryData,
    loading,
    error,
  } = useSelector((state) => state.country);

  const {
    deleteCountrySuccess,
    deleteCountryError,
    addCountrySuccess,
    addCountryError,
    updateCountryError,
    updateCountrySuccess,
  } = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountryData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  console.log(countryData, loading, error);

  return (
    <Layout>
      <Row className="">
        <Col sm="12">
          <div>
            <div className="display-6 font-fallback">Country</div>
            <hr className="border border-2 border-dark my-4" />
            {/*** Alert messages box */}
            <CustomAlert
              addSuccess={addCountrySuccess}
              addError={addCountryError}
              updateSuccess={updateCountrySuccess}
              updateError={updateCountryError}
              deleteSuccess={deleteCountrySuccess}
              deleteError={deleteCountryError}
              dismissAlert={dismissAlert}
            />

            <Card className="px-4 py-4 border-0 shadow overflow-auto">
              <div className="mb-3 responsive_table_class">
                <Button
                  className="add-button border-0 font-fallback default-fz"
                  onClick={() => setOpen(!open)}
                >
                  <PlusCircle size={20} className=" me-1" /> Add Country
                </Button>
              </div>
              <CountryTable data={countryData} />
            </Card>
          </div>
        </Col>
        <AddCountryModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;
