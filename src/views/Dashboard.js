/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect } from 'react';
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Row,
  CardText,
  Col,
} from "reactstrap";
// core components
import {
  dashboardNASDAQChart,
  prepareChartData
} from "variables/charts.js";
import { useSelector, useDispatch } from 'react-redux';
import { getStockDetails, getStockFundamentals } from '../actions/stockActions';
import Loader from '../components/Loader';

function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { name, ticker, description, fair_value, industry, price, score, logo } = useSelector(state => state.stock);
  const graph_data = useSelector(state => state.fundamentals.data);
  console.log('graph_data:', graph_data);
  const sections = [
    { title: 'Income Statement', category: 'income', label_keys: {revenue_growth:'Revenue Growth', eps:'EPS', gross_margin: 'Gross Margin'} },
    { title: 'Balance Sheet', category: 'balance_sheet', label_keys: {roe:'ROE', debt_to_equity: 'DE Ratio', current_ratio:'Current Ratio'} },
    { title: 'Cash Flow Statement', category: 'cash_flow', label_keys: {operating_cash_flow:'Operating Cash Flow', fcf:'Free Cash Flow', capex: 'Capex'} },
  ];
  const stockName = useSelector(state => state.stockName);
  useEffect(() => {
    async function fetchData() {
      if (stockName) {
        setLoading(true);
        await Promise.all([
          dispatch(getStockDetails(stockName)),
          dispatch(getStockFundamentals(stockName))
        ]);
        setLoading(false);
        // Adding a delay of 2 seconds before setting loading to false
        // const timer = setTimeout(() => {
        //   setLoading(false);
        // }, 10);
        // // Return cleanup function to clear the timer to prevent memory leaks
        // return () => clearTimeout(timer);
      }
    }
    fetchData();
  }, [dispatch, stockName]);


  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const toggleDescription = () => {
    setDescriptionExpanded(prevState => !prevState);
  };

  const getTruncatedDescription = () => {
    const windowWidth = window.innerWidth;
  
    if (windowWidth >= 1200) {  // Large screens
      return description.length > 400 ? description.substring(0, 400) + '... ' : description;
    } else if (windowWidth >= 992) {  // Medium screens
      return description.length > 350 ? description.substring(0, 350) + '... ' : description;
    } else {  // Small screens
      return description.length > 300 ? description.substring(0, 300) + '... ' : description;
    }
  };
  const collapsedDescription = getTruncatedDescription();

  // const preparedDERatioData = prepareChartData(de_ratio);
  // const preparedFCFData = prepareChartData(fcf);
  // const preparedGrossProfitData = prepareChartData(gross_profit);
  // const preparedNetIncomeData = prepareChartData(net_income);
  // const preparedRevenueData = prepareChartData(revenue);
  // const preparedROEData = prepareChartData(roe);

  if (loading) {
    return <Loader />;  // Render Loader component while data is being loaded
  }

  return (
      <div className="content">
      {loading ? (
        <Loader />
      ) : (
        <>
        <Row>
          <Col md="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col md="2" className="centered-content">
                    <img src={logo} alt={`${name} Logo`} style={{ width: '100%', maxWidth: '100px' }} />
                    <CardTitle tag="p">NASDAQ: {ticker}</CardTitle>
                  </Col>
                  <Col md="10">
                    <CardTitle tag="h4">{name}</CardTitle>
                    <CardTitle tag="p">{industry}</CardTitle>
                    <CardTitle tag="p" className='card-category'>
                        {isDescriptionExpanded ? description : collapsedDescription}
                        <a href="#" onClick={toggleDescription} style={{ marginLeft: '8px' }}>
                          {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                        </a>
                      {/* </p> */}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center">
                      <i className="nc-icon nc-globe text-info" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Price</p>
                      <CardTitle tag="p">${price}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr className="card-hr"/>
                <div className="stats">
                  <i className="far fa-clock" /> Updated 2 mins ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-info" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Fair Value</p>
                      <CardTitle tag="p">${parseFloat(fair_value['mean']).toFixed(1)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr className="card-hr"/>
                <div className="stats">
                  <i className="far fa-clock" /> Updated 30 mins ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-info" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Stocky Score</p>
                      <CardTitle tag="p">{score}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr className="card-hr"/>
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <hr className="card-hr"/>
        <Row>
          <Col md="12">
            <Row className='padded-row'>
              <CardTitle tag="h4">Valuation</CardTitle>
            </Row>
            <Row>
              <Col md="4">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="8" xs="7">
                        <CardTitle>DCF</CardTitle>
                        <CardSubtitle>Discounted Cash Flow</CardSubtitle>
                      </Col>
                    </Row>
                    <hr className="card-hr"/>
                    <Row>
                      <CardText className='padded-row valuation-description'>
                        Valuation based on DCF for <b>{ticker}</b> is <b>$178</b>
                      </CardText>
                    </Row>
                    <Row className="padded-row equidistant-divs">
                      <div className="numbers">
                        <CardText className='info-text'>
                          Discount Rate 10.1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          Terminal Growth 1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          FCF $400B
                        </CardText>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="8" xs="7">
                        <CardTitle>PE</CardTitle>
                        <CardSubtitle>Price To Earnings</CardSubtitle>
                      </Col>
                    </Row>
                    <hr className="card-hr"/>
                    <Row>
                      <CardText className='padded-row valuation-description'>
                        Valuation based on DCF for <b>{ticker}</b> is <b>$178</b>
                      </CardText>
                    </Row>
                    <Row className="padded-row equidistant-divs">
                      <div className="numbers">
                        <CardText className='info-text'>
                          Discount Rate 10.1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          Terminal Growth 1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          FCF $400B
                        </CardText>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="8" xs="7">
                        <CardTitle>PB</CardTitle>
                        <CardSubtitle>Price to Book</CardSubtitle>
                      </Col>
                    </Row>
                    <hr className="card-hr"/>
                    <Row>
                      <CardText className='padded-row valuation-description'>
                        Valuation based on DCF for <b>{ticker}</b> is <b>$178</b>
                      </CardText>
                    </Row>
                    <Row className="padded-row equidistant-divs">
                      <div className="numbers">
                        <CardText className='info-text'>
                          Discount Rate 10.1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          Terminal Growth 1%
                        </CardText>
                      </div>
                      <div className="numbers">
                        <CardText className='info-text'>
                          FCF $400B
                        </CardText>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>  
        </Row>
        <hr className="card-hr"/>
        <div>
          {sections.map((section, index) => (
            <Row key={index}>
              <Col md="12">
                <Row className='padded-row'>
                  <CardTitle tag="h4">{section.title}</CardTitle>
                </Row>
                <Row>
                  {Object.keys(section.label_keys).map((key, i) => {
                    const preparedData = prepareChartData(graph_data[section.category][key]);
                    return (
                      <Col md="4" key={i}>
                        <Card className="card-chart">
                          <CardHeader>
                            <CardTitle tag="h5">{section.label_keys[key]}</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <Bar
                              data={preparedData.data}
                              options={preparedData.options}
                              width={400}
                              height={200}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          ))}
        </div>
        </>
      )}
      </div>
  );
}

export default Dashboard;
