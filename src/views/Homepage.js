import React, {useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Row,
    Col,
    Badge,
    CardTitle,
} from "reactstrap";
import Loader from '../components/Loader';
import SearchBar from 'components/Navbars/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUnderValuedStocks, fetchStocksByScore } from '../actions/stockActions';
import Rating from 'react-rating';
import { getRatingValue, getRatingClass } from '../utils/utils';
import ImageOrStockCircle from 'components/Image/ImageOrStockCircle';


const Homepage = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    const badgesData = [
        { href: '/AAPL', ticker: 'AAPL', label: 'Apple Inc', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/aapl.png' },
        { href: '/NVDA', ticker: 'NVDA',label: 'Nvidia', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/NVDA.png'  },
        { href: '/MSFT', ticker: 'MSFT',label: 'Microsoft', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/MSFT.png'  },
        { href: '/AMZN', ticker: 'AMZN',label: 'Amazon', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/amzn.png'  },
        { href: '/TSLA', ticker: 'TSLA',label: 'Tesla', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/TSLA.png'  },
        { href: '/META', ticker: 'META',label: 'Meta', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/meta.png'  },
        { href: '/GOOGL', ticker: 'GOOGL',label: 'Alphabet', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/googl.png'  },
        { href: '/PYPL', ticker: 'PYPL',label: 'PayPal', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/pypl.png'  },
        { href: '/NFLX', ticker: 'NFLX',label: 'Netflix', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/nflx.png'  },
        { href: '/ADBE', ticker: 'ADBE',label: 'Adobe', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/ADBE.png'  },
        { href: '/INTC', ticker: 'INTC',label: 'Intel', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/INTC.png'  },
        { href: '/CSCO', ticker: 'CSCO',label: 'Cisco', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/CSCO.png'  },
        { href: '/CMCSA', ticker: 'CMCSA',label: 'Comcast', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/CMCSA.png'  },
        { href: '/PEP', ticker: 'PEP',label: 'PepsiCo', imageUrl: 'https://eodhistoricaldata.com/img/logos/US/pep.png'  },
    ];

    const stocksByScore = useSelector(state => state.stocksByScore.stocksByScore);
    const undervaluedStocks = useSelector(state => state.undervaluedStocks.undervaluedStocks);
    console.log('stocksByScore', stocksByScore);
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
            await Promise.all([
              dispatch(fetchUnderValuedStocks()),
              dispatch(fetchStocksByScore())
            ]);
        } catch (error) {
          console.error('An error occurred:', error);
        }
        setLoading(false);
      }
      fetchData();
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }
    
    return (
        <>
        <div className="content">
        {loading ? (
            <Loader />
        ) : (
            <>
            <div className="homepage-content">
                <div className="banner">
                    <h1>Welcome to Stocky</h1>
                    <p className="tagline">Designed by Retail Investors, for Retail Investors</p>
                    <div className="search-bar-container">
                        <SearchBar />
                        <div className='search-bar-badges'>
                            {badgesData.map((badge, index) => (
                                <Badge className='badge' key={index} href={badge.href} pill>
                                    <ImageOrStockCircle ticker={badge.ticker} logoUrl={badge.imageUrl} imageClassName="badge-image"/>
                                    {badge.label}
                                </Badge>
                            ))}
                        </div>
                    </div>                    
                </div>
                {undervaluedStocks && undervaluedStocks.length > 0 ? (
                  <div className="homepage-module">
                    <Row className='padded-row'>
                      <CardTitle id="valuationSection" tag="h4">Most Undervalued Stocks</CardTitle>
                    </Row>
                    <hr className="card-hr"/>
                    <Row>
                      {undervaluedStocks.map((stock, index) => (
                        <Col key={index} md="2">
                          <a href={`/${stock.ticker}`} className="card-link">
                            <Card className="card-stats">
                              <CardBody>
                                <Row>
                                  <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning card-stock-logo">
                                      <ImageOrStockCircle ticker={stock.ticker} logoUrl={stock.logo} imageClassName="card-stock-logo"/>
                                    </div>
                                  </Col>
                                  <Col md="8" xs="5">
                                    <div className='card-stock-ticker'>
                                      <p>{stock.ticker}</p>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12" xs="5">
                                    <div className='card-stock-name'>
                                      {stock.stock_name}
                                    </div>
                                  </Col>
                                </Row>
                                <hr className="card-hr"/>
                                <Row>
                                  <Col md="12" xs="5">
                                    <div className={`card-stock-price ${stock.diff_percent >= 0 ? 'card-stock-price-positive' : 'card-stock-price-negative'}`}>
                                      <p>{`${stock.diff_percent ? stock.diff_percent : 'N/A'}`}%</p> 
                                    </div>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </a>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : null}

                {stocksByScore && stocksByScore.length > 0 ? (
                  <div className="homepage-module">
                    <Row className='padded-row'>
                      <CardTitle id="valuationSection" tag="h4">Highly Financially Stable Stocks</CardTitle>
                    </Row>
                    <hr className="card-hr"/>
                    <Row>
                      {stocksByScore.map((stock, index) => (
                        <Col key={index} md="2">
                          <a href={`/${stock.ticker}`} className="card-link">
                            <Card className="card-stats">
                              <CardBody>
                                <Row>
                                  <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning card-stock-logo">
                                      <ImageOrStockCircle ticker={stock.ticker} logoUrl={stock.logo} imageClassName="card-stock-logo"/>
                                    </div>
                                  </Col>
                                  <Col md="8" xs="5">
                                    <div className='card-stock-ticker'>
                                      <p>{stock.ticker}</p>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12" xs="5">
                                    <div className='card-stock-name'>
                                      {stock.stock_name}
                                    </div>
                                  </Col>
                                </Row>
                                <hr className="card-hr"/>
                                <Row className='card-stock-rating'>
                                  <Col md="12" xs="5">
                                    <Rating
                                      emptySymbol="far fa-star"
                                      fullSymbol={`fas fa-star ${getRatingClass(stock.score)}`}
                                      fractions={2}
                                      initialRating={getRatingValue(stock.score)}
                                      readonly
                                    />
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </a>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : null}
            </div>
            </>
        )}
        </div>
        </>
    );
};

export default Homepage;
