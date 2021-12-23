import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Container, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { nearWalletConnection } from '../near-wallet-connection'
const TokenSender = props => {
    const [recipients, setRecipients]=useState([]);
    const [values, setValues]=useState([]);
    const [balance, setBalance]=useState(0);
    let inputValue = React.createRef();
    let inputRecipient = React.createRef();

    const sendTokens=async() => {
        const currentState = await window.account.state();
        const currentAmount =  await nearWalletConnection.formatNearAmount(currentState.amount);
        const enteredAmount = inputValue.current.value;
        const recipientName = inputRecipient.current.value;
        const enteredAmountAsNumber = Number(enteredAmount);
        const currentAmountAsNumber = Number(currentAmount);

        if(currentAmountAsNumber > enteredAmountAsNumber) {
            const contract = await nearWalletConnection.getContract();
            const accountId = await nearWalletConnection.getAccountId();
            await nearWalletConnection
                .sendMoney(enteredAmount)
                .then(await nearWalletConnection.addFunds({recipient:recipientName, amount:enteredAmountAsNumber}))
                .then(setRecipients(await contract.getNames({user:accountId})))
                .then(setValues(await contract.getValues({user:accountId})))
        } else {
            alert("Not Enough Funds!")
        }
    }

    useEffect(()=> { // set initial values
        async function get(){
            const accountId = await nearWalletConnection.getAccountId();
            setRecipients(await contract.getNames({user:accountId}));
            setValues(await contract.getValues({user:accountId}));
        }
        get();
    }, [])

    useEffect(()=> {
        async function get(){
            setBalance(await nearWalletConnection.getAccountState());
        }
        get();
    }, [balance]);

    return (
        <Container>
            <Row>
                <Card>
                    <Card.Header>Near Token Balance</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Near Tokens</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Row>
            <Row className="d-flex justify-content-center">
                <Card>
                    <Card.Header>Send Money to Friend</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row className="d-flex justify-content-center">
                                <Col>
                                    <input type="text" placeholder="Enter recipient here" ref={inputRecipient}/>
                                    <input type="text" placeholder="Enter value here" ref={inputValue}/>
                                    <Button onClick={sendTokens}>Submit</Button>
                                </Col>

                            </Row>

                            <Row className="d-flex justify-content-center">
                                <Table style = {{marginTop:'10px'}} striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th colSpan="1">Recipient Name</th>
                                            <th colSpan="1">Amount Received</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            recipients.map((recipient, index)=>{
                                                return (
                                                    <tr key={recipient}>
                                                        <td>{recipient}</td>
                                                        <td>{`${values[index]} NEAR`}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default TokenSender;