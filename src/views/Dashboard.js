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
import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboardNASDAQChart,
  prepareChartData
} from "variables/charts.js";
import { useSelector, useDispatch } from 'react-redux';
import { getStockDetails, getStockFundamentals } from '../actions/stockActions';

function Dashboard() {
  const dispatch = useDispatch();
  const { name, ticker, description, fair_value, industry, price, score, logo } = useSelector(state => state.stock);
  const { de_ratio, fcf, gross_profit, net_income, revenue, roe } = useSelector(state => state.fundamentals);
  const stockName = useSelector(state => state.stockName);
  useEffect(() => {
    if (stockName) {
      dispatch(getStockDetails(stockName));
      dispatch(getStockFundamentals(stockName));
    }
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

  const preparedDERatioData = prepareChartData(de_ratio);
  const preparedFCFData = prepareChartData(fcf);
  const preparedGrossProfitData = prepareChartData(gross_profit);
  const preparedNetIncomeData = prepareChartData(net_income);
  const preparedRevenueData = prepareChartData(revenue);
  const preparedROEData = prepareChartData(roe);

  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col md="2">
                    <img src={logo} alt={`${name} Logo`} style={{ width: '100%', maxWidth: '100px' }} />
                  </Col>
                  <Col md="10">
                    {/* Text Column */}
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardTitle tag="h6">NASDAQ: {ticker}</CardTitle>
                    <CardTitle tag="h6">
                      <p className="card-category">
                        {isDescriptionExpanded ? description : collapsedDescription}
                        <a href="#" onClick={toggleDescription} style={{ marginLeft: '8px' }}>
                          {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                        </a>
                      </p>
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
                      <CardTitle tag="p">{price}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
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
                      <CardTitle tag="p">{fair_value}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
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
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">ROE</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedROEData.data}
                  options={preparedROEData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">DE Ratio</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedDERatioData.data}
                  options={preparedDERatioData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Revenue</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedRevenueData.data}
                  options={preparedRevenueData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Net Income</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedNetIncomeData.data}
                  options={preparedNetIncomeData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Gross Profit</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedGrossProfitData.data}
                  options={preparedGrossProfitData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Free Cash Flow</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={preparedFCFData.data}
                  options={preparedFCFData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
