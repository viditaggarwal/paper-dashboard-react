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
  prepareChartData
} from "variables/charts.js";
import { useSelector, useDispatch } from 'react-redux';
import { getStockDetails, getStockFundamentals } from '../actions/stockActions';
import Loader from '../components/Loader';
import { formatNumber } from '../utils/numberUtils';

function Dashboard() {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const { name, ticker, description, fair_value, industry, price, score, logo } = useSelector(state => state.stock);
  const graph_data = useSelector(state => state.fundamentals && state.fundamentals.data);
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
        <Row>
          <Col md="12">
            <Row className='padded-row'>
              <CardTitle tag="h4">Valuation</CardTitle>
            </Row>
            <hr className="card-hr"/>
            <Row>
              {['dcf', 'pe', 'pb', 'ps', 'ev_ebit'].map((method, index) => {
                if (!fair_value[method]) {
                  return null; // Skip this iteration if the method is not available
                }
                
                const fairVal = fair_value[method]['Fair Value'];
                const percentageDifference = ((fairVal - price) / price) * 100;
                const color = percentageDifference >= 0 ? 'green' : 'red';

                return (
                  <Col md="4" key={index}>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="8" xs="7">
                            <CardTitle tag="h5">{method.toUpperCase()}</CardTitle>
                            <CardSubtitle>
                              {(() => {
                                const fullForms = {
                                  'dcf': 'Discounted Cash Flow',
                                  'pe': 'Price to Earnings',
                                  'pb': 'Price to Book',
                                  'ps': 'Price to Sales',
                                  'ev_ebit': 'Enterprise Value to EBIT'
                                };
                                return fullForms[method] || '';
                              })()}
                            </CardSubtitle>
                          </Col>
                        </Row>
                        <hr className="card-hr"/>
                        <Row>
                        <CardText className='padded-row valuation-description'>
                          <b>{ticker}</b> is currently priced at <b>${price.toFixed(2)}</b>. 
                          Based on the {method.toUpperCase()} method, the stock has a fair value of <b><span style={{"color": color}}>${fairVal.toFixed(2)}</span></b>.
                          This represents a <span style={{"color": color}}>{percentageDifference.toFixed(2)}% {percentageDifference >= 0 ? 'upside' : 'downside'}</span> potential.
                        </CardText>
                        </Row>
                        <Row className="padded-row equidistant-divs">
                            {Object.keys(fair_value[method]).map((field, fieldIndex) => {
                              const value = fair_value[method][field];
                              if (typeof value === 'number' && field !== 'Fair Value') {
                                const displayValue = formatNumber(value);
                                return (
                                  <div className="numbers">
                                    <CardText className='info-text' key={fieldIndex}>
                                      {field.replace(/_/g, ' ')}: {displayValue}
                                    </CardText>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>  
        </Row>
        <div>
          <Row className='padded-row'>
            <CardTitle tag="h4">Financials</CardTitle>
          </Row>
          <hr className="card-hr"/>
          {sections.map((section, index) => (
            <Row key={index}>
              <Col md="12">
                <Row className='padded-row'>
                  <CardSubtitle className='subtitle-h5'>{section.title}</CardSubtitle>
                </Row>
                <hr className="card-hr-left-short"/>
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
