// src/views/Summary.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStockDetails, getSecSummary } from '../actions/stockActions';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const styles = {
  preformattedText: {
    whiteSpace: 'pre-line'
  }
};

function SecSummary() {
  const dispatch = useDispatch();
  const { name, ticker, description, fair_value, industry, price, score, logo } = useSelector(state => state.stock);
  const { business_result, competitive_advantage_result, performance_result, risk_factors_result} = useSelector(state => state.summary);
  const stockName = useSelector(state => state.stockName);

  useEffect(() => {
    if (stockName) {
      dispatch(getStockDetails(stockName));
      dispatch(getSecSummary(stockName));
    }
  }, [dispatch, stockName]);

  return (
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
                  <CardTitle tag="h5">10K Summary for {name}</CardTitle>
                  <CardTitle tag="h6">NASDAQ: {ticker}</CardTitle>
                  <CardTitle>
                      <p className="card-category">
                        Our 10K Summary feature is currently in an experimental stage. While it utilizes advanced AI technology to provide a succinct summary, there might be instances where the summarization may not capture all nuanced details. We are constantly working to enhance this feature to better serve your needs. Your understanding and feedback are invaluable to us as we continue to refine this innovative tool.
                      </p>
                    </CardTitle>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="8" xs="7">
                    <div className="business-result">
                      <h6>What does this company do?</h6>
                      <p style={styles.preformattedText}>{business_result}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="8" xs="7">
                    <div className="competitive-advantage-result">
                      <h6> What is their competitive advantage?</h6>
                      <p style={styles.preformattedText}>{competitive_advantage_result}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="8" xs="7">
                    <div className="performance-result">
                      <h6>How was their performance last year?</h6>
                      <p style={styles.preformattedText}>{performance_result}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="8" xs="7">
                    <div className="risk-factors-result">
                      <h6>What kind of risk factors to look out for?</h6>
                      <p style={styles.preformattedText}>{risk_factors_result}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SecSummary;
