import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import PageTitle from '../components/PageTitle';
// import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const MyRecipesPage = () =>
{
    return(
      <div id="cardUIDiv">
            <div id ="cardrows" class="row">
                <div class="col-sm">
                    <CardDeck>
                    <Card border="danger" style={{ width: '40rem' }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant = "danger">View</Button>
                        </Card.Footer>
                    </Card>
                    <Card border="danger" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant = "danger">View</Button>
                        </Card.Footer>
                    </Card>
                    <Card border="danger" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This card has even longer content than the first to
                            show that equal height action.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant = "danger">View</Button>
                        </Card.Footer>
                    </Card>
                    </CardDeck>
                </div>
            </div>
        </div>
    );
};

export default MyRecipesPage;
